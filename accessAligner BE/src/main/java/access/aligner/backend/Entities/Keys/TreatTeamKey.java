package access.aligner.backend.Entities.Keys;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor

public class TreatTeamKey implements Serializable {
    Long treatmentId;
    Long userId;

}