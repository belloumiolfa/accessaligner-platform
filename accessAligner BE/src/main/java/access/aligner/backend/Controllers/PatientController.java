package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Entities.Patient;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Services.PatientService;
import access.aligner.backend.Validators.Annotations.ValidPatientId;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/")
@RequiredArgsConstructor
@Validated

public class PatientController {
    private final PatientService patientService;
    @PostMapping("add-patient")
    public ResponseEntity<List<PatientDTO>> addPatientController(
            @Validated 
            @RequestBody PatientRequest patientRequest, @RequestParam Long doctorId, HttpServletRequest request ) {
        return new ResponseEntity<>(patientService.addPatient(patientRequest,doctorId), HttpStatus.OK);
    }
    @GetMapping("get-patients")
    public ResponseEntity<List<PatientDTO>> getPatientsController(
            HttpServletRequest request){
        return new ResponseEntity<>(patientService.getPatients(), HttpStatus.OK);
    }
    @GetMapping("get-patient")
    public ResponseEntity<PatientDTO> getPatientController(
            @ValidPatientId @RequestParam Long id , HttpServletRequest request){
        return new ResponseEntity<>(patientService.getPatient(id), HttpStatus.OK);
    }
    @PostMapping("update-patient")
    public ResponseEntity<PatientDTO> updatePatientController(
            @ValidPatientId @RequestParam Long id,
            @RequestBody PatientRequest patientRequest , HttpServletRequest request) {
        return new ResponseEntity<>(patientService.upodatePatient(patientRequest,id), HttpStatus.OK);
    }
    @DeleteMapping("delete-patient")
    public ResponseEntity<List<PatientDTO>> deletePatient(
            @ValidPatientId @RequestParam Long id, HttpServletRequest request) {
        return new ResponseEntity<>(patientService.deletePatient(id), HttpStatus.OK);
    }
    @GetMapping("getDoctorPatients")
    public ResponseEntity<List<PatientDTO>> getDoctorPatientsController(
            @RequestParam Long doctorId, HttpServletRequest request ){
        return new ResponseEntity<>(patientService.getDoctorPateints(doctorId), HttpStatus.OK);
    }
    @GetMapping("get-nbr-patients")
    public ResponseEntity<Integer> getNbrPatientsController(
            @RequestParam Long userId , HttpServletRequest request){
        return new ResponseEntity<>(patientService.getNbrPateints(userId), HttpStatus.OK);
    }

}
