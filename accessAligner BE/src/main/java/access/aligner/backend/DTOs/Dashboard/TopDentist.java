package access.aligner.backend.DTOs.Dashboard;

import java.util.Date;

public record TopDentist(
         Long userId,
         String firstName,
         String lastName,
         String photoFileId,
         Long treatmentCount,
         Date joinDate
) {
}

