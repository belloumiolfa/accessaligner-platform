package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.UpdateStatusRequest;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Entities.UserStatus;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Validators.Annotations.ValidStatus;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor

public class StatusValidator implements ConstraintValidator<ValidStatus, UpdateStatusRequest> {
    private final UserRepository userRepository;

    @Override
    public boolean isValid(UpdateStatusRequest value, ConstraintValidatorContext context) {
        if (value == null || value.getUserId() == null) {
            return false;
        }

        Optional<UserStatus> currentStatus = userRepository.findById(value.getUserId())
                .flatMap(user -> user.getUserStatus().stream()
                        .filter(UserStatus::getUpdatedLast)
                        .findFirst());
        if (Enum_Status.CONFIRMED.name().equals(value.getStatus())
                || Enum_Status.CANCELED.name().equals(value.getStatus())) {
            return currentStatus.map(status -> status.getStatus().getId() == 3).orElse(false);
        }
        return currentStatus.isPresent();
    }
    public boolean hasPassed72Hours(Date pastDate) {
        LocalDateTime currentDate = LocalDateTime.now();
        Duration duration = Duration.between((Temporal) pastDate, currentDate);
        long hoursDifference = duration.toHours();
        return hoursDifference >= 72;
    }

}
