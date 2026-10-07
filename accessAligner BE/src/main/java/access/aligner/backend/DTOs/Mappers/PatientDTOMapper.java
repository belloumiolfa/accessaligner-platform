package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.Entities.Patient;
import access.aligner.backend.Repositories.PatientRepository;
import access.aligner.backend.Repositories.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor

public class PatientDTOMapper implements Function<Patient, PatientDTO> {
    private final TreatmentRepository treatmentRepository;
    private final PatientRepository patientRepository;

    private final UserDTOMapper userDTOMapper;

    @Override
    public PatientDTO apply(Patient patient) {
        return new PatientDTO(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getBirthday(),
                patient.getSex(),
                patient.getEmail(),
                patient.getPhone(),
                patient.getDisease(),
                patient.getAddress(),
                patient.getComment(),
                patient.getCreatedAt(),
                patient.getUpdatedAt(),
                userDTOMapper.apply(patient.getDoctor()),
                getNumberTreatment(patient.getId())

        );
    }
    int getNumberTreatment(Long patientId ){

       Patient patient = patientRepository.findById(patientId)
               .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
       return treatmentRepository.findByPatient(patient).size();
    }
}
