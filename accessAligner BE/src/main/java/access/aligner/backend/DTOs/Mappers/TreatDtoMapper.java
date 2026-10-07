package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.Records.DentistDto;
import access.aligner.backend.DTOs.Records.MemberDto;
import access.aligner.backend.DTOs.Records.PatientDto;
import access.aligner.backend.DTOs.Records.TreatDto;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Enum.Enum_Status;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class TreatDtoMapper {
    private final MessageSource messageSource;
private Plan getNotRejectedPlan(Treatment treat){
   return treat.getPlans().stream().filter(
            plan -> !plan.getStatus().equals(Enum_Status.REJECTED)).findFirst().orElse(null);
}
    public TreatDto toDto(Treatment treat, Locale locale) {
     /*System.out.print("getId = "+treat.getId());
        System.out.print("getStatus = "+treat.getStatus().name());
        System.out.print("getPreviousStatus = "+treat.getPreviousStatus());
        System.out.print("translateStatus = "+ translateStatus(String.valueOf(treat.getStatus()),locale));
        System.out.print("getTreat = "+treat.getTreat());
        System.out.print("calculateCompletionPercentage = "+calculateCompletionPercentage(treat));
     System.out.print("getId palan = "+ (getNotRejectedPlan(treat)==null? null: getNotRejectedPlan(treat).getId()));

      //  System.out.print("getDeleveryDate"+  getNotRejectedPlan(treat)==null? null: getNotRejectedPlan(treat).getDeleveryDate());
     System.out.print("getPatient = "+                toPatientDto(treat.getPatient()));
         System.out.print("getDoctor = "+                toDentistDto(treat.getPatient().getDoctor()));
        System.out.print("getTeam = "+                toMemberDtoList(treat.getTeam()));
*/

        TreatDto tr= new TreatDto(
                treat.getId(),
                treat.getStatus().name(),
                treat.getPreviousStatus(),

                translateStatus(String.valueOf(treat.getStatus()),locale),
                treat.getTreat(),
                calculateCompletionPercentage(treat),
                getNotRejectedPlan(treat)==null? null: getNotRejectedPlan(treat).getId(),
                getNotRejectedPlan(treat)==null? null: getNotRejectedPlan(treat).getDeleveryDate(),
                toPatientDto(treat.getPatient()),
                toDentistDto(treat.getPatient().getDoctor()),
                toMemberDtoList(treat.getTeam())
        );
        return tr ;
    }
    public static Long calculateCompletionPercentage(Treatment treatment) {
        int totalUserFields = 20;
        int filledFields = 0;

        // Check each user-provided field if it's filled
        if (treatment.getAntCross() != null) filledFields++;
        if (treatment.getClassI() != null) filledFields++;
        if (treatment.getCrowding() != null) filledFields++;
        if (treatment.getExtract() != null) filledFields++;
        if (treatment.getGap() != null) filledFields++;
        if (treatment.getOverbite() != null) filledFields++;
        if (treatment.getTreat() != null) filledFields++;
        if (treatment.getPostCross() != null) filledFields++;
        if (treatment.getReduceOverbite() != null) filledFields++;
        if (treatment.getStatus() != null) filledFields++;
        //if (treatment.getPreviousStatus() != null) filledFields++;
        if (treatment.getDescription() != null) filledFields++;
        if (treatment.getTeethComment() != null) filledFields++;
        if (treatment.getPhotosComment() != null) filledFields++;
        if (treatment.getClinicsComment() != null) filledFields++;
        if (treatment.getPatient() != null) filledFields++;
        if (treatment.getTeeth() != null && !treatment.getTeeth().isEmpty()) filledFields++;
        if (treatment.getPhotos() != null && !treatment.getPhotos().isEmpty()) filledFields++;
        if (treatment.getTeam() != null && !treatment.getTeam().isEmpty()) filledFields++;
        if (treatment.getPlans() != null && !treatment.getPlans().isEmpty()) filledFields++;

         // Calculate percentage
        return (long) ((filledFields /  totalUserFields) * 100);
    }


    private String translateStatus(String status, Locale locale) {
        return messageSource.getMessage("Enum_Status." + status, null, locale);
    }

    private PatientDto toPatientDto(Patient patient) {
        if (patient == null) {
            return null;
        }
        return new PatientDto(patient.getId(), patient.getFirstName(), patient.getLastName());
    }


    private DentistDto toDentistDto(Doctor dentist) {
        if (dentist == null) {

            return null;
        }
        return new DentistDto(dentist.getId(),
                dentist.getProfile().getFirstName(),
                dentist.getProfile().getLastName(),
                dentist.getUsername(),
                dentist.getProfile().getPhoto().getId()!=null? dentist.getProfile().getPhoto().getId():null );
    }


    private MemberDto toMemberDto(TreatmentTeam member) {
        if (member == null) {
            return null;
        }
         return new MemberDto(member.getResponsible().getId(),
                member.getResponsible().getProfile().getFirstName(),
                member.getResponsible().getProfile().getLastName(),
                member.getResponsible().getProfile().getPhoto()
         );
    }

    private List<MemberDto> toMemberDtoList(Set<TreatmentTeam> members) {
    System.out.print("+++++ team : "+members);
        return members.stream()
                .map(this::toMemberDto)
                .collect(Collectors.toList());
    }

}
