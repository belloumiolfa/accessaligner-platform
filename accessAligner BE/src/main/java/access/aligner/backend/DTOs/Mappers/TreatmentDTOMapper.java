package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.DTOs.*;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.awt.*;
import java.util.HashSet;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreatmentDTOMapper     {
    private final PatientDTOMapper patientDTOMapper;
    private final TeethRepository teethRepository;
    private final TeethDTOMapper teethDTOMapper;
    private final FileRepository fileRepository;
    private final FileDTOMapper fileDTOMapper;
    private final AdminDTOMapper adminDTOMapper;
    private final EstimateDTOMapper estimateDTOMapper;
    private final EstimateRepository estimateRepository;
    private final PlanDTOMapper planDTOMapper;
    private final PlanRepository planRepository;
    private final AdminRepository adminRepository;
    private final TreatmentTeamRepository treatmentTeamRepository;
    private final TreatmentRepository treatmentRepository;
    private final MessageSource messageSource;

     public TreatmentDTO apply(Treatment treatment, Locale locale) {

        return new TreatmentDTO(
                treatment.getId(),
                treatment.getAntCross(),
                treatment.getClassI(),
                treatment.getCrowding(),
                treatment.getExtract(),
                treatment.getGap(),
                treatment.getOverbite(),
                treatment.getTreat(),
                treatment.getPostCross(),
                treatment.getReduceOverbite(),

                String.valueOf(treatment.getStatus()),
                translateStatus(String.valueOf(treatment.getStatus()),locale),

                treatment.getPreviousStatus(),

                treatment.getDescription(),

                treatment.getTeethComment(),
                treatment.getPhotosComment(),
                treatment.getClinicsComment(),

                patientDTOMapper.apply(treatment.getPatient()),

                getTreatmentTeeth(teethRepository.findByTreatment(treatment)),
                getTreatmentPhotos(fileRepository.findByTreatment(treatment),"photo"),
                getTreatmentPhotos(fileRepository.findByTreatment(treatment),"clinic"),

                getResponsible(treatment.getId()),

                getEstimates(fileRepository.findByTreatment(treatment)),
                getPlans( planRepository.findByTreatment(treatment)),

                treatment.getCreatedAt(),
                treatment.getUpdatedAt()

        );
    }
    private String translateStatus(String status, Locale locale) {
        return messageSource.getMessage("Enum_Status." + status, null, locale);
    }


    Set<TeethDTO>getTreatmentTeeth (Set<Teeth> data){
        Set<TeethDTO> result=new HashSet<>();
         if(!data.isEmpty()) {
            for (Teeth teeth : data
            ) {
                result.add(teethDTOMapper.apply(teeth));
            }
        }
        return result;
    }



    Set<FileDTO>getTreatmentPhotos (Set<File> data, String role ){
         Set<FileDTO> result=new HashSet<>();

         if(!data.isEmpty()) {
              for (File file : data
            ) {
                  if(file.getRole()!=(null) && file.getRole().equals(role)) {
                      result.add(fileDTOMapper.apply(file));
                  }            }
         }
         return result;
    }



    Set<AdminDTO>getResponsible(Long id ){
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        Set<TreatmentTeam> data = treatmentTeamRepository.findByProject(treatment);

        Set<AdminDTO> result=new HashSet<>();

        if(!data.isEmpty()) {
            for (TreatmentTeam team : data) {
                Admin admin = adminRepository.findById(team.getResponsible().getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Treatment team admin not found"));
                result.add(adminDTOMapper.apply(admin));
            }
        }
        return result;
    }



    Set<EstimateDTO>getEstimates(Set<File> data){
        Set<EstimateDTO> result=new HashSet<>();

        if(!data.isEmpty()) {

            for (File file : data
            ) {
                estimateRepository.findByFile(file)
                        .map(estimateDTOMapper)
                        .ifPresent(result::add);
            }
        }
        return result;
    }



    Set<PlanDTO>getPlans(Set<Plan> data){
        Set<PlanDTO> result=new HashSet<>();

        if(data!=null &&!data.isEmpty()) {

            for (Plan plan : data) {
                result.add(planDTOMapper.apply(plan));
            }
        }

        return result;
    }

}
