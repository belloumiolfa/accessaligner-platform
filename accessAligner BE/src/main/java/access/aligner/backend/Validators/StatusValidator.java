package access.aligner.backend.Validators;

import access.aligner.backend.DTOs.Requests.UpdateStatusRequest;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Entities.UserStatus;
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
        Boolean result=true ;

        Optional<User> user=userRepository.findById(value.getUserId());
        if (!user.isEmpty()){
            UserStatus userStatus= user.get()
                    .getUserStatus().stream().filter(s->s.getUpdatedLast()==true).findFirst().get();


            if(value.getStatus()=="CONFIRMED" || value.getStatus()=="CANCELED"){
                result=userStatus.getStatus().getId()==3;
                        //&& !hasPassed72Hours(userStatus.getUpdatedAt());

           }/*else if(value.getStatusId()==4 || value.getStatusId()==5 || value.getStatusId()==6) {
                result=userStatus.getStatus().getId()==1;
                        //&& !hasPassed72Hours(userStatus.getUpdatedAt());

            }*/
        }

        return result;
    }
    public boolean hasPassed72Hours(Date pastDate) {
        LocalDateTime currentDate = LocalDateTime.now();
        Duration duration = Duration.between((Temporal) pastDate, currentDate);
        long hoursDifference = duration.toHours();
        return hoursDifference >= 72;
    }

}
