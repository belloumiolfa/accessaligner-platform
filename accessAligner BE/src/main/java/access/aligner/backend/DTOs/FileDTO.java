package access.aligner.backend.DTOs;
import java.util.Date;

public record FileDTO(
        Long id ,
        Date createdAt,
        String name,
        String type,
        String role,
        Long size
 ) {

}
