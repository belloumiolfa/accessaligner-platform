package access.aligner.backend.Services;

import access.aligner.backend.DTOs.PlanDTO;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.Set;

public interface PlanService {
    PlanDTO addPlan(Long treatId,String comment, String code );
    PlanDTO addPlanFiles(MultipartFile[] files, Long planId, String role) throws IOException;
    Resource getPlanFile(Long fileId,Long treatId,Long planId) throws MalformedURLException;
    PlanDTO updateStatus(Long planId, String status);
    PlanDTO updateDeleveryDate(Long planId, Date date);
    MessageResponse deletePlan(Long planId);
    MessageResponse deleteAllPlan(Long treatId);
    Set<PlanDTO> getPlans();
    PlanDTO updateFeedBack(Long planId, String comment);
    PlanDTO updateProductionDelay(Long planId, Long days);
}
