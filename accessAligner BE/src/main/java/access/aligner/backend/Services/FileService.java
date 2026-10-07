package access.aligner.backend.Services;

 import access.aligner.backend.DTOs.Responces.MessageResponse;
 import access.aligner.backend.Entities.File;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

public interface FileService {
    File updatePhoto(MultipartFile file, Long userId) throws IOException;
    Resource getFile(Long id, String destination) throws MalformedURLException;
    File saveFile(MultipartFile file, String destination) throws IOException;
    MessageResponse deleteFile(Long id,String destination);
}
