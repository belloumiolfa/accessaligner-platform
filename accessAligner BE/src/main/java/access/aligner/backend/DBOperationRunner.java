package access.aligner.backend;

import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.UserStatusKey;
import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.ResourceBundle;

@Component
@RequiredArgsConstructor
@Transactional

public class DBOperationRunner implements CommandLineRunner {
    @Value("${spring.super.admin}")
    private String superAdminEmail;
    @Value("${spring.super.admin.password}")
    private String superAdminPassword;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final StatusRepository statusRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserStatusRepository userStatusRepository;
    @Autowired
    private final DoctorRepository doctorRepository;
    @Autowired
    private final AdminRepository adminRepository;
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void run(String... args) throws Exception {

        /**
         * Save user role
         */
        if(roleRepository.findByName(Enum_Role.valueOf("SUPER_ADMIN")).isEmpty()){
            Role role= Role.builder()
                    .name(Enum_Role.valueOf("SUPER_ADMIN"))
                    .description(messages.getString("SUPER_ADMIN.description") )
                    .build();
            roleRepository.save(role);
        }
        if(roleRepository.findByName(Enum_Role.valueOf("USER")).isEmpty()){
            Role role= Role.builder()
                    .name(Enum_Role.valueOf("USER"))
                    .description(messages.getString("USER.description") )
                    .build();
            roleRepository.save(role);
        }
        if(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).isEmpty()){
            Role role= Role.builder()
                    .name(Enum_Role.valueOf("ADMIN"))
                    .description(messages.getString("ADMIN.description") )
                    .build();
            roleRepository.save(role);
        }
        if(roleRepository.findByName(Enum_Role.valueOf("DENTIST")).isEmpty()){
            Role role= Role.builder()
                    .name(Enum_Role.valueOf("DENTIST"))
                    .description(messages.getString("DENTIST.description") )
                    .build();
            roleRepository.save(role);
        }
        if(roleRepository.findByName(Enum_Role.valueOf("PATIENT")).isEmpty()){
            Role role= Role.builder()
                    .name(Enum_Role.valueOf("PATIENT"))
                    .description(messages.getString("PATIENT.description"))
                    .build();
            roleRepository.save(role);
        }
        /**
         * save status
         */
        if(statusRepository.findByName(Enum_Status.valueOf("CONFIRMED")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("CONFIRMED"))
                    .description(messages.getString("USER.STATUS.CONFIRMED.description") )
                    .build();
            statusRepository.save(status);
        }
        if(statusRepository.findByName(Enum_Status.valueOf("CANCELED")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("CANCELED"))
                    .description(messages.getString("USER.STATUS.CANCELED.description") )
                    .build();
            statusRepository.save(status);
        }
        if(statusRepository.findByName(Enum_Status.valueOf("WAIT")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("WAIT"))
                    .description(messages.getString("USER.STATUS.WAIT.description") )
                    .build();
            statusRepository.save(status);
        }
        if(statusRepository.findByName(Enum_Status.valueOf("ACCEPTED")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("ACCEPTED"))
                    .description(messages.getString("USER.STATUS.ACCEPTED.description") )
                    .build();
            statusRepository.save(status);
        }
        if(statusRepository.findByName(Enum_Status.valueOf("REJECTED")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("REJECTED"))
                    .description(messages.getString("USER.STATUS.REJECTED.description"))
                    .build();
            statusRepository.save(status);
        }
        if(statusRepository.findByName(Enum_Status.valueOf("BLOCKED")).isEmpty()){
            Status status=Status.builder()
                    .name(Enum_Status.valueOf("BLOCKED"))
                    .description(messages.getString("USER.STATUS.BLOCKED.description"))
                    .build();
            statusRepository.save(status);
        }
        /**
         * save super admin
         */
        if(userRepository.findByUserName("SuperAdmin").isEmpty()) {
            User superAdmin = User.builder()
                    .userName("SuperAdmin")
                    .email(superAdminEmail)
                    .password(passwordEncoder.encode(superAdminPassword))
                    .createdAt(new Date())
                    .profile(Profile.builder()
                            .phone("25896321")
                            .firstName("Admin")
                            .lastName("Super")
                            .dateOfBirth(new Date())
                            .description(messages.getString("SUPER-ADMIN.DEFAULT.DESCRIPTION"))
                            .createdAt(new Date())
                            .build())
                    .build();
            // Add USER role by default
            superAdmin.setRole(roleRepository.findByName(Enum_Role.valueOf("SUPER_ADMIN")).get());
            superAdmin.setRole(roleRepository.findByName(Enum_Role.valueOf("SUPER_ADMIN")).get());
            superAdmin.setRole(roleRepository.findByName(Enum_Role.valueOf("ADMIN")).get());

            User newUser = userRepository.save(superAdmin);

            // Add ACCEPTED status by default
            UserStatus userStatus = UserStatus.builder()
                    .status(statusRepository.findByName(Enum_Status.valueOf("ACCEPTED")).get())
                    .updatedLast(true)
                    .user(newUser)
                    .updatedAt(new Date())
                    //.responsible((Admin) newUser)
                    .id(new UserStatusKey(newUser.getId(), statusRepository.findByName(Enum_Status.valueOf("ACCEPTED")).get().getId()))
                    .build();
            superAdmin.setStatus(userStatus);

            // save user
            userStatusRepository.save(userStatus);
        }
    }
}