package access.aligner.backend.Validators;

import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidExistEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ExistEmailValidator implements ConstraintValidator<ValidExistEmail, String > {
    private final UserRepository userRepository;
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !userRepository.findByEmail(value).isEmpty();
    }
}
