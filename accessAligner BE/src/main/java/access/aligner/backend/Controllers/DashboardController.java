package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.Dashboard.TopDentist;
import access.aligner.backend.DTOs.Dashboard.TopDentistProjection;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Services.DashboardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/dashboard/")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")

public class DashboardController {
    private final DashboardService dashboardService;
    @GetMapping("getTotalTreats")
    public ResponseEntity<Integer> getTotalTreatsController() {
        return new ResponseEntity<>(dashboardService.getTotalTreats(), HttpStatus.OK);
    }
    @GetMapping("getTotalTreatsByStatus")
    public ResponseEntity<Integer> getTotalTreatsByStatusController(@RequestParam String status) {
        return new ResponseEntity<>(dashboardService.getTotalTreatsByStatus(status), HttpStatus.OK);
    }
    @GetMapping("getTotalDentist")
    public ResponseEntity<Integer> getTotalDentistController() {
        return new ResponseEntity<>(dashboardService.getTotalDentist(), HttpStatus.OK);
    }
    @GetMapping("getTotalPatient")
    public ResponseEntity<Integer> getTotalPatientController() {
        return new ResponseEntity<>(dashboardService.getTotalPatient(), HttpStatus.OK);
    }

    @GetMapping("getTopDentist")
    public ResponseEntity<List<TopDentistProjection>> getTopDentistController(){
        return new ResponseEntity<>(dashboardService.getTopDentist( ), HttpStatus.OK);
    }
    @GetMapping("getTreatStatisticsYear")
    public ResponseEntity<List<Integer>> getTreatStatisticsYearController(@RequestParam int year){
        return new ResponseEntity<>(dashboardService.getTreatStatisticsYear( year), HttpStatus.OK);
    }
    @GetMapping("getPlanStatisticsYear")
    public ResponseEntity<List<Integer>> getPlanStatisticsYearController(@RequestParam int year){
        return new ResponseEntity<>(dashboardService.getPlanStatisticsYear(year), HttpStatus.OK);
    }

}
