package access.aligner.backend.DTOs.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class PhotosRequest {
   private  MultipartFile[] photos;
   private String comment;
   private String role;
}
