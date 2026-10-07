package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.EstimateDTO;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Services.EstimateService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
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


@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")

public class EstimateController {
    private final EstimateService estimateService;
    private final ResourceAuthorizationService authorizationService;

    @PostMapping("saveEstimate")
    public ResponseEntity<TreatmentDTO> saveEstimateController(
            @RequestBody MultipartFile file, @RequestParam String type, @RequestParam Long treatId,
            HttpServletRequest request, Authentication authentication) throws IOException {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        return new ResponseEntity<>( estimateService.saveEstimate(file,type,treatId ), HttpStatus.OK);
    }
    @GetMapping("getEstimate")
    public ResponseEntity<Resource> getEstimateController (
            @RequestParam Long id, HttpServletRequest request, Authentication authentication)
            throws MalformedURLException {
        authorizationService.requireEstimateFileAccess(id, authentication);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "filename");

        return new ResponseEntity<>(estimateService.getEstimate(id),headers, HttpStatus.OK);
    }
    @DeleteMapping("deleteEstimate")
    public  ResponseEntity<MessageResponse> deleteEstimateController (
            @RequestParam Long id, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireEstimateAccess(id, authentication);
        return new ResponseEntity<>(estimateService.deleteEstimate(id),HttpStatus.OK);
    }
    @DeleteMapping("deleteAllEstimate")
    public  ResponseEntity<MessageResponse> deleteAllEstimateController (
            @RequestParam Long id, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentOwner(id, authentication);
        return new ResponseEntity<>(estimateService.deleteAllEstimate(id),HttpStatus.OK);
    }
    @PostMapping("updateEstimateStatus")
    public ResponseEntity<EstimateDTO> updateStatusController (
            @RequestParam Long id, @RequestBody String status, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requireEstimateAccess(id, authentication);
        return new ResponseEntity<>(estimateService.updateEstimateStatus(id, status),HttpStatus.OK);
    }
}
