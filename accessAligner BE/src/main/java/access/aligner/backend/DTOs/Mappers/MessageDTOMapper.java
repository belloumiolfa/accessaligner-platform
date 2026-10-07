package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.MessageDTO;
import access.aligner.backend.DTOs.SeenDTO;
import access.aligner.backend.Entities.Message;
import access.aligner.backend.Entities.Profile;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Repositories.ProfileRepository;
import access.aligner.backend.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class MessageDTOMapper implements Function<Message, MessageDTO> {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Override
    public MessageDTO apply(Message message) {
        return new MessageDTO(
                message.getId(),
                getSenderName(message.getSender().getId()),
                message.getSender().getId(),
                message.getText(),
                message.getCreatedAt(),
                seenBy(message.getSeenBy())

        );
    }

    private String getSenderName(Long sender) {
        User user=userRepository.findById(sender).get();

        Profile profile= profileRepository.findById(user.getProfile().getId()).get();

        if(profile.getFirstName()==null)
        {
            return user.getUsername();
        }else {
            return profile.getFirstName()+" "+profile.getLastName();
        }
    }
    private Set<SeenDTO> seenBy(Set<User> seenBy) {
        Set<SeenDTO> result = new HashSet<>();
        if(seenBy!=null && seenBy.size()>0) {
            for (User user : seenBy) {
                result.add(new SeenDTO(user.getId(), getSenderName(user.getId())));
            }
        }
        return result ;
    }

}
