package access.aligner.backend.Validators;

import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidExistUser;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor

public class ExistUserValidator implements ConstraintValidator<ValidExistUser, Long> {
    private final UserRepository userRepository;
    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        return !userRepository.findById(value).isEmpty();
    }
}
