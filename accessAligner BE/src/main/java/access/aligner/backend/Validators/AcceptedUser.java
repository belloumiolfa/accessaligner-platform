package access.aligner.backend.Validators;

import access.aligner.backend.Entities.User;
import access.aligner.backend.Entities.UserStatus;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Repositories.UserStatusRepository;
import access.aligner.backend.Validators.Annotations.ValidAccept;
 import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class AcceptedUser implements ConstraintValidator<ValidAccept, String> {
    private final UserRepository userRepository;
    private final UserStatusRepository userStatusRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return userRepository.findByEmail(value)
                .flatMap(user -> user.getUserStatus().stream()
                        .filter(UserStatus::getUpdatedLast)
                        .findFirst())
                .map(userStatus -> userStatus.getStatus().getId() == 4)
                .orElse(false);
    }
}
