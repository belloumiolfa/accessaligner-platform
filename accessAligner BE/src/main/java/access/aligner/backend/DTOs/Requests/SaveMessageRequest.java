package access.aligner.backend.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class SaveMessageRequest {
    private Long sender;
    private Long treatment;
    private String message;
}
