package access.aligner.backend.DTOs.Records;

import access.aligner.backend.Entities.File;

public record DentistDto(
        Long id, String firstName, String lastName, String userName, Long photo
) {
}
