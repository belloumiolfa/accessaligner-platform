package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.MessageDTO;
import access.aligner.backend.DTOs.Requests.SaveMessageRequest;
import access.aligner.backend.Services.MessageServices;
import access.aligner.backend.Services.ResourceAuthorizationService;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/api/private/messages")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")

public class MessageController {

    private final MessageServices messageServices;
    private final ResourceAuthorizationService authorizationService;

    @PostMapping("save-message")
    public  ResponseEntity<MessageDTO> saveMessageController(
            @RequestBody SaveMessageRequest saveMessageRequest, HttpServletRequest request,
            Authentication authentication) {
        authorizationService.requireTreatmentAccess(saveMessageRequest.getTreatment(), authentication);
        saveMessageRequest.setSender(authorizationService.currentUserId(authentication));
        return new ResponseEntity<>(messageServices.saveMessage(saveMessageRequest), HttpStatus.OK);
    }

    @GetMapping("get-messages")
    public  ResponseEntity<List<MessageDTO>> getMessasgesController(
            @RequestParam Long treatId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireTreatmentAccess(treatId, authentication);
        return new ResponseEntity<>(messageServices.getMessages(treatId), HttpStatus.OK);
    }

    @GetMapping("seen")
    public ResponseEntity<MessageDTO> markAsSeenController (
            @RequestParam Long messageId, HttpServletRequest request, Authentication authentication) {
        authorizationService.requireMessageAccess(messageId, authentication);
        return new ResponseEntity<>(
                messageServices.markAsSeen(messageId, authorizationService.currentUserId(authentication)),
                HttpStatus.OK);
    }

}
