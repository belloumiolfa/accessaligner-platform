package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.*;
import access.aligner.backend.DTOs.Records.TreatDto;
import access.aligner.backend.DTOs.Requests.InfosTreatRequest;
import access.aligner.backend.DTOs.Requests.TeethRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.Services.FileService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import access.aligner.backend.Services.TreatmentService;
import access.aligner.backend.Validators.Annotations.NotEmptyFiles;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/treatment/")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")

public class TreatmentController {
    private final TreatmentService treatmentService;
    private final FileService fileservice;
    private final ResourceAuthorizationService authorizationService;

    @PostMapping("add-information")
    public ResponseEntity<TreatmentDTO> addTreatmentInformationController(
            @RequestBody InfosTreatRequest data,
            @RequestParam Long patientId ,
            HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requirePatientOwner(patientId, authentication);
        Locale locale = request.getLocale();
        return new ResponseEntity<>(treatmentService.addInfo(data,patientId,locale), HttpStatus.OK);
    }
    @PostMapping("add-teeth")
    public ResponseEntity<TreatmentDTO> addTreatmentTeethController(
            @RequestBody  TeethRequest data,
            @RequestParam Long treatId ,
            HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        Locale locale = request.getLocale();
        return new ResponseEntity<>(treatmentService.addTeeth(data,treatId,locale), HttpStatus.OK);
    }
    @PostMapping("add-photographs")
    public ResponseEntity<TreatmentDTO> addTreatmentPhotosController(
            @RequestBody  MultipartFile[] photos,
            @RequestParam Long treatId, @RequestParam String role, @RequestParam String comment,
            HttpServletRequest request,
            Authentication authentication) throws IOException {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        Locale locale = request.getLocale();
        return new ResponseEntity<>(treatmentService.addPhotos(photos,treatId,comment , role,locale), HttpStatus.OK);
    }
    // add single file treatment
    @PostMapping("add-file")
    public ResponseEntity<FileDTO> addTreatPhotoController(
            @RequestBody @Valid @NotEmptyFiles(message = "{Validations.addTreatPhotoController.NotEmptyFiles}") MultipartFile photo ,
            @RequestParam Long treatId,
            @RequestParam String role,
            Authentication authentication) throws IOException {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        return new ResponseEntity<>(treatmentService.addPhoto(photo,treatId, role), HttpStatus.OK);
    }
    @DeleteMapping("/delete-file")
    public ResponseEntity<MessageResponse>deleteFileController(
            @RequestParam Long id,
            Authentication authentication) {
        authorizationService.requireTreatmentFileAccess(id, authentication);
        return new ResponseEntity<>(fileservice.deleteFile(id,"Treat-"),HttpStatus.OK);
    }
    // move it to file controller
    @GetMapping("/get-file")
    public ResponseEntity<Resource>getPhotoController(
            @RequestParam Long fileId, @RequestParam Long treatId, Authentication authentication)
            throws MalformedURLException {
        authorizationService.requireTreatmentFileAccess(fileId, treatId, authentication);
        return new ResponseEntity<>(treatmentService.getTreatPhoto(fileId, treatId),HttpStatus.OK);
    }
    // move to patient : get patient's current treatment
    @GetMapping("getCurrent")
    public ResponseEntity<TreatmentDTO> getInitialTreatmentController(
            @RequestParam Long patientId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requirePatientAccess(patientId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(treatmentService.getCurrentTreatment(patientId,locale), HttpStatus.OK);
    }
    @GetMapping("getTreatment")
    public ResponseEntity<TreatmentDTO> getTreatByIdController(
            @RequestParam Long treatId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(treatmentService.getTreatmentById(treatId,locale), HttpStatus.OK);
    }

    /*
        getAllValidTreatments
        getDentistValidTreatments
        getTeamValidTreatments
        getAllArchivedTreatments
        getDentistArchivedTreatments
        getTeamArchivedTreatments

        ==> return treatmentDto :
                            id,
                            status,
                            type,
                            Progress,
                            patient :{id,firstName,lastName},
                            Dentist :{Id,firstName,lastName,userName},
                            Equipe :[{Id,firstName,lastName}]

    * */
    @GetMapping("getAllValidTreatments")
     public ResponseEntity<List<TreatDto>>getNotArchivedTreatmentsController(
             HttpServletRequest request, Authentication authentication) {
        // Get locale from request
        Locale locale = request.getLocale();

        // Extract logged-in user details
        return new ResponseEntity<>(
                treatmentService.getNotArchivedTreatments(locale, authentication.getName()), HttpStatus.OK);
    }


    @PostMapping("updateTreatStatus")
    public ResponseEntity<TreatmentDTO> updateStatusController(
            @RequestParam Long treatId, @RequestBody String status, HttpServletRequest request,
            Authentication authentication
    ){
        authorizationService.requireTreatmentAccess(treatId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(treatmentService.updateStatus(treatId,status,locale),HttpStatus.OK);
    }
    @GetMapping("/getTreatments")
    public ResponseEntity<List<TreatmentDTO>>getTreatmentsController(
            HttpServletRequest request, Authentication authentication) {
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(
                authorizationService.filterTreatments(treatmentService.getTreatments(locale), authentication),
                HttpStatus.OK);
    }
    @GetMapping("/getDoctorTreat")
    @PreAuthorize("hasRole('DENTIST')")
    public ResponseEntity<List<TreatmentDTO>>getDoctorTreatsController(
            HttpServletRequest request, Authentication authentication) {
        Long doctorIdFromPrincipal = authorizationService.currentUserId(authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(
                treatmentService.getDoctorTreatments(doctorIdFromPrincipal,locale),HttpStatus.OK);
    }
    @GetMapping("/getPatientTreat")
    public ResponseEntity<List<TreatmentDTO>>getPatientTreatsController(
            @RequestParam Long patientId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requirePatientAccess(patientId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(treatmentService.getPatientTreats(patientId,locale),HttpStatus.OK);
    }
    @DeleteMapping("/deleteTreatment")
    public ResponseEntity<List<TreatmentDTO>> deleteTreatmentController(
            @RequestParam Long treatId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        treatmentService.deleteTreatment(treatId, locale);
        return new ResponseEntity<>(
                authorizationService.filterTreatments(treatmentService.getTreatments(locale), authentication),
                HttpStatus.OK);
    }
    @GetMapping("/get-nbr-treatment")
    @PreAuthorize("hasAnyRole('DENTIST', 'SUPER_ADMIN')")
    public ResponseEntity<Integer>getTreatmentNbrByUser(
            Authentication authentication) {
        return new ResponseEntity<>(
                treatmentService.getTreatmentNbr(authorizationService.currentUserId(authentication)),HttpStatus.OK);
    }
    @PostMapping("/add-team")
    public ResponseEntity<TreatmentDTO>addTeamController(
            @RequestParam Long treatId, @RequestBody List<Long> admins,
            HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        // Get locale from request
        Locale locale = request.getLocale();

        return new ResponseEntity<>(treatmentService.addTeam(treatId,admins,locale),HttpStatus.OK);
    }
    @GetMapping("/get-team")
    public ResponseEntity<List<AdminDTO>>getTeamController(
            @RequestParam Long treatId, Authentication authentication) {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        return new ResponseEntity<>(treatmentService.getTeam(treatId),HttpStatus.OK);
    }
    @GetMapping("/remove-team")
    public ResponseEntity<List<AdminDTO>>removeTeamController(
            @RequestParam Long treatId, @RequestParam Long adminId, Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        return new ResponseEntity<>(treatmentService.removeTeam(treatId,adminId),HttpStatus.OK);
    }
    @GetMapping("/reset-team")
    public ResponseEntity<MessageResponse>resetTeamController(
            @RequestParam Long treatId, Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        return new ResponseEntity<>(treatmentService.resetTeam(treatId),HttpStatus.OK);
    }

}
