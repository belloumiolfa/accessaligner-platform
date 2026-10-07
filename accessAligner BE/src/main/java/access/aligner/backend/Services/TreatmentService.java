package access.aligner.backend.Services;

import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.FileDTO;
import access.aligner.backend.DTOs.Records.TreatDto;
import access.aligner.backend.DTOs.Requests.InfosTreatRequest;
import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.DTOs.Requests.TeethRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TeethDTO;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Entities.Treatment;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Set;

public interface TreatmentService {
    TreatmentDTO addInfo(InfosTreatRequest data, Long patientId, Locale locale);
    Treatment getTreatment(Long id);
    Collection<Treatment> getPatientTreatments(Long patientId);
    List<TreatmentDTO> getDoctorTreatments(Long doctorId, Locale locale);
    TreatmentDTO getCurrentTreatment(Long patientId, Locale locale);
    TreatmentDTO addTeeth(TeethRequest data, Long treatId, Locale locale);
    TreatmentDTO addPhotos(MultipartFile[] photos, Long treatId,String comment , String role, Locale locale) throws IOException;
    TreatmentDTO updateStatus(Long treatId, String status, Locale locale);
    List<TreatmentDTO> getTreatments(  Locale locale);
    List<TreatmentDTO> deleteTreatment(Long treatId, Locale locale);
    List<TreatmentDTO> getPatientTreats(Long patientId, Locale locale);
    TreatmentDTO getTreatmentById(Long treatId, Locale locale);
    Integer getTreatmentNbr(Long userId);
    TreatmentDTO addTeam(Long treatId, List<Long> admins, Locale locale);
    List<AdminDTO> getTeam(Long treatId);
    List<AdminDTO> removeTeam(Long treatId, Long adminId);
    MessageResponse resetTeam(Long treatId);
    FileDTO addPhoto(MultipartFile photo, Long treatId, String role) throws IOException;
    Resource getTreatPhoto(Long fileId, Long treatId) throws MalformedURLException;

    /**
     ***********************************************************************************************************
     */
    List<TreatDto> getNotArchivedTreatments(Locale locale, String loggedInUsername);
}
