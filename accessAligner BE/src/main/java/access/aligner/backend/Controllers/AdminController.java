package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.Requests.AcceptRequest;
import access.aligner.backend.DTOs.Requests.CancelRequest;
import access.aligner.backend.DTOs.Requests.NewAdminRequest;
import access.aligner.backend.DTOs.Requests.UpdateStatusRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Repositories.AdminRepository;
import access.aligner.backend.Services.AdminService;
import access.aligner.backend.Services.UserService;
import access.aligner.backend.Validators.Sequences.SequenceValidation;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/")
@RequiredArgsConstructor
@Validated

public class AdminController {
    private final AdminService adminService;
    private final UserService userService;

    @PutMapping("/admin/users/{userId}/accept")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> acceptAccount(
            @RequestBody AcceptRequest userId, HttpServletRequest request){
        return new ResponseEntity<>(userService.acceptUser(userId), HttpStatus.OK);
    }
    @PutMapping("/admin/users/{userId}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> rejectAccount(
            @RequestBody CancelRequest data, HttpServletRequest request){
        return new ResponseEntity<>(userService.rejectUser(data ), HttpStatus.OK);
    }
    @PostMapping("new-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> newAdminController(
            @Validated(SequenceValidation.class ) @RequestBody  NewAdminRequest data, HttpServletRequest request) throws MessagingException {
        return new ResponseEntity<>( adminService.newAdmin(data), HttpStatus.OK);
    }
    @DeleteMapping("delete-admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<MessageResponse> deleteAdminController(
          @RequestParam Long id, HttpServletRequest request)   {
        return new ResponseEntity<>( adminService.deleteAdmin(id), HttpStatus.OK);
    }
    @GetMapping("switch-role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<AdminDTO> switchRoleController(
              @RequestParam Long adminId, Boolean switchRole, HttpServletRequest request)   {
        return new ResponseEntity<>( adminService.switchToSuperAdmin(adminId, switchRole), HttpStatus.OK);
    }
}
