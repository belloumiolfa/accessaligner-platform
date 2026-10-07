package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.EstimateDTO;
import access.aligner.backend.DTOs.Mappers.EstimateDTOMapper;
import access.aligner.backend.DTOs.Mappers.TreatmentDTOMapper;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Entities.Estimate;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Plan;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.EstimateRepository;
import access.aligner.backend.Repositories.FileRepository;
import access.aligner.backend.Repositories.PlanRepository;
import access.aligner.backend.Repositories.TreatmentRepository;
import access.aligner.backend.Services.EstimateService;
import access.aligner.backend.Services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstimateServiceImpl implements EstimateService {
    private final EstimateRepository estimateRepository;
    private final FileService fileService;
    private final TreatmentRepository treatmentRepository;
    private final TreatmentDTOMapper treatmentDTOMapper;
    private final EstimateDTOMapper estimateDTOMapper;
    private final FileRepository fileRepository;
    private final PlanRepository planRepository;
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public TreatmentDTO saveEstimate(MultipartFile file,String type,Long treatId  ) throws IOException {
        // Save the file
        File savedFile=fileService.saveFile(file,"Estimates");
        Treatment treatment =treatmentRepository.findById(treatId).get();

        treatment.setUpdatedAt(new Date());

        // Associate this file to current treatment
        savedFile.setTreatment(treatment);
        savedFile.setRole(type);
        // Generate new Estimate
        Estimate estimate= Estimate.builder()
                .status(Enum_Status.valueOf("NEW"))
                .file(savedFile)
                .build();
        // Save estimate
        estimateRepository.save(estimate);

        return treatmentDTOMapper.apply(treatmentRepository.findById(treatId).get(),null);
    }

    @Override
    public Resource getEstimate(Long id) throws MalformedURLException {
        return fileService.getFile(id,"Estimates");
    }

    @Override
    public MessageResponse deleteEstimate(Long id) {
        Estimate estimate =estimateRepository.findById(id).get();
        File file =estimate.getFile();

        Treatment treat = file.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save(treat);

        MessageResponse res=fileService.deleteFile(file.getId(),"Estimates");
        estimateRepository.delete(estimate);

        return res;
    }
    @Override
    public EstimateDTO updateEstimateStatus(Long id, String status) {

        Estimate estimate = estimateRepository.findById(id).get();
        File file = estimate.getFile();
        Treatment treatment = treatmentRepository.findById(file.getTreatment().getId()).get();
        Enum_Status previousStatus =treatment.getStatus();

        if (status.equals("ACCEPTED")) {

            // Reject all other estimates with the same role
            rejectOtherEstimatesWithSameRole(treatment, file.getRole());

            // Handle final estimates
            if (file.getRole().equals("final_estim")) {
                treatment.setStatus(Enum_Status.ACCEPTED);
                Optional<Plan> plan = planRepository.findByTreatment(treatment).stream()
                        .filter(p -> p.getStatus().equals(Enum_Status.ACCEPTED))
                        .findAny();

                if (plan.isEmpty()) {
                    plan = planRepository.findByTreatment(treatment).stream()
                            .max(Comparator.comparing(Plan::getCreatedAt));

                    plan.ifPresent(p -> {
                        p.setStatus(Enum_Status.ACCEPTED);
                        planRepository.save(p);
                    });
                }
            } else {
                treatment.setStatus(Enum_Status.CONFIRMED);
            }

        }else {

            treatment.setStatus(previousStatus);

        }
        treatment.setUpdatedAt(new Date());
        treatmentRepository.save(treatment);

        estimate.setStatus(Enum_Status.valueOf(status));
        Estimate updatedEstimate = estimateRepository.save(estimate);

        return estimateDTOMapper.apply(updatedEstimate);
    }

    private void rejectOtherEstimatesWithSameRole(Treatment treatment, String role) {
        Set<File> estimateFiles = fileRepository.findByTreatment(treatment).stream()
                .filter(e -> e.getRole().equals(role))
                .collect(Collectors.toSet());

        for (File estimateFile : estimateFiles) {
            Estimate est = estimateRepository.findByFile(estimateFile).get();
             est.setStatus(Enum_Status.REJECTED);
            estimateRepository.save(est);
        }
    }

/*
    @Override
    public EstimateDTO updateEstimateStatus(Long id, String status) {

        Estimate estimate =estimateRepository.findById(id).get();
        File file =estimate.getFile();
        Treatment treatment =treatmentRepository.findById(file.getTreatment().getId()).get();

        // Reject all others estimate
        if(status.equals(("ACCEPTED"))){

            // Get estimate files for a specific treatment with the same role
            Set<File> estimateFiles = fileRepository.findByTreatment(treatment).stream().filter(
                    e->e.getRole().equals(
                            fileRepository.findById(estimate.getFile().getId()).get().getRole()
                    )
            ).collect(Collectors.toSet());

            // Set all others estimates to Rejected
            for (File estimateFile :estimateFiles
                 ) {
                Estimate est = estimateRepository.findByFile(estimateFile).get();
                est.setStatus(Enum_Status.REJECTED);
                estimateRepository.save(est);
            }

            if(file.getRole().equals("final_estim")){

                treatment.setStatus(Enum_Status.valueOf(status));
                //  Treatment treat = estimate.getFile().getTreatment();

                // accept last plan created if there is no accepted plan
                Set<Plan> plans =planRepository.findByTreatment(treatment);
                Optional<Plan> plan =plans.stream().filter(
                        p->p.getStatus().equals(Enum_Status.valueOf("ACCEPTED"))).findAny();
                if(plan.isEmpty()){
                    plan=plans.stream()
                            .max(Comparator.comparing(Plan::getCreatedAt));
                    plan.get().setStatus(Enum_Status.valueOf("ACCEPTED"));
                    planRepository.save(plan.get());
                }


                treatment.setUpdatedAt(new Date());
                treatmentRepository.save(treatment);

            }else{
                treatment.setStatus(Enum_Status.valueOf("CONFIRMED"));

            }

        }
        else{
            if(file.getRole().equals("final_estim")){

                treatment.setStatus(Enum_Status.valueOf(status));

                treatment.setUpdatedAt(new Date());
                treatmentRepository.save(treatment);

            }
        }
        estimate.setStatus(Enum_Status.valueOf(status));
        Estimate updatedEstimate=estimateRepository.save(estimate);


        return estimateDTOMapper.apply(updatedEstimate);
    }*/

    @Override
    public MessageResponse deleteAllEstimate(Long id) {
        Treatment treatment = treatmentRepository.findById(id).get();

         Collection<File> files = fileRepository.findByTreatment(treatment);

         // delete all estimates
        for (File file : files
        ) {
            if(file.getRole().equals("init_estim") || file.getRole().equals("final_estim") ) {
                Estimate estimate = estimateRepository.findByFile(file).get();
                if (!estimate.getStatus().equals(Enum_Status.valueOf("ACCEPTED"))) {
                    Treatment treat = file.getTreatment();
                    treat.setUpdatedAt(new Date());
                    treatmentRepository.save(treat);

                   // estimateRepository.delete(estimate);
                    fileService.deleteFile(file.getId(), "Estimates");

                }
            }
        }

        return MessageResponse.builder().message(
         messages.getString("EstimateService.deleteAllEstimate.MessageResponse")).build();
    }
}
