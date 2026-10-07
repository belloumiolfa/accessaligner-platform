package access.aligner.backend.Services;

import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.DTOs.Requests.*;
import access.aligner.backend.DTOs.Responces.AuthenticationResponse;
import access.aligner.backend.DTOs.Responces.ConfirmationInfosResponse;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.UserDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    MessageResponse signUpService(SignupRequest signUpRequest);

    @Transactional
    MessageResponse confirmRegistration(ConfirmRequest token);

    @Transactional
    MessageResponse cancelRegistration(ConfirmRequest token);

    @Transactional
    MessageResponse acceptUser(AcceptRequest userId);

    @Transactional
    MessageResponse rejectUser(CancelRequest data);

    UserDTO getUserById(Long id);

    // UserDTO getUserById(Long id);
    UserDTO updateStatus (UpdateStatusRequest data);
    AuthenticationResponse signin(SigninRequest signinRequest);
    MessageResponse forgetPassword(String email);
    MessageResponse updatePassword (UpdatePasswordRequest data);
    AuthenticationResponse securitySettings(SecuritySettingRequest data);
     List<UserDTO> getDoctors();

    ConfirmationInfosResponse getConfirmationInfoService(String token);
}
