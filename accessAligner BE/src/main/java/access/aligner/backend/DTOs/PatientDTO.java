package access.aligner.backend.DTOs;

import access.aligner.backend.Entities.Doctor;

import java.util.Date;

public record PatientDTO(
         Long id ,
         String firstName ,
         String lastName ,
         Date birthday,
         String sex,
         String email,
         String phone ,
         String disease,
         String address,
         String comment,
         Date createdAt,
         Date updatedAt,
         UserDTO doctor,
         int nbrTreat
) {
 }
