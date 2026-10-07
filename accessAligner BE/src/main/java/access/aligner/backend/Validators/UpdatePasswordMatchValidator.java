 
 package access.aligner.backend.Validators;

        import access.aligner.backend.DTOs.Requests.UpdatePasswordRequest;

        import access.aligner.backend.Validators.Annotations.ValidUpdatePasswordMatch;
        import jakarta.validation.ConstraintValidator;
        import jakarta.validation.ConstraintValidatorContext;

        import java.util.Objects;

public class UpdatePasswordMatchValidator implements ConstraintValidator<ValidUpdatePasswordMatch, UpdatePasswordRequest> {
    @Override
    public boolean isValid(UpdatePasswordRequest updatePasswordRequest, ConstraintValidatorContext context) {
        return updatePasswordRequest != null
                && updatePasswordRequest.getPassword() != null
                && updatePasswordRequest.getConfirmPassword() != null
                && Objects.equals(updatePasswordRequest.getPassword(), updatePasswordRequest.getConfirmPassword());
    }
}
