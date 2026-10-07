package access.aligner.backend.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class InfosTreatRequest {
    private String type;
    private String antCross;
    private String classI;
    private String crowding;
    private String extract;
    private String gap;
    private String overbite;
    private String treat;
    private String postCross;
    private String reduceOverbite;

    private String description;
    private String teethComment;
    private String photosComment;
    private String clinicsComment;


}
