package access.aligner.backend.DTOs.Requests;

import lombok.Data;

@Data
public class CancelRequest {
    Long userId;
    String reason;
}
