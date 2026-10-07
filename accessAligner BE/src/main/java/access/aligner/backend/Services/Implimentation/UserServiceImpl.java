package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.AdvicerController.InvalidVerificationTokenException;
import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.Configuration.JwtService;
import access.aligner.backend.DTOs.Mappers.UserDTOMapper;
import access.aligner.backend.DTOs.Requests.*;
import access.aligner.backend.DTOs.Responces.AuthenticationResponse;
import access.aligner.backend.DTOs.Responces.ConfirmationInfosResponse;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.UserDTO;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.UserStatusKey;
import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import access.aligner.backend.Services.EmailService;
import access.aligner.backend.Services.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final UserDTOMapper userDTOMapper;
    private final RoleRepository roleRepository;
    private final StatusRepository statusRepository;
    private final UserStatusRepository userStatusRepository;
    private final AuthenticationManager authenticationManager;

    ResourceBundle messages = ResourceBundle.getBundle("messages");


    @Override
    public MessageResponse signUpService (SignupRequest signupRequest) {

        Doctor doctor=new Doctor();

        doctor.setUserName(signupRequest.getUserName());
        doctor.setEmail(signupRequest.getEmail());
        doctor.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        doctor.setCreatedAt (new Date());
        doctor.setProfile(Profile.builder()
                        .lastName(signupRequest.getLastName())
                        .firstName(signupRequest.getFirstName())
                        .phone(signupRequest.getPhone())
                        .build());

        // Add USER role by default
        doctor.setRole(roleRepository.findByName(Enum_Role.valueOf("DENTIST")).get() );

        User newUser = userRepository.save(doctor);

        // Add WAIT status by default
        Status status= statusRepository.findByName(Enum_Status.valueOf("WAIT")).get();
        UserStatus userStatus= UserStatus.builder()
                .status(status)
                .updatedLast(true)
                .user(newUser)
                .updatedAt(new Date())
                .id(new UserStatusKey(newUser.getId(),status.getId()))
                .build();

        doctor.setStatus(userStatus);

        // save user
        userStatusRepository.save(userStatus);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", newUser.getId());
        claims.put("purpose", "EMAIL_VERIFICATION");

        String confirmationToken =
                jwtService.generateConfirmationToken(newUser);

        emailService.sendEmailVerification(newUser,confirmationToken);

        return MessageResponse.builder().message(
                messages.getString("UserService.signUpService.MessageResponse")).build();
    }

    @Override
    public ConfirmationInfosResponse getConfirmationInfoService(String token) {

        if (!jwtService.isConfirmationTokenValid(token)) {
            throw new InvalidVerificationTokenException(
                    "Invalid or expired verification token"
            );
        }

        Claims claims = jwtService.extractAllClaims(token);
        Long userId = claims.get("userId", Long.class);
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new InvalidVerificationTokenException(
                                "Invalid verification token"
                        ));

        Long currentStatus = user.getCurrentStatus();

        if (currentStatus == Enum_Status.valueOf("WAIT").ordinal()) {
            throw new InvalidVerificationTokenException(
                    "Registration is no longer pending"
            );
        }

        return new ConfirmationInfosResponse(
                user.getProfile().getFirstName(),
                user.getProfile().getLastName(),
                user.getEmail(),
                user.getCurrentStatus()
        );
    }

    @Transactional
    @Override
    public MessageResponse confirmRegistration(ConfirmRequest token) {

        if (!jwtService.isConfirmationTokenValid(token.getToken())) {
            throw new InvalidVerificationTokenException(
                    "Invalid or expired verification token"
            );
        }

        Claims claims = jwtService.extractAllClaims(token.getToken());

        Long userId = claims.get("userId", Long.class);

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        if (!"EMAIL_VERIFICATION".equals(
                claims.get("purpose", String.class))) {

            throw new InvalidVerificationTokenException(
                    "Invalid verification token"
            );
        }

        // Prevent using an already processed registration
        Long currentStatus = user.getCurrentStatus();

        if (currentStatus == Enum_Status.valueOf("WAIT").ordinal()) {

            throw new IllegalStateException(
                    "Registration is no longer pending"
            );
        }

        Status confirmedStatus = statusRepository
                .findByName(Enum_Status.valueOf("CONFIRMED"))
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "CONFIRMED status not found"
                        )
                );

        // Mark previous status as not current
        user.getUserStatus().forEach(
                s -> s.setUpdatedLast(false)
        );

        UserStatus userStatus = UserStatus.builder()
                .status(confirmedStatus)
                .user(user)
                .updatedLast(true)
                .updatedAt(new Date())
                .id(new UserStatusKey(
                        user.getId(),
                        confirmedStatus.getId()
                ))
                .build();

        user.setStatus(userStatus);
        user.setUpdatedAt(new Date());
        // send email to super admin to accept or reject the user

        return MessageResponse.builder().message(
                messages.getString("UserService.confirmation.MessageResponse")).build();
    }

    @Transactional
    @Override
    public MessageResponse cancelRegistration(ConfirmRequest token) {

        if (!jwtService.isConfirmationTokenValid(token.getToken())) {
            throw new InvalidVerificationTokenException(
                    "Invalid or expired verification token"
            );
        }

        Claims claims = jwtService.extractAllClaims(token.getToken());

        Long userId = claims.get("userId", Long.class);

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        if (!"EMAIL_VERIFICATION".equals(
                claims.get("purpose", String.class))) {

            throw new InvalidVerificationTokenException(
                    "Invalid verification token"
            );
        }

        Long currentStatus = user.getCurrentStatus();

        if (currentStatus == Enum_Status.valueOf("WAIT").ordinal()) {

            throw new IllegalStateException(
                    "Registration is no longer pending"
            );
        }

        Status cancelledStatus = statusRepository
                .findByName(Enum_Status.valueOf("CANCELED"))
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "CANCELLED status not found"
                        )
                );

        user.getUserStatus().forEach(
                s -> s.setUpdatedLast(false)
        );

        UserStatus userStatus = UserStatus.builder()
                .status(cancelledStatus)
                .user(user)
                .updatedLast(true)
                .updatedAt(new Date())
                .id(new UserStatusKey(
                        user.getId(),
                        cancelledStatus.getId()
                ))
                .build();

        user.setStatus(userStatus);
        user.setUpdatedAt(new Date());
        // send email to super admin to accept or reject the user

        return MessageResponse.builder().message(
                messages.getString("UserService.cancel.MessageResponse")).build();
    }

    private User getCurrentAdmin() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        return userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated admin not found"
                        )
                );
    }

    @Transactional
    @Override
    public MessageResponse acceptUser(AcceptRequest userId) {

        User user = userRepository.findById(userId.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        Long currentStatus = user.getCurrentStatus();

        if (currentStatus == Enum_Status.valueOf("CONFIRMED").ordinal()) {


            throw new IllegalStateException(
                    "Only confirmed users can be approved"
            );
        }

        Status activeStatus = statusRepository
                .findByName(Enum_Status.valueOf("ACCEPTED"))
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "ACTIVE status not found"
                        )
                );

        User admin = getCurrentAdmin();

        user.getUserStatus().forEach(
                s -> s.setUpdatedLast(false)
        );

        UserStatus userStatus = UserStatus.builder()
                .status(activeStatus)
                .user(user)
                .responsible(admin)
                .updatedLast(true)
                .updatedAt(new Date())
                .id(new UserStatusKey(
                        user.getId(),
                        activeStatus.getId()
                ))
                .build();

        user.setStatus(userStatus);
        user.setUpdatedAt(new Date());

        return MessageResponse.builder().message(
                messages.getString("UserService.accept.MessageResponse")).build();
    }


    @Transactional
    @Override
    public MessageResponse rejectUser(CancelRequest data  ) {

        User user = userRepository.findById(data.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        Long currentStatus = user.getCurrentStatus();

        if (currentStatus == Enum_Status.valueOf("CONFIRMED").ordinal()) {


            throw new IllegalStateException(
                    "Only confirmed users can be rejected"
            );
        }

        Status rejectedStatus = statusRepository
                .findByName(Enum_Status.valueOf("REJECTED"))
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "REJECTED status not found"
                        )
                );

        User admin = getCurrentAdmin();

        user.getUserStatus().forEach(
                s -> s.setUpdatedLast(false)
        );

        UserStatus userStatus = UserStatus.builder()
                .status(rejectedStatus)
                .user(user)
                .comment(data.getReason())
                .responsible(admin)
                .updatedLast(true)
                .updatedAt(new Date())
                .id(new UserStatusKey(
                        user.getId(),
                        rejectedStatus.getId()
                ))
                .build();

        user.setStatus(userStatus);
        user.setUpdatedAt(new Date());

        // Optional:
        // send rejection email to user with the reason
        emailService.sendRegistrationRejection(user, data.getReason());

        return MessageResponse.builder().message(
                messages.getString("UserService.REJECT.MessageResponse")).build();

    }


    @Override
    public UserDTO getUserById(Long id){
        User user =  userRepository.findById(id).orElseThrow();
         return userDTOMapper.apply(user) ;
    }

    @Override
    public UserDTO updateStatus(UpdateStatusRequest data) {

        Status status= statusRepository.findByName(Enum_Status.valueOf(data.getStatus())).get();
        User user =userRepository.findById(data.getUserId()).get();
        Optional<User> superAdmin =userRepository.findByUserName("SuperAdmin");
        Optional<User> admin =superAdmin;

        if(data.getAdminId()!=null){
            admin=userRepository.findById(data.getAdminId());
        }

        user.getUserStatus().forEach(s->s.setUpdatedLast(false));
        UserStatus userStatus= UserStatus.builder()
                .status(status)
                .user(user)
                .updatedLast(true)
                .updatedAt(new Date())
                .id(new UserStatusKey(data.getUserId(), status.getId()))
                .build();

        if(data.getAdminId()!=null){
            userStatus.setResponsible(admin.get());
        }

        if(data.getStatus()=="CONFIRMED"){
            Map<String, Object> claims = new HashMap<>();
            var jwtToken = jwtService.generateToken(claims, admin.get());
            emailService.sendEmailDecision(data.getUserId(),superAdmin.get(),jwtToken);
        }
        user.setStatus(userStatus);
        user.setUpdatedAt(new Date());

        userStatusRepository.save(userStatus);

        return userDTOMapper.apply(user) ;
    }

    @Override
    public AuthenticationResponse signin(SigninRequest signinRequest)  {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));

        if(authentication.isAuthenticated()){
            User user= userRepository.findByEmail(signinRequest.getEmail()).get();

            Map<String, Object> claims = new HashMap<>();
            claims.put("userId", user.getId());
            claims.put("role", user.getRoleList());

            var jwtToken = jwtService.generateToken(claims, user);
            var refreshToken = jwtService.generateRefreshToken(user);

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } else {

            throw new UsernameNotFoundException(
                    messages.getString("UserService.signin.AuthenticationResponse"));
        }

    }

    @Override
    public MessageResponse forgetPassword(String email) {

        User user= userRepository.findByEmail(email).get();

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        var jwtToken = jwtService.generateToken(claims, user);

        emailService.sendEmailUpdatePassword(email,jwtToken);

        return MessageResponse.builder().message(messages.getString("UserService.forgetPassword.MessageResponse")).build();
    }

    @Override
    public MessageResponse updatePassword(UpdatePasswordRequest data) {

        User user = userRepository.findById(data.getUserId()).get();
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setUpdatedAt(new Date());
        userRepository.save(user);

        return MessageResponse.builder().message(messages.getString("UserService.updatePassword.MessageResponse")).build();
    }

    @Override
    public AuthenticationResponse securitySettings(SecuritySettingRequest data) {
        User user =userRepository.findByUserName(data.getUserName()).get();
        user.setPassword(passwordEncoder.encode(data.getNewPassword()));
        user.setUpdatedAt(new Date());
        userRepository.save(user);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRoleList());

        var jwtToken = jwtService.generateToken(claims, user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public List<UserDTO> getDoctors() {
        Set<User> doctors = userRepository.findAll(Sort.by(Sort.Direction.DESC,"createdAt")).stream().filter(
                e-> e.getRoleList().contains(roleRepository.findByName(Enum_Role.valueOf("DENTIST")).get())
        ).collect(Collectors.toSet());


        List<UserDTO> result = new ArrayList<UserDTO>(doctors.size());

        for (User doctor :doctors) {
            result.add(userDTOMapper.apply(doctor));
        }
        return result;
    }

}