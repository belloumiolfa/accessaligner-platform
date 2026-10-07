package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.Requests.*;
import access.aligner.backend.DTOs.Responces.AuthenticationResponse;
import access.aligner.backend.DTOs.Responces.ConfirmationInfosResponse;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.UserDTO;
import access.aligner.backend.Services.AdminService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import access.aligner.backend.Services.UserService;
import access.aligner.backend.Validators.Sequences.SequenceValidation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final AdminService adminService;
    private final ResourceAuthorizationService authorizationService;

    // Registartaion endpoint

    @PostMapping("/public/signup")
    public ResponseEntity<MessageResponse> signUpController(
            @Validated(SequenceValidation.class)
                @RequestBody SignupRequest signUpRequest ) {
        return new ResponseEntity<>(userService.signUpService(signUpRequest), HttpStatus.OK);
    }
    @GetMapping("/public/signup/confirmation-info")
    public ResponseEntity<ConfirmationInfosResponse> confirmationInfoController(
            @RequestParam String token ) {
        return new ResponseEntity<>(userService.getConfirmationInfoService(token), HttpStatus.OK);
    }
    @PutMapping("/public/signup/confirm-account")
    public ResponseEntity<MessageResponse> confirmAccount(

            @RequestBody ConfirmRequest token ){
        return new ResponseEntity<>(userService.confirmRegistration(token), HttpStatus.OK);
    }
    @PutMapping("/public/signup/cancel-account")
    public ResponseEntity<MessageResponse> cancelAccount(

            @RequestBody ConfirmRequest token){
        return new ResponseEntity<>(userService.cancelRegistration(token), HttpStatus.OK);
    }








    @PostMapping("/public/signin")
    public ResponseEntity<AuthenticationResponse> signInController (
            @Validated(SequenceValidation.class)
            @RequestBody SigninRequest signinRequest,
            HttpServletRequest request) {

        return new ResponseEntity<>(userService.signin(signinRequest), HttpStatus.OK);
    }

    @PostMapping("/updateStatus")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<UserDTO> updateStatus(
            @Validated(SequenceValidation.class)
                @RequestBody UpdateStatusRequest data, HttpServletRequest request){
        return new ResponseEntity<>(userService.updateStatus(data), HttpStatus.OK);
    }
    @GetMapping("/private/getById")
    public ResponseEntity<UserDTO> getById(@RequestParam Long id, Authentication authentication) {
        authorizationService.requireUserReadAccess(id, authentication);
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/private/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        Long userId = authorizationService.currentUserId(authentication);
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity<MessageResponse> forgetPasswordController(
            @Validated(SequenceValidation.class)
                @RequestBody ForgetPasswordRequest forgetPasswordRequest, HttpServletRequest request){
        return new ResponseEntity<>(userService.forgetPassword(forgetPasswordRequest.getEmail()),HttpStatus.OK);
    }
    @PostMapping("/updatePassword")
    @PreAuthorize("permitAll()")
    public ResponseEntity<MessageResponse> updatePasswordController(
            @Validated(SequenceValidation.class)
                @RequestBody UpdatePasswordRequest updatePasswordRequest, HttpServletRequest request){
        return new ResponseEntity<>(userService.updatePassword(updatePasswordRequest),HttpStatus.OK);
    }
    @PostMapping("/private/securitySettings")
    public ResponseEntity<AuthenticationResponse> securitysettingController (
            @Validated(SequenceValidation.class)
                @RequestBody SecuritySettingRequest securitySettingRequest, HttpServletRequest request){
        return new ResponseEntity<>(userService.securitySettings(securitySettingRequest),HttpStatus.OK);
    }
      @GetMapping("/private/get-admins")
      @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
      public ResponseEntity<List<AdminDTO>> getAdminsControleller( HttpServletRequest request)   {
        return new ResponseEntity<>( adminService.getAdmins(), HttpStatus.OK);
    }
    @GetMapping("/private/get-doctors")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'DENTIST')")
    public ResponseEntity<List<UserDTO>> getDoctorsControleller( HttpServletRequest request)   {
        return new ResponseEntity<>( userService.getDoctors(), HttpStatus.OK);
    }

}
