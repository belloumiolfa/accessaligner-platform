package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.UpdatePasswordRequest;
import access.aligner.backend.Validators.Annotations.ValidUpdatePasswordMatch;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UpdatePasswordValidator implements ConstraintValidator<ValidUpdatePasswordMatch, UpdatePasswordRequest> {
    @Override
    public boolean isValid(UpdatePasswordRequest value, ConstraintValidatorContext context) {
        return value.getPassword().equals(value.getConfirmPassword());
    }
}
