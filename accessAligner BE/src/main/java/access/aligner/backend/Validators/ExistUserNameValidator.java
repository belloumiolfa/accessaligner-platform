package access.aligner.backend.Validators;

import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidExistUserName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ExistUserNameValidator implements ConstraintValidator<ValidExistUserName, String> {
    private final UserRepository userRepository;
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
         return !userRepository.findByUserName(value).isEmpty();
    }
}
