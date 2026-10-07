package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.Mappers.PlanDTOMapper;
import access.aligner.backend.DTOs.PlanDTO;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Plan;
import access.aligner.backend.Entities.Treatment;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.FileRepository;
import access.aligner.backend.Repositories.PlanRepository;
import access.aligner.backend.Repositories.TreatmentRepository;
import access.aligner.backend.Services.FileService;
import access.aligner.backend.Services.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {
    private final TreatmentRepository treatmentRepository;
    private final PlanRepository planRepository;
    private final FileRepository fileRepository;
    private final FileService fileService;
    private final PlanDTOMapper planDTOMapper;
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public PlanDTO addPlan(Long treatId, String comment,String code ) {
        Treatment treatment =treatmentRepository.findById(treatId).get();

        // Update treatment status to PROGRESS
        treatment.setStatus(Enum_Status.PROGRESS);
        treatment.setUpdatedAt(new Date());
        treatment=treatmentRepository.save(treatment);

        Plan plan = Plan.builder()
                .status(Enum_Status.valueOf("NEW"))
                .treatment(treatment)
                .comment(comment)
                .code(code)
                .build();
        plan=planRepository.save(plan);

        return planDTOMapper.apply(plan);
    }
    @Override
    public PlanDTO addPlanFiles(MultipartFile[] files, Long planId, String role) throws IOException {
        Plan plan=planRepository.findById(planId).get();
        plan.setUpdatedAt(new Date ());

        if(files.length!=0) {
            for (MultipartFile planFile : files) {

                File file = fileService.saveFile(planFile,
                        "Plan-" + plan.getId()+"-Treat-"+plan.getTreatment().getId());
                file.setPlan(plan);
                file.setRole(role);

                fileRepository.save(file);
            }
        }
        Treatment treat=plan.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        return planDTOMapper.apply(plan);
    }
    @Override
    public Resource getPlanFile(Long fileId,Long treatId, Long planId) throws MalformedURLException {
        return fileService.getFile(fileId,"Plan-" + planId+"-Treat-"+treatId);
    }
    @Override
    public PlanDTO updateStatus(Long planId, String status) {
        Plan plan =planRepository.findById(planId).get();

        plan.setStatus(Enum_Status.valueOf(status));
        plan.setUpdatedAt(new Date());
        plan=planRepository.save(plan);

        Treatment treat=plan.getTreatment();
        if(status.equals("PRODUCTION")|| status.equals("DELIVERED")){
            treat.setStatus(Enum_Status.valueOf(status));
        }
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        return planDTOMapper.apply( plan);
    }
    @Override
    public PlanDTO updateDeleveryDate(Long planId, Date date) {
        Plan plan =planRepository.findById(planId).get();
        plan.setUpdatedAt(new Date());
        plan.setDeleveryDate(date);

        Treatment treat=plan.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        return planDTOMapper.apply(planRepository.save(plan));
    }
    @Override
    public MessageResponse deletePlan(Long planId) {
        // Delete all files related to plan
        Plan plan  =  planRepository.findById(planId).get();

        Treatment treat=plan.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        fileRepository.deleteAll(fileRepository.findByPlan(planRepository.findById(planId).get()));
        planRepository.delete(plan);
        return MessageResponse.builder().message(messages.getString("PlanService.deletePlan.MessageResponse")).build();
    }
    @Override
    public MessageResponse deleteAllPlan(Long treatId) {
        Set<Plan> plans= planRepository.findByTreatment(treatmentRepository.findById(treatId).get());
        for (Plan plan:plans) {

            fileRepository.deleteAll(fileRepository.findByPlan(plan));
            planRepository.delete(plan);
        }
        Treatment treat=treatmentRepository.findById(treatId).get();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);
        return MessageResponse.builder().message(messages.getString("PlanService.deleteAllPlan.MessageResponse")).build();
    }
    @Override
    public Set<PlanDTO> getPlans() {
        List<Plan> data =planRepository.findAll();

        Set<PlanDTO> result=new HashSet<>();

        if(data!=null &&!data.isEmpty()) {
            for (Plan plan : data) {
                result.add(planDTOMapper.apply(plan));
            }
        }
        return result;
    }
    @Override
    public PlanDTO updateFeedBack(Long planId, String comment) {
        Plan plan =planRepository.findById(planId).get();
        plan.setUpdatedAt(new Date());
        plan.setFeedBack(comment);

        Treatment treat=plan.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        return planDTOMapper.apply(planRepository.save(plan));
    }
    @Override
    public PlanDTO updateProductionDelay(Long planId, Long days) {
        Plan plan =planRepository.findById(planId).get();
        plan.setUpdatedAt(new Date());
        plan.setProductionDays(days);

        Treatment treat=plan.getTreatment();
        treat.setUpdatedAt(new Date());
        treatmentRepository.save( treat);

        return planDTOMapper.apply(planRepository.save(plan));
    }
}
