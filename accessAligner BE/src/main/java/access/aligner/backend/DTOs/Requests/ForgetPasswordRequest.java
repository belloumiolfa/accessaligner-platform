package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidAccept;
import access.aligner.backend.Validators.Annotations.ValidEmail;
import access.aligner.backend.Validators.Annotations.ValidExistEmail;
import access.aligner.backend.Validators.Groups.FirstGroup;
import access.aligner.backend.Validators.Groups.InitialGroup;
import access.aligner.backend.Validators.Groups.SecondGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ForgetPasswordRequest {
    @ValidEmail(groups= InitialGroup.class)
    @ValidExistEmail(groups = FirstGroup.class)
    @ValidAccept(groups = SecondGroup.class)
   private  String email;
}
