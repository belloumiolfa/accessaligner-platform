package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.Services.PatientService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import access.aligner.backend.Validators.Annotations.ValidPatientId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")

public class PatientController {
    private final PatientService patientService;
    private final ResourceAuthorizationService authorizationService;

    @PostMapping("add-patient")
    @PreAuthorize("hasRole('DENTIST')")
    public ResponseEntity<List<PatientDTO>> addPatientController(
            @Validated
            @RequestBody PatientRequest patientRequest, Authentication authentication) {
        Long doctorIdFromPrincipal = authorizationService.currentUserId(authentication);
        return new ResponseEntity<>(patientService.addPatient(patientRequest, doctorIdFromPrincipal), HttpStatus.OK);
    }

    @GetMapping("get-patients")
    @PreAuthorize("hasAnyRole('ADMIN', 'DENTIST', 'SUPER_ADMIN')")
    public ResponseEntity<List<PatientDTO>> getPatientsController(
            Authentication authentication) {
        List<PatientDTO> patients;
        if (authorizationService.hasRole(authentication, "SUPER_ADMIN")) {
            patients = patientService.getPatients();
        } else if (authorizationService.hasRole(authentication, "DENTIST")) {
            patients = patientService.getDoctorPateints(authorizationService.currentUserId(authentication));
        } else {
            patients = authorizationService.filterPatients(patientService.getPatients(), authentication);
        }
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("get-patient")
    public ResponseEntity<PatientDTO> getPatientController(
            @ValidPatientId @RequestParam Long id, Authentication authentication) {
        authorizationService.requirePatientAccess(id, authentication);
        return new ResponseEntity<>(patientService.getPatient(id), HttpStatus.OK);
    }

    @PostMapping("update-patient")
    public ResponseEntity<PatientDTO> updatePatientController(
            @ValidPatientId @RequestParam Long id,
            @RequestBody PatientRequest patientRequest, Authentication authentication) {
        authorizationService.requirePatientOwner(id, authentication);
        return new ResponseEntity<>(patientService.upodatePatient(patientRequest,id), HttpStatus.OK);
    }

    @DeleteMapping("delete-patient")
    public ResponseEntity<List<PatientDTO>> deletePatient(
            @ValidPatientId @RequestParam Long id, Authentication authentication) {
        authorizationService.requirePatientOwner(id, authentication);
        patientService.deletePatient(id);
        List<PatientDTO> patients = authorizationService.hasRole(authentication, "SUPER_ADMIN")
                ? patientService.getPatients()
                : patientService.getDoctorPateints(authorizationService.currentUserId(authentication));
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("getDoctorPatients")
    @PreAuthorize("hasRole('DENTIST')")
    public ResponseEntity<List<PatientDTO>> getDoctorPatientsController(
            Authentication authentication) {
        Long doctorIdFromPrincipal = authorizationService.currentUserId(authentication);
        return new ResponseEntity<>(patientService.getDoctorPateints(doctorIdFromPrincipal), HttpStatus.OK);
    }

    @GetMapping("get-nbr-patients")
    @PreAuthorize("hasAnyRole('DENTIST', 'SUPER_ADMIN')")
    public ResponseEntity<Integer> getNbrPatientsController(
            Authentication authentication) {
        return new ResponseEntity<>(
                patientService.getNbrPateints(authorizationService.currentUserId(authentication)), HttpStatus.OK);
    }

}
