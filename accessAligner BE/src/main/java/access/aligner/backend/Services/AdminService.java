package access.aligner.backend.Services;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.Requests.NewAdminRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import jakarta.mail.MessagingException;

import java.util.List;

public interface AdminService {
    MessageResponse newAdmin(NewAdminRequest data) throws MessagingException;
    List<AdminDTO> getAdmins();
    MessageResponse deleteAdmin(Long id);
    AdminDTO switchToSuperAdmin(Long adminId, Boolean switchRole );
}
