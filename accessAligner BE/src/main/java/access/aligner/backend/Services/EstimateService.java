package access.aligner.backend.Services;

import access.aligner.backend.DTOs.EstimateDTO;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface EstimateService {
    TreatmentDTO saveEstimate(MultipartFile file,String type,Long treatId ) throws IOException;
    Resource getEstimate(Long id) throws MalformedURLException;
    MessageResponse deleteEstimate(Long id);
    EstimateDTO updateEstimateStatus(Long id, String status);
    MessageResponse deleteAllEstimate(Long id);
}
