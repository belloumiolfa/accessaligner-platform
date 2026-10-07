package access.aligner.backend.Services;

import access.aligner.backend.Entities.Doctor;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Patient;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Entities.User;
import access.aligner.backend.Repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ResourceAuthorizationServiceTest {
    private static final String USER_EMAIL = "doctor@example.com";

    private UserRepository userRepository;
    private PatientRepository patientRepository;
    private TreatmentRepository treatmentRepository;
    private FileRepository fileRepository;
    private ResourceAuthorizationService authorizationService;
    private Authentication dentistAuthentication;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        patientRepository = mock(PatientRepository.class);
        treatmentRepository = mock(TreatmentRepository.class);
        fileRepository = mock(FileRepository.class);

        authorizationService = new ResourceAuthorizationService(
                userRepository,
                patientRepository,
                treatmentRepository,
                fileRepository,
                mock(PlanRepository.class),
                mock(EstimateRepository.class),
                mock(ProfileRepository.class),
                mock(TreatmentTeamRepository.class),
                mock(MessageRepository.class));

        dentistAuthentication = new UsernamePasswordAuthenticationToken(
                USER_EMAIL,
                "",
                List.of(new SimpleGrantedAuthority("ROLE_DENTIST")));
    }

    @Test
    void allowsDentistToAccessOwnPatient() {
        Doctor owner = new Doctor();
        owner.setId(7L);
        Patient patient = new Patient();
        patient.setDoctor(owner);
        User actor = User.builder().id(7L).email(USER_EMAIL).build();

        when(patientRepository.findById(15L)).thenReturn(Optional.of(patient));
        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(Optional.of(actor));

        assertDoesNotThrow(() -> authorizationService.requirePatientAccess(15L, dentistAuthentication));
    }

    @Test
    void rejectsDentistAccessToAnotherDoctorsPatient() {
        Doctor otherDoctor = new Doctor();
        otherDoctor.setId(8L);
        Patient patient = new Patient();
        patient.setDoctor(otherDoctor);
        User actor = User.builder().id(7L).email(USER_EMAIL).build();

        when(patientRepository.findById(15L)).thenReturn(Optional.of(patient));
        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(Optional.of(actor));

        assertThrows(AccessDeniedException.class,
                () -> authorizationService.requirePatientAccess(15L, dentistAuthentication));
    }

    @Test
    void rejectsFileWhenSuppliedTreatmentDoesNotMatchItsOwner() {
        Treatment treatment = new Treatment();
        treatment.setId(20L);
        File file = File.builder().id(30L).role("photo").treatment(treatment).build();
        when(fileRepository.findById(30L)).thenReturn(Optional.of(file));

        assertThrows(AccessDeniedException.class,
                () -> authorizationService.requireTreatmentFileAccess(30L, 21L, dentistAuthentication));
    }
}
