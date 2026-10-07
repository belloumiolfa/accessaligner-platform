package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidCurrentPassword;
import access.aligner.backend.Validators.Annotations.ValidExistUserName;
import access.aligner.backend.Validators.Annotations.ValidPassword;
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

@ValidCurrentPassword( groups = FirstGroup.class)
public class SecuritySettingRequest {
    @ValidExistUserName(
                        groups= InitialGroup.class)
    private String userName ;

    private String currentPassword;

    @ValidPassword(groups = SecondGroup.class )

    @Size(min = 8, message = "{Validations.Size}",
            groups = SecondGroup.class  )
    private String newPassword ;
}
