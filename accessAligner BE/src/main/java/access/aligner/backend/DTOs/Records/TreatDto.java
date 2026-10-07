package access.aligner.backend.DTOs.Records;

import access.aligner.backend.Entities.File;

import java.util.Date;
import java.util.List;
import java.util.Set;

public record TreatDto(
        Long id,
        String status,
        String previousStatus,
        String frenchStatus,
        String type,
        Long Progress,
        Long planId,
        Date deliveryDate,
        PatientDto patient  ,
        DentistDto dentist  ,
        List<MemberDto> team

        ) {



}
