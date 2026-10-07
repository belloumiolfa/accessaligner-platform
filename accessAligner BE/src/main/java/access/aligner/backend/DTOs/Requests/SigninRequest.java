package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.*;
import access.aligner.backend.Validators.EmailValidator;
import access.aligner.backend.Validators.ExistEmailValidator;
import access.aligner.backend.Validators.Groups.FirstGroup;
import access.aligner.backend.Validators.Groups.InitialGroup;
import access.aligner.backend.Validators.Groups.SecondGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class SigninRequest {
    @Autowired
    private MessageSource messageSource;

    @ValidEmail(groups= InitialGroup.class)
    @ValidExistEmail(groups = FirstGroup.class)
    @ValidAccept(groups = SecondGroup.class)
    private String email;
    private String password;

}
