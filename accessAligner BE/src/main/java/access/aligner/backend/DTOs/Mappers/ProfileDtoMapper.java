package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Profile;
import access.aligner.backend.Services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
@RequiredArgsConstructor

public class ProfileDtoMapper implements Function<Profile, ProfileDTO> {
    private final FileService fileService;
    @Override
    public ProfileDTO apply(Profile profile) {
            return new ProfileDTO(
                    profile.getId(),
                    profile.getFirstName(),
                    profile.getLastName() ,
                    profile.getDateOfBirth(),
                    profile.getDescription(),
                    profile.getProfession(),
                    profile.getPhone(),
                    profile.getMobile(),
                    profile.getAddress(),
                    profile.getTax(),
                    profile.getCreatedAt(),
                    profile.getUpdatedAt(),
                    profile.getPhoto()
            );
    }
}
