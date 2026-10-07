package access.aligner.backend.DTOs;

import access.aligner.backend.Enum.Enum_Action;

public record TeethDTO(
        Long id,
        int num,
        int action) {
}
