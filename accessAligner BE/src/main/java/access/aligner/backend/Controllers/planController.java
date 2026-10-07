package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.PlanDTO;
import access.aligner.backend.DTOs.Requests.DateRequest;
import access.aligner.backend.DTOs.Requests.PlanRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.Services.PlanService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import access.aligner.backend.Validators.Annotations.NotEmptyFiles;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")

public class planController {
    private final PlanService planService;
    private final ResourceAuthorizationService authorizationService;

    @PostMapping("new-plan")
    public ResponseEntity<PlanDTO> newPlanController(
            @RequestParam Long treatId, @RequestBody PlanRequest planRequest, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        return new ResponseEntity<>
                (planService.addPlan(treatId, planRequest.getComment(),planRequest.getCode()), HttpStatus.OK);
    }
    //
    @PostMapping("add-plan-files")
    public ResponseEntity<PlanDTO> addPlanFilesController(
            @RequestBody
            @Valid @NotEmptyFiles(message = "There are no files to upload.") MultipartFile[] files ,
            @RequestParam Long planId, @RequestParam String role, HttpServletRequest request,
            Authentication authentication) throws IOException {
        authorizationService.requirePlanAccess(planId, authentication);
        return new ResponseEntity<>(planService.addPlanFiles(files,planId, role), HttpStatus.OK);
    }
    @GetMapping("/get-plan-file")
    public ResponseEntity<Resource>getPlanFileController(
            @RequestParam Long fileId, @RequestParam Long treatId, @RequestParam Long planId,
            HttpServletRequest request,
            Authentication authentication) throws MalformedURLException {
        authorizationService.requirePlanFileAccess(fileId, planId, treatId, authentication);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "filename");
        return new ResponseEntity<>(planService.getPlanFile(fileId,treatId,planId),headers,HttpStatus.OK);
    }
    @PostMapping("update-status")
    public ResponseEntity<PlanDTO> updateStatusController(
            @RequestParam Long planId, @RequestBody String status, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requirePlanAccess(planId, authentication);
        return new ResponseEntity<>(planService.updateStatus(planId, status ), HttpStatus.OK);
    }
    @PostMapping("update-delevery-date")
    public ResponseEntity<PlanDTO> updateDeliveryDateController(
            @RequestParam Long planId, @RequestBody DateRequest date, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requirePlanAccess(planId, authentication);
        return new ResponseEntity<>(planService.updateDeleveryDate(planId, date.getDeliveryDate() ), HttpStatus.OK);
    }
    @PostMapping("update-production-delay")
    public ResponseEntity<PlanDTO> updateProductionDelayController(
            @RequestParam Long planId, @RequestBody Long days, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requirePlanAccess(planId, authentication);
        return new ResponseEntity<>(planService.updateProductionDelay(planId, days ), HttpStatus.OK);
    }
    @PostMapping("update-feedBack")
    public ResponseEntity<PlanDTO> updateFeedBackController(
            @RequestParam Long planId, @RequestBody String feedBack, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requirePlanAccess(planId, authentication);
        return new ResponseEntity<>(planService.updateFeedBack(planId, feedBack ), HttpStatus.OK);
    }
    @DeleteMapping("delete-plan")
    public ResponseEntity<MessageResponse> deletePlanController(
            @RequestParam Long planId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentOwnerForPlan(planId, authentication);
        return new ResponseEntity<>(planService.deletePlan(planId ), HttpStatus.OK);
    }
    @DeleteMapping("delete-all-plan")
    public ResponseEntity<MessageResponse> deleteAllPlanController(
            @RequestParam Long treatId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentOwner(treatId, authentication);
        return new ResponseEntity<>(planService.deleteAllPlan(treatId ), HttpStatus.OK);
    }
    @GetMapping("/get-plans")
    public ResponseEntity<Set<PlanDTO>>getPlans(HttpServletRequest request, Authentication authentication) {
        return new ResponseEntity<>(
                authorizationService.filterPlans(planService.getPlans(), authentication),HttpStatus.OK);
    }
}
