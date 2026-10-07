package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidPassword;
import access.aligner.backend.Validators.Annotations.ValidUpdatePasswordMatch;
import access.aligner.backend.Validators.Groups.FirstGroup;
import access.aligner.backend.Validators.Groups.SecondGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@ValidUpdatePasswordMatch(groups = SecondGroup.class )
public class UpdatePasswordRequest {
    @NotBlank
    private String token;

    @ValidPassword(groups = FirstGroup.class)

    @Size(min = 8, groups = FirstGroup.class)

    private String password ;
    private String confirmPassword;
}
