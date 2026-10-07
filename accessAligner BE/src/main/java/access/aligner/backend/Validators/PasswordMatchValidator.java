package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.SignupRequest;
import access.aligner.backend.Validators.Annotations.ValidPasswordMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;


public class PasswordMatchValidator implements ConstraintValidator<ValidPasswordMatch, SignupRequest> {
    @Override
    public boolean isValid(SignupRequest signupRequest, ConstraintValidatorContext context) {
        return signupRequest.getPassword().equals(signupRequest.getConfirmPassword());
    }
}
