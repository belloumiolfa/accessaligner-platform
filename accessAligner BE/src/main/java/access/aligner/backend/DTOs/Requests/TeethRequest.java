package access.aligner.backend.DTOs.Requests;

import access.aligner.backend.Enum.Enum_Action;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class TeethRequest {
    private String comment;
    private  Set<TeethObject> teeth ;
}
