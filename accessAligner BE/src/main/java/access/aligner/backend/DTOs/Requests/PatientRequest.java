package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidEmail;
import access.aligner.backend.Validators.Annotations.ValidExistPatient;
import access.aligner.backend.Validators.Annotations.ValidPhone;
import access.aligner.backend.Validators.Groups.InitialGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ValidExistPatient()
public class PatientRequest {
    private String firstName ;
    private String lastName ;
    private Date birthday;
    private String sex;
    @ValidEmail(groups = InitialGroup.class)
    private String email;
    @ValidPhone(groups = InitialGroup.class)
    private String phone ;
    private String disease;
    private String address;
    private String comment;

}
