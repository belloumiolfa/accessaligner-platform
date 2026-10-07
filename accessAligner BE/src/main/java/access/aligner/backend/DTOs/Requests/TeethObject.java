package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Enum.Enum_Action;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TeethObject {
    private int num;
    private Enum_Action status;
}
