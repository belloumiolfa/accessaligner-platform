package access.aligner.backend.DTOs.Requests;

 import access.aligner.backend.Validators.Annotations.*;
 import access.aligner.backend.Validators.Groups.FirstGroup;
 import access.aligner.backend.Validators.Groups.InitialGroup;
 import jakarta.validation.constraints.*;
 import lombok.Data;

@Data
@ValidPasswordMatch(groups = FirstGroup.class)
 public class SignupRequest {
     @ValidUniqueUserName(groups = FirstGroup.class)
     private String userName ;

     private String firstName ;
     private String lastName ;

     @ValidEmail(groups = InitialGroup.class)
     @ValidUniqueEmail(groups = FirstGroup.class)
     private String email;

     @ValidPhone(groups = InitialGroup.class)
     private String phone ;

     @ValidPassword(groups = InitialGroup.class)
     //@Size(min = 8, groups = InitialGroup.class)
     private String password ;
     private String confirmPassword;

}
