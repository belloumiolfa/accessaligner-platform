 
 package access.aligner.backend.Validators;

        import access.aligner.backend.DTOs.Requests.UpdatePasswordRequest;

        import access.aligner.backend.Validators.Annotations.ValidUpdatePasswordMatch;
        import jakarta.validation.ConstraintValidator;
        import jakarta.validation.ConstraintValidatorContext;


public class UpdatePasswordMatchValidator implements ConstraintValidator<ValidUpdatePasswordMatch, UpdatePasswordRequest> {
    @Override
    public boolean isValid(UpdatePasswordRequest updatePasswordRequest, ConstraintValidatorContext context) {
        return updatePasswordRequest.getPassword().equals(updatePasswordRequest.getConfirmPassword());
    }
}
