package access.aligner.backend.Services;

import access.aligner.backend.DTOs.PatientDTO;
import access.aligner.backend.DTOs.PlanDTO;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Repositories.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceAuthorizationService {
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final TreatmentRepository treatmentRepository;
    private final FileRepository fileRepository;
    private final PlanRepository planRepository;
    private final EstimateRepository estimateRepository;
    private final ProfileRepository profileRepository;
    private final TreatmentTeamRepository treatmentTeamRepository;
    private final MessageRepository messageRepository;

    @Transactional(readOnly = true)
    public Long currentUserId(Authentication authentication) {
        return currentUser(authentication).getId();
    }

    @Transactional(readOnly = true)
    public void requireUserReadAccess(Long userId, Authentication authentication) {
        User target = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        User actor = currentUser(authentication);
        if (!target.getId().equals(actor.getId())
                && !hasRole(authentication, "ADMIN")
                && !isSuperAdmin(authentication)) {
            deny();
        }
    }

    @Transactional(readOnly = true)
    public boolean hasRole(Authentication authentication, String role) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role));
    }

    @Transactional(readOnly = true)
    public void requirePatientAccess(Long patientId, Authentication authentication) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        requirePatientAccess(patient, authentication);
    }

    @Transactional(readOnly = true)
    public void requirePatientOwner(Long patientId, Authentication authentication) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        User actor = currentUser(authentication);
        if (!isSuperAdmin(authentication)
                && (patient.getDoctor() == null || !patient.getDoctor().getId().equals(actor.getId()))) {
            deny();
        }
    }

    @Transactional(readOnly = true)
    public void requireTreatmentAccess(Long treatmentId, Authentication authentication) {
        Treatment treatment = treatmentRepository.findById(treatmentId)
                .orElseThrow(() -> new EntityNotFoundException("Treatment not found"));
        requireTreatmentAccess(treatment, authentication);
    }

    @Transactional(readOnly = true)
    public void requireTreatmentOwner(Long treatmentId, Authentication authentication) {
        Treatment treatment = treatmentRepository.findById(treatmentId)
                .orElseThrow(() -> new EntityNotFoundException("Treatment not found"));
        User actor = currentUser(authentication);
        if (!isSuperAdmin(authentication)
                && (treatment.getPatient() == null
                || treatment.getPatient().getDoctor() == null
                || !treatment.getPatient().getDoctor().getId().equals(actor.getId()))) {
            deny();
        }
    }

    @Transactional(readOnly = true)
    public void requireTreatmentFileAccess(Long fileId, Authentication authentication) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("File not found"));
        if (file.getTreatment() == null
                || !("photo".equals(file.getRole()) || "clinic".equals(file.getRole()))) {
            deny();
        }
        requireTreatmentAccess(file.getTreatment(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireTreatmentFileAccess(Long fileId, Long treatmentId, Authentication authentication) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("File not found"));
        Long parentTreatmentId;
        if (file.getPlan() != null && file.getPlan().getTreatment() != null) {
            parentTreatmentId = file.getPlan().getTreatment().getId();
        } else if (file.getTreatment() != null
                && ("photo".equals(file.getRole()) || "clinic".equals(file.getRole()))) {
            parentTreatmentId = file.getTreatment().getId();
        } else {
            deny();
            return;
        }
        if (parentTreatmentId == null || !parentTreatmentId.equals(treatmentId)) {
            deny();
        }
        requireTreatmentAccess(parentTreatmentId, authentication);
    }

    @Transactional(readOnly = true)
    public void requirePlanFileAccess(Long fileId, Long planId, Long treatmentId, Authentication authentication) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("File not found"));
        if (file.getPlan() == null
                || !file.getPlan().getId().equals(planId)
                || file.getPlan().getTreatment() == null
                || !file.getPlan().getTreatment().getId().equals(treatmentId)) {
            deny();
        }
        requireTreatmentAccess(treatmentId, authentication);
    }

    @Transactional(readOnly = true)
    public void requirePlanAccess(Long planId, Authentication authentication) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));
        if (plan.getTreatment() == null) {
            deny();
        }
        requireTreatmentAccess(plan.getTreatment(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireTreatmentOwnerForPlan(Long planId, Authentication authentication) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));
        if (plan.getTreatment() == null) {
            deny();
        }
        requireTreatmentOwner(plan.getTreatment().getId(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireEstimateAccess(Long estimateId, Authentication authentication) {
        Estimate estimate = estimateRepository.findById(estimateId)
                .orElseThrow(() -> new EntityNotFoundException("Estimate not found"));
        if (estimate.getFile() == null || estimate.getFile().getTreatment() == null) {
            deny();
        }
        requireTreatmentAccess(estimate.getFile().getTreatment(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireMessageAccess(Long messageId, Authentication authentication) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new EntityNotFoundException("Message not found"));
        if (message.getTreatment() == null) {
            deny();
        }
        requireTreatmentAccess(message.getTreatment(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireEstimateFileAccess(Long fileId, Authentication authentication) {
        Estimate estimate = estimateRepository.findByFile_Id(fileId)
                .orElseThrow(() -> new EntityNotFoundException("Estimate file not found"));
        if (estimate.getFile() == null || estimate.getFile().getTreatment() == null) {
            deny();
        }
        requireTreatmentAccess(estimate.getFile().getTreatment(), authentication);
    }

    @Transactional(readOnly = true)
    public void requireProfileReadAccess(Long profileId, Authentication authentication) {
        User owner = userRepository.findByProfile_Id(profileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile owner not found"));
        User actor = currentUser(authentication);
        if (isSuperAdmin(authentication) || owner.getId().equals(actor.getId())) {
            return;
        }

        boolean sharedTreatmentAccess = false;
        if (owner instanceof Doctor doctor) {
            sharedTreatmentAccess = patientRepository.findByDoctor(doctor).stream()
                    .flatMap(patient -> treatmentRepository.findByPatient(patient).stream())
                    .anyMatch(treatment -> canAccessTreatment(treatment, authentication));
        } else if (owner instanceof Admin admin) {
            sharedTreatmentAccess = treatmentTeamRepository.findByResponsible(admin).stream()
                    .map(TreatmentTeam::getProject)
                    .anyMatch(treatment -> canAccessTreatment(treatment, authentication));
        }
        if (!sharedTreatmentAccess) {
            deny();
        }
    }

    @Transactional(readOnly = true)
    public void requireProfilePhotoOwner(Long fileId, Authentication authentication) {
        Profile profile = profileRepository.findByPhoto_Id(fileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile photo not found"));
        requireProfileReadAccess(profile.getId(), authentication);
    }

    @Transactional(readOnly = true)
    public List<TreatmentDTO> filterTreatments(List<TreatmentDTO> treatments, Authentication authentication) {
        if (isSuperAdmin(authentication)) {
            return treatments;
        }
        return treatments.stream()
                .filter(treatment -> canAccessTreatment(treatment.id(), authentication))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PatientDTO> filterPatients(List<PatientDTO> patients, Authentication authentication) {
        if (isSuperAdmin(authentication)) {
            return patients;
        }
        return patients.stream()
                .filter(patient -> canAccessPatient(patient, authentication))
                .toList();
    }

    @Transactional(readOnly = true)
    public Set<PlanDTO> filterPlans(Set<PlanDTO> plans, Authentication authentication) {
        if (isSuperAdmin(authentication)) {
            return plans;
        }
        Set<Long> accessiblePlanIds = planRepository.findAll().stream()
                .filter(plan -> plan.getTreatment() != null
                        && canAccessTreatment(plan.getTreatment(), authentication))
                .map(Plan::getId)
                .collect(Collectors.toSet());
        return plans.stream()
                .filter(plan -> accessiblePlanIds.contains(plan.id()))
                .collect(Collectors.toSet());
    }

    private void requirePatientAccess(Patient patient, Authentication authentication) {
        if (!canAccessPatient(patient, authentication)) {
            deny();
        }
    }

    private boolean canAccessPatient(PatientDTO patient, Authentication authentication) {
        Patient entity = patientRepository.findById(patient.id()).orElse(null);
        return entity != null && canAccessPatient(entity, authentication);
    }

    private void requireTreatmentAccess(Treatment treatment, Authentication authentication) {
        if (!canAccessTreatment(treatment, authentication)) {
            deny();
        }
    }

    private boolean canAccessPatient(Patient patient, Authentication authentication) {
        if (isSuperAdmin(authentication)) {
            return true;
        }
        User actor = currentUser(authentication);
        if (hasRole(authentication, "DENTIST")
                && patient.getDoctor() != null
                && patient.getDoctor().getId().equals(actor.getId())) {
            return true;
        }
        return hasRole(authentication, "ADMIN")
                && treatmentRepository.findByPatient(patient).stream()
                    .anyMatch(treatment -> isAssignedAdmin(treatment, actor.getId()));
    }

    private boolean canAccessTreatment(Long treatmentId, Authentication authentication) {
        Treatment treatment = treatmentRepository.findById(treatmentId).orElse(null);
        return treatment != null && canAccessTreatment(treatment, authentication);
    }

    private boolean canAccessTreatment(Treatment treatment, Authentication authentication) {
        if (isSuperAdmin(authentication)) {
            return true;
        }
        User actor = currentUser(authentication);
        if (hasRole(authentication, "DENTIST")
                && treatment.getPatient() != null
                && treatment.getPatient().getDoctor() != null
                && treatment.getPatient().getDoctor().getId().equals(actor.getId())) {
            return true;
        }
        return hasRole(authentication, "ADMIN") && isAssignedAdmin(treatment, actor.getId());
    }

    private boolean isAssignedAdmin(Treatment treatment, Long userId) {
        return treatment.getTeam() != null && treatment.getTeam().stream()
                .anyMatch(team -> team.getResponsible() != null
                        && team.getResponsible().getId().equals(userId));
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            deny();
        }
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new AccessDeniedException("Authenticated user was not found"));
    }

    private boolean isSuperAdmin(Authentication authentication) {
        return hasRole(authentication, "SUPER_ADMIN");
    }

    private void deny() {
        throw new AccessDeniedException("You are not authorized to access this resource");
    }
}
