package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.UserDTO;
import access.aligner.backend.Entities.Admin;
import access.aligner.backend.Entities.User;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
@RequiredArgsConstructor

public class AdminDTOMapper implements Function<User, AdminDTO> {
    private final ProfileDtoMapper profileDtoMapper;

    @Override
    public AdminDTO apply(User user) {
            return new AdminDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRoleList(),
                    profileDtoMapper.apply(user.getProfile())

            );
        }
    }


