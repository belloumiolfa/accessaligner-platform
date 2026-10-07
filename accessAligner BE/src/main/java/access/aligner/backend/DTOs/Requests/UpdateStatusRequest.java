package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Validators.Annotations.ValidExistUser;
import access.aligner.backend.Validators.Annotations.ValidStatus;
import lombok.Data;

@Data
@ValidStatus()
public class UpdateStatusRequest {
    @ValidExistUser()
    Long userId;

    String status ;

    Long adminId;
}
