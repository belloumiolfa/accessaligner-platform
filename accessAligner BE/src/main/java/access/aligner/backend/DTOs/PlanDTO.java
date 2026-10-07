package access.aligner.backend.DTOs;

import access.aligner.backend.Enum.Enum_Status;

import java.util.Date;
import java.util.Set;
public record PlanDTO(
        Long id ,
        Set<FileDTO> photos,
        Set<FileDTO> videos,
        Set<FileDTO> reports,
        Enum_Status status,
        Date createdAt,
        Date updatedAt,

        Date deleveryDate ,
        String comment,
        String feedBack,
        String  code,
        Long productionDays

) {
}
