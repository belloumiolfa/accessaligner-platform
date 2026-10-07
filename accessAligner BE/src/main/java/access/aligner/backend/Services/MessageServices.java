package access.aligner.backend.Services;

 import access.aligner.backend.DTOs.MessageDTO;
 import access.aligner.backend.DTOs.Requests.SaveMessageRequest;
import access.aligner.backend.Entities.Message;

import java.util.List;

public interface MessageServices {
    MessageDTO saveMessage(SaveMessageRequest saveMessageRequest);

    List<MessageDTO> getMessages(Long treatId);

    MessageDTO markAsSeen(Long messageId, Long userId);
}
