package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidEmail;
import access.aligner.backend.Validators.Annotations.ValidPassword;
import access.aligner.backend.Validators.Annotations.ValidUniqueEmail;
import access.aligner.backend.Validators.Groups.FirstGroup;
import access.aligner.backend.Validators.Groups.InitialGroup;
import access.aligner.backend.Validators.Groups.SecondGroup;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class NewAdminRequest {
    @ValidEmail(message = "Invalid email format",
            groups = InitialGroup.class)
    @ValidUniqueEmail(message = "This email address is already in use.",
            groups = SecondGroup.class)
    private String email;




    @ValidPassword(message = "Password must contain at least one lowercase character, " +
            "one uppercase character, one number, and one special character",
            groups = FirstGroup.class)
    @Size(min = 8, message = "Password must be at least 8 characters long",
            groups = InitialGroup.class)
    private String password ;

}
