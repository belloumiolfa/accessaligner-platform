package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.FileDTO;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.function.Function;

@Service
@RequiredArgsConstructor

public class FileDTOMapper implements Function<File,FileDTO> {
    private final FileService fileService;
    private static final String UPLOAD_DIR = "uploads";

    @Override
    public FileDTO apply(File file) {

            return new FileDTO(
                    file.getId(),
                    file.getCreatedAt(),
                    file.getName(),
                    file.getType(),
                    file.getRole(),
                    file.getSize()
            );

    }

}
