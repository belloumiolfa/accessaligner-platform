package access.aligner.backend.DTOs.Records;

import access.aligner.backend.Entities.File;

public record MemberDto(
        Long di, String firstName, String lastName, File photo
) {
}
