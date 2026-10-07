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
        Optional<User> user= userRepository.findByEmail(value);
        if(!user.isEmpty()) {
            UserStatus userStatus = user.get()
                    .getUserStatus().stream().filter(s -> s.getUpdatedLast() == true).findFirst().get();

            return userStatus.getStatus().getId() == 4;
        } else{
        return false ;
        }
    }
}
