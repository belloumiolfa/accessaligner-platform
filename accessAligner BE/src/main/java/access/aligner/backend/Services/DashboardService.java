package access.aligner.backend.Services;

import access.aligner.backend.DTOs.Dashboard.TopDentistProjection;

import java.util.List;

public interface DashboardService {
    Integer getTotalTreats();
    Integer getTotalTreatsByStatus(String status);
    Integer getTotalDentist();
    Integer getTotalPatient();
    List<TopDentistProjection> getTopDentist( );
    List<Integer> getTreatStatisticsYear(int year);
    List<Integer> getPlanStatisticsYear(int year);
}
