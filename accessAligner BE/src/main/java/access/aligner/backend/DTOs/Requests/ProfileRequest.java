package access.aligner.backend.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ProfileRequest {
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String description;
    private String profession;
    private String phone;
    private String mobile;
    private String address;
    private String tax;

}
