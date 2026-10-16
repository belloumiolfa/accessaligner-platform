package access.aligner.backend.Validators;

import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.UserStatusRepository;
import access.aligner.backend.Validators.Annotations.ValidAccept;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AcceptedUser implements ConstraintValidator<ValidAccept, String> {
    private final UserStatusRepository userStatusRepository;

    public AcceptedUser(UserStatusRepository userStatusRepository) {
        this.userStatusRepository = userStatusRepository;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }

        return userStatusRepository.existsByUser_EmailAndStatus_NameAndUpdatedLastTrue(
                value,
                Enum_Status.ACCEPTED
        );
    }
}
