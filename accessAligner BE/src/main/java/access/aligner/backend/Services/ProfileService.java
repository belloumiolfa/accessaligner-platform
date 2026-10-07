package access.aligner.backend.Services;

import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.DTOs.Requests.ProfileRequest;

public interface ProfileService {
    ProfileDTO addProfile(ProfileRequest profileRequest);

    ProfileDTO updateProfile(ProfileRequest profileRequest, Long userId);

    ProfileDTO getProfile(Long id);
}
