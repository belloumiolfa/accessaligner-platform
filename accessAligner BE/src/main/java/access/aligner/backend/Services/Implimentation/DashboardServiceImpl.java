package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.Dashboard.TopDentistProjection;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import access.aligner.backend.Services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor

public class DashboardServiceImpl implements DashboardService {
    private final TreatmentRepository treatmentRepository;
    private final DoctorRepository dentistRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
     @Override
    public Integer getTotalTreats(){
        return Math.toIntExact(treatmentRepository.count());  // Cast to Integer
    }
    @Override
    public Integer getTotalTreatsByStatus(String status){
        return   treatmentRepository.countByStatus(Enum_Status.valueOf(status));
     }
    @Override
    public Integer getTotalDentist(){
        return Math.toIntExact(dentistRepository.count());
    }
    @Override
    public Integer getTotalPatient(){
        return Math.toIntExact(patientRepository.count());
    }




    @Override
    public List<TopDentistProjection> getTopDentist( ) {
        return userRepository.findTopDentists(5);

    }
    @Override
    public List<Integer> getTreatStatisticsYear(int year) {
        List<Object[]> result = treatmentRepository.findTreatStatisticsByYear(year);

        // Initialize a list with 12 zeros (for each month from Jan to Dec)
        List<Integer> treatmentCounts = new ArrayList<>(Collections.nCopies(12, 0));

        // Populate the list with the treatment counts for months that have data
        for (Object[] row : result) {

            int month = (int) row[0] - 1; // Adjust for 0-based index
            Long count = (Long) row[1]; // COUNT returns a Long, not Integer
            treatmentCounts.set(month, count != null ? count.intValue() : 0); // Convert Long to Integer safely
        }

        return treatmentCounts;
     }

    @Override
    public List<Integer> getPlanStatisticsYear(int year) {
        List<Object[]> result = planRepository.findPlanStatisticsByYear(year);

        // Initialize a list with 12 zeros (for each month from Jan to Dec)
        List<Integer>planCounts = new ArrayList<>(Collections.nCopies(12, 0));

        // Populate the list with the treatment counts for months that have data
        for (Object[] row : result) {

            int month = (int) row[0] - 1; // Adjust for 0-based index
            Long count = (Long) row[1]; // COUNT returns a Long, not Integer
            planCounts.set(month, count != null ? count.intValue() : 0); // Convert Long to Integer safely
        }

        return planCounts;    }


}
