package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.UserStatusDTO;
import access.aligner.backend.Entities.Admin;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Entities.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
@RequiredArgsConstructor

public class UserStatusDToMapper implements Function<UserStatus, UserStatusDTO> {
    private final AdminDTOMapper adminDTOMapper;

    @Override
    public UserStatusDTO apply(UserStatus userStatus) {
        return new UserStatusDTO(
                userStatus.getId(),
                userStatus.getUpdatedAt(),
                getResponsible(userStatus.getResponsible()),
                userStatus.getStatus()
        );
    }
    AdminDTO getResponsible (User responsible){
        if (responsible!=null) {
            return adminDTOMapper.apply(responsible);
        }else{
            return null;
        }
    }
}
