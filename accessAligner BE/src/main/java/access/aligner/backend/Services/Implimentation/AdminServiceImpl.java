package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.Configuration.JwtService;
import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.Mappers.AdminDTOMapper;
import access.aligner.backend.DTOs.PatientDTO;
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
        Optional<User> newUser=userRepository.findByEmail(data.getEmail());

        Optional<Admin> admin=adminRepository.findByEmail(data.getEmail());
        if(newUser.isEmpty()){
              admin= Optional.of(new Admin());
        }

        // generate login from email
        admin.get().setUserName(data.getEmail().substring(0, data.getEmail().indexOf('@')));
        admin.get().setEmail(data.getEmail());
        admin.get().setPassword(passwordEncoder.encode(data.getPassword()));
        admin.get().setCreatedAt (new Date());
        admin.get().setProfile(Profile.builder()
                .build());

        // Add USER role by default
        admin.get().setRole(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).get() );

        if(!newUser.isEmpty()){
            newUser.get().setRole(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).get());
        }else{
            newUser = Optional.of(userRepository.save(admin.get()));
        }

        // Add ACCEPTED status by default
        Status status= statusRepository.findByName(Enum_Status.valueOf("ACCEPTED")).get();
        UserStatus userStatus= UserStatus.builder()
                .status(status)
                .updatedLast(true)
                .user(newUser.get())
                .updatedAt(new Date())
                .id(new UserStatusKey(newUser.get().getId(),status.getId()))
                .build();
        admin.get().setStatus(userStatus);

        // save user
        userStatusRepository.save(userStatus);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", newUser.get().getId());
        var jwtToken = jwtService.generateToken(claims, newUser.get());
        emailService.sendEmailAdminCredential(newUser.get(), jwtToken, newUser.get().getUsername(), data.getPassword());

        return MessageResponse.builder()
                .message(messages.getString("AdminService.newAdmin.MessageResponse")).build();
    }

    @Override
    public List<AdminDTO> getAdmins() {
        Collection<Admin> admins = adminRepository.findAll();
        List<AdminDTO> result = new ArrayList<AdminDTO>(admins.size());
        for (Admin admin:admins) {
            if(admin.getRoleList().contains(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).get())) {
                result.add(adminDTOMapper.apply(admin));
            }
        }
        return result;
    }

    @Override
    public MessageResponse deleteAdmin(Long id) {
        User user =userRepository.findById(id).get();
        Admin admin =adminRepository.findById(id).get();

        admin.getRoleList().remove(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).get());
        admin.setRole(roleRepository.findByName(Enum_Role.valueOf("USER")).get());

        adminRepository.save(admin);

/*
        // delete admin from team list
        treatmentTeamRepository.deleteAll(treatmentTeamRepository.findByResponsible(admin) );

        // delete status
        userStatusRepository.deleteAll(userStatusRepository.findByUser(user));

        // delete profile
        profileRepository.delete(profileRepository.findById(user.getProfile().getId()).get());

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
         Admin admin =adminRepository.findById(adminId).get();
         admin.setUpdatedAt(new Date());
        if(switchRole==true) {
            admin.setRole(roleRepository.findByName(Enum_Role.valueOf("SUPER_ADMIN")).get());
        } else {
            admin.removeRole(roleRepository.findByName(Enum_Role.valueOf("SUPER_ADMIN")).get().getId());
        }
        return adminDTOMapper.apply(adminRepository.save(admin));
    }
}
