package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.UserDTO;
import access.aligner.backend.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor

public class UserDTOMapper implements Function<User, UserDTO> {
    private final UserStatusDToMapper userStatusDTO;
    private final ProfileDtoMapper profileDtoMapper;

    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getRoleList(),
                profileDtoMapper.apply(user.getProfile()),
                user.getEventList(),
                user.getUserStatus().stream()
                        .filter(s -> s.getUpdatedLast())
                        .findFirst()
                        .map(userStatusDTO)
                        .orElse(null)
        );
    }
 }
