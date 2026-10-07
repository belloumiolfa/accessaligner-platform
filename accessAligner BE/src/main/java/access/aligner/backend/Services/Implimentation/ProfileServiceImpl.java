package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.Mappers.ProfileDtoMapper;
import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.DTOs.Requests.ProfileRequest;
import access.aligner.backend.Entities.Profile;
import access.aligner.backend.Repositories.ProfileRepository;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final ProfileDtoMapper profileDtoMapper;
    private final UserRepository userRepository;
    @Override
    public ProfileDTO addProfile(ProfileRequest profileRequest) {
        return null;
    }

    @Override
    public ProfileDTO updateProfile(ProfileRequest data, Long userId) {
        Profile profile=profileRepository.findById(
                userRepository.findById(userId).get().getProfile().getId()
        ).get();
System.out.print("data = "+profile);
        profile.setFirstName(data.getFirstName());
        profile.setLastName(data.getLastName());
        profile.setPhone(data.getPhone());
        profile.setMobile(data.getMobile());
        profile.setAddress(data.getAddress());
        profile.setProfession(data.getProfession());
        profile.setDescription(data.getDescription());

        profile.setDateOfBirth(data.getDateOfBirth());
        profile.setTax(data.getTax());
        profile.setUpdatedAt(new Date());
        Profile updatedProfile =profileRepository.save(profile);

        return profileDtoMapper.apply(updatedProfile);    }

    @Override
    public ProfileDTO getProfile(Long id) {
        Profile profile =  profileRepository.findById(id).orElseThrow();
        return profileDtoMapper.apply(profile) ;
    }
}
