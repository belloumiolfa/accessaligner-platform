package access.aligner.backend.DTOs;

import access.aligner.backend.Enum.Enum_Status;

import java.util.Date;
import java.util.Set;

public record TreatmentDTO(
        Long id,
        String antCross,
        String classI,
        String crowding,
        String extract,
        String gap,
        String overbite,
        String treat,
        String postCross,
        String reduceOverbite,
        String status, // Original status
        String frenchStatus, // French status
        String previousStatus,
        String description ,
        String teethComment,
        String photosComment,
        String clinicsComment,
        PatientDTO patient,
        Set<TeethDTO> teeth,
        Set<FileDTO> photos,
        Set<FileDTO> clinics,
        Set<AdminDTO> team,
        Set<EstimateDTO> estimates,
        Set<PlanDTO> plans,
        Date createdAt,
        Date updatedAt

) {}
