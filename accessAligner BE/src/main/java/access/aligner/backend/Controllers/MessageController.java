package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.MessageDTO;
import access.aligner.backend.DTOs.Requests.SaveMessageRequest;
import access.aligner.backend.Entities.Message;
import access.aligner.backend.Services.MessageServices;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/messages")
@RequiredArgsConstructor
@Validated

public class MessageController {

    private final MessageServices messageServices;
    @PostMapping("save-message")
    public  ResponseEntity<MessageDTO> saveMessageController(
            @RequestBody SaveMessageRequest saveMessageRequest, HttpServletRequest request){
        return new ResponseEntity<>(messageServices.saveMessage(saveMessageRequest), HttpStatus.OK);
    }
    @GetMapping("get-messages")
    public  ResponseEntity<List<MessageDTO>> getMessasgesController(
            @RequestParam Long treatId, HttpServletRequest request){
        return new ResponseEntity<>(messageServices.getMessages(treatId), HttpStatus.OK);
    }

    @GetMapping("seen")
    public ResponseEntity<MessageDTO> markAsSeenController (
            @RequestParam Long messageId, Long userId, HttpServletRequest request){
        return new ResponseEntity<>(messageServices.markAsSeen(messageId, userId), HttpStatus.OK);
    }

}
