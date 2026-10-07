package access.aligner.backend.Validators;

import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidUniqueUserName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UniqueUserNameValidator implements ConstraintValidator<ValidUniqueUserName, String> {
    private final UserRepository userRepository;
    @Override
    public boolean isValid(String userName, ConstraintValidatorContext context) {
        return userRepository.findByUserName(userName).isEmpty();
    }
}
