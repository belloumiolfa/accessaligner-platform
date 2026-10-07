package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.DTOs.Mappers.PatientDTOMapper;
import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.DTOs.Requests.PatientRequest;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Repositories.*;
import access.aligner.backend.Services.PatientService;
import access.aligner.backend.Services.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientDTOMapper patientDTOMapper;
    private final DoctorRepository doctorRepository;
    private final TreatmentService treatmentService;
    private final UserRepository userRepository;
    @Override
    public List<PatientDTO> addPatient(PatientRequest data, Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        Patient patient = Patient.builder()
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .birthday(data.getBirthday())
                .sex(data.getSex())
                .email(data.getEmail())
                .phone(data.getPhone())
                .disease(data.getDisease())
                .address(data.getAddress())
                .comment(data.getComment())
                .doctor( doctor)
                .createdAt(new Date())
                .nbrTreat(0)
                .build();

        patientRepository.save(patient);

        return getDoctorPateints(id);
    }

    @Override
    public List<PatientDTO> getPatients() {
        List<Patient> patients= patientRepository.findAll( ).stream()
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                // Sorting in descending order
                .collect(Collectors.toList());

        List<PatientDTO> result = new ArrayList<PatientDTO>(patients.size());

        for (Patient patient:patients) {
            result.add(patientDTOMapper.apply(patient));
        }
        return result;
    }

    @Override
    public PatientDTO getPatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        return patientDTOMapper.apply(patient);
    }

    @Override
    public PatientDTO upodatePatient(PatientRequest patientRequest,Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
            patient.setFirstName(patientRequest.getFirstName());
            patient.setLastName(patientRequest.getLastName());
            patient.setBirthday(patientRequest.getBirthday());
            patient.setSex(patientRequest.getSex());
            patient.setEmail(patientRequest.getEmail());
            patient.setPhone(patientRequest.getPhone());
            patient.setDisease(patientRequest.getDisease());
            patient.setAddress(patientRequest.getAddress());
            patient.setComment(patientRequest.getComment());
            patient.setUpdatedAt(new Date());

        Patient updates=patientRepository.save(patient);
        return patientDTOMapper.apply(updates);
    }

    @Override
    public List<PatientDTO> deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        Long doctorId = patient.getDoctor().getId();
        // get treatments associated with this patient
        Collection<Treatment> treatments =treatmentService.getPatientTreatments(id);

        //delete treatment
        for (Treatment treatment:treatments) {
            treatmentService.deleteTreatment(treatment.getId(),null);
        }

        // delete patient
        patientRepository.deleteById(id);

        // return patient list
        return getDoctorPateints(doctorId);
    }

    @Override
    public List<PatientDTO> getDoctorPateints(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Collection<Patient> patients= patientRepository.findByDoctor(doctor)
                .stream()
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))  // Sorting in descending order
                .collect(Collectors.toList());

        List<PatientDTO> result = new ArrayList<PatientDTO>(patients.size());

        for (Patient patient:patients) {
            result.add(patientDTOMapper.apply(patient));
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getNbrPateints(Long userId) {
        Integer result =0;
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Set<Role> userRole = user.getRoleList();
        if(userRole.stream().anyMatch(role -> role.getName() == Enum_Role.SUPER_ADMIN)){
            result = patientRepository.findAll().size();
        } else if(userRole.stream().anyMatch(role -> role.getName() == Enum_Role.DENTIST)){
            // get patients , foreach patient to get treatments and calculate treatments
            Doctor doctor = doctorRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
            result = result + patientRepository.findByDoctor(doctor).size();

        }else {
            result=result + patientRepository.findAll().size();
        }
        return result;
    }

}
