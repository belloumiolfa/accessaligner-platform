package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.SecuritySettingRequest;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidCurrentPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
public class CurrentPasswordValidator implements ConstraintValidator<ValidCurrentPassword, SecuritySettingRequest> {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean isValid(SecuritySettingRequest securitySettingRequest, ConstraintValidatorContext context) {
        if (securitySettingRequest == null
                || securitySettingRequest.getUserName() == null
                || securitySettingRequest.getCurrentPassword() == null) {
            return false;
        }
        User user = userRepository.findByUserName(securitySettingRequest.getUserName()).orElse(null);
        return user != null
                && passwordEncoder.matches(securitySettingRequest.getCurrentPassword(), user.getPassword());
    }
}
