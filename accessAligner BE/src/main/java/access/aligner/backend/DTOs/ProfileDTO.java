package access.aligner.backend.DTOs;

import access.aligner.backend.Entities.File;

 import java.util.Date;

public record ProfileDTO(
         Long id ,
         String firstName,
         String lastName,
         Date dateOfBirth,
         String description,
         String profession,
         String phone,
         String mobile,
         String address,
         String tax,
         Date createdAt,
         Date updatedAt,
         File photo

) {
}
