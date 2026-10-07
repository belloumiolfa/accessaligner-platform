package access.aligner.backend.DTOs;

import java.util.Date;
import java.util.Set;

public record MessageDTO(
        Long id ,
        String name ,
        Long senderId,
        String message ,
        Date createdAt,
        Set<SeenDTO> seenBy

        ) {
}
