package access.aligner.backend.DTOs.Dashboard;

import java.util.Date;

public interface TopDentistProjection {
    Long getUserId();

    String getFirstName();

    String getLastName();

    String getPhotoFileId();

    Long getTreatmentCount();
    Date getJoinDate();
}
