package access.aligner.backend.Services;

import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.DTOs.TreatmentDTO;

import java.util.List;

public interface PatientService  {
    List<PatientDTO> addPatient(PatientRequest data, Long id );
    List<PatientDTO> getPatients();
    PatientDTO getPatient(Long id);
    PatientDTO upodatePatient(PatientRequest patientRequest, Long id );
    List<PatientDTO> deletePatient(Long id);
    List<PatientDTO> getDoctorPateints(Long doctorId);
    Integer getNbrPateints(Long userId);
}
