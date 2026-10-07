package access.aligner.backend.DTOs;

import access.aligner.backend.Entities.Keys.UserStatusKey;
import access.aligner.backend.Entities.Status;

import java.util.Date;

public record UserStatusDTO(
         UserStatusKey id ,
         Date updatedAt,
         AdminDTO responsible,
         Status status

) {
 }
