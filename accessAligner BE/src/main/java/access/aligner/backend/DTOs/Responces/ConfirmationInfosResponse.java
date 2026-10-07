package access.aligner.backend.DTOs.Responces;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
 
public class ConfirmationInfosResponse {
    String firstName;
    String lastName;
    String email;
    Long currentStatus;

    public ConfirmationInfosResponse(String firstName, String lastName,String email, Long currentStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email=email;
        this.currentStatus = currentStatus;
    }
}
