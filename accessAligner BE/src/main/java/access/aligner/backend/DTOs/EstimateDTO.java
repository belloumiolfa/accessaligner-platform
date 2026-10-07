package access.aligner.backend.DTOs;

import access.aligner.backend.Enum.Enum_Status;

import java.util.Date;

public record EstimateDTO(
         Long id,
         Enum_Status status,
         Date createdDate,
         String blobURL,
         FileDTO file

) {

}
