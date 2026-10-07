package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.Configuration.JwtService;
import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.Mappers.AdminDTOMapper;
import access.aligner.backend.DTOs.Requests.NewAdminRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.UserStatusKey;
import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import access.aligner.backend.Services.AdminService;
import access.aligner.backend.Services.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final UserStatusRepository userStatusRepository;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final AdminRepository adminRepository;
    private final AdminDTOMapper adminDTOMapper;
    // Load the resource bundle
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public MessageResponse newAdmin(NewAdminRequest data) throws MessagingException {
        Optional<User> existingUser = userRepository.findByEmail(data.getEmail());
        Admin admin = existingUser.isEmpty()
                ? new Admin()
                : adminRepository.findByEmail(data.getEmail())
                        .orElseThrow(() -> new ResourceNotFoundException("Admin account not found"));

        // generate login from email
        admin.setUserName(data.getEmail().substring(0, data.getEmail().indexOf('@')));
        admin.setEmail(data.getEmail());
        admin.setPassword(passwordEncoder.encode(data.getPassword()));
        admin.setCreatedAt (new Date());
        admin.setProfile(Profile.builder()
                .build());

        // Add USER role by default
        Role adminRole = roleRepository.findByName(Enum_Role.ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException("ADMIN role not found"));
        admin.setRole(adminRole);

        User newUser;
        if (existingUser.isPresent()) {
            newUser = existingUser.orElseThrow(() -> new ResourceNotFoundException("User not found"));
            newUser.setRole(adminRole);
        }else{
            newUser = userRepository.save(admin);
        }

        // Add ACCEPTED status by default
        Status status = statusRepository.findByName(Enum_Status.ACCEPTED)
                .orElseThrow(() -> new ResourceNotFoundException("ACCEPTED status not found"));
        UserStatus userStatus= UserStatus.builder()
                .status(status)
                .updatedLast(true)
                .user(newUser)
                .updatedAt(new Date())
                .id(new UserStatusKey(newUser.getId(),status.getId()))
                .build();
        admin.setStatus(userStatus);

        // save user
        userStatusRepository.save(userStatus);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", newUser.getId());
        var jwtToken = jwtService.generateToken(claims, newUser);
        emailService.sendEmailAdminCredential(newUser, jwtToken, newUser.getUsername(), data.getPassword());

        return MessageResponse.builder()
                .message(messages.getString("AdminService.newAdmin.MessageResponse")).build();
    }

    @Override
    public List<AdminDTO> getAdmins() {
        Collection<Admin> admins = adminRepository.findAll();
        List<AdminDTO> result = new ArrayList<AdminDTO>(admins.size());
        Role adminRole = roleRepository.findByName(Enum_Role.ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException("ADMIN role not found"));
        for (Admin admin:admins) {
            if(admin.getRoleList().contains(adminRole)) {
                result.add(adminDTOMapper.apply(admin));
            }
        }
        return result;
    }

    @Override
    public MessageResponse deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        Role adminRole = roleRepository.findByName(Enum_Role.ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException("ADMIN role not found"));
        Role userRole = roleRepository.findByName(Enum_Role.USER)
                .orElseThrow(() -> new ResourceNotFoundException("USER role not found"));
        admin.getRoleList().remove(adminRole);
        admin.setRole(userRole);

        adminRepository.save(admin);

/*
        // delete admin from team list
        treatmentTeamRepository.deleteAll(treatmentTeamRepository.findByResponsible(admin) );

        // delete status
        userStatusRepository.deleteAll(userStatusRepository.findByUser(user));

        // delete profile
        profileRepository.delete(profileRepository.findById(user.getProfile().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found")));

        //delete admin
        adminRepository.delete(admin);

        // delete user
        userRepository.delete(user);
*/
        return MessageResponse
                .builder()
                .message(messages.getString("AdminService.deleteAdmin.MessageResponse"))
                .build();


    }

    @Override
    public AdminDTO switchToSuperAdmin(Long adminId, Boolean switchRole ) {
         Admin admin = adminRepository.findById(adminId)
                 .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
         admin.setUpdatedAt(new Date());
        if(switchRole==true) {
            admin.setRole(roleRepository.findByName(Enum_Role.SUPER_ADMIN)
                    .orElseThrow(() -> new ResourceNotFoundException("SUPER_ADMIN role not found")));
        } else {
            Role superAdminRole = roleRepository.findByName(Enum_Role.SUPER_ADMIN)
                    .orElseThrow(() -> new ResourceNotFoundException("SUPER_ADMIN role not found"));
            admin.removeRole(superAdminRole.getId());
        }
        return adminDTOMapper.apply(adminRepository.save(admin));
    }
}
