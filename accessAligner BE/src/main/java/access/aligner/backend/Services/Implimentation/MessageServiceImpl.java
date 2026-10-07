package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.Mappers.MessageDTOMapper;
import access.aligner.backend.DTOs.MessageDTO;
import access.aligner.backend.DTOs.Requests.SaveMessageRequest;
import access.aligner.backend.Entities.Message;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Repositories.MessageRepository;
import access.aligner.backend.Repositories.TreatmentRepository;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Services.MessageServices;
import access.aligner.backend.Services.TreatmentService;
import access.aligner.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor

public class MessageServiceImpl implements MessageServices {
    private final UserRepository userRepository;
    private final TreatmentRepository treatmentRepository;
    private final MessageRepository messageRepository;
    private final MessageDTOMapper messageDTOMapper;
    @Override
    public MessageDTO saveMessage(SaveMessageRequest saveMessageRequest) {
        User user =userRepository.findById(saveMessageRequest.getSender()).get();
        Treatment treatment=treatmentRepository.findById(saveMessageRequest.getTreatment()).get();

        Message newMessage= Message.builder()
                .sender(user)
                .treatment(treatment)
                .createdAt(new Date())
                .text(saveMessageRequest.getMessage())
                .build();
        newMessage=messageRepository.save(newMessage);

        return messageDTOMapper.apply(newMessage) ;
    }

    @Override
    public List<MessageDTO> getMessages(Long treatId) {
        List<MessageDTO> result = new ArrayList<>();

        List<Message> messages = messageRepository.findByTreatment(treatmentRepository.findById(treatId).get());

        for (Message message: messages) {
            result.add(messageDTOMapper.apply(message));
        }
        return result;
    }

    @Override
    public MessageDTO markAsSeen(Long messageId, Long userId) {
        Message message =messageRepository.findById(messageId).get();
        User user =userRepository.findById(userId).get();
        message.getSeenBy().add(user);
        message=messageRepository.save(message);
        return messageDTOMapper.apply(message);
    }
}
