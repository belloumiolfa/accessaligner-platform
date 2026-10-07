package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Profile;
import access.aligner.backend.Repositories.FileRepository;
import access.aligner.backend.Repositories.TreatmentRepository;
import access.aligner.backend.Repositories.UserRepository;
import access.aligner.backend.Services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor

public class FileServiceImpl implements FileService {
    private static final String UPLOAD_DIR = "uploads";
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final TreatmentRepository treatmentRepository;
    ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public File updatePhoto(MultipartFile file, Long userId) throws IOException {
        Profile profile = userRepository.findById(userId).get().getProfile();
        File photo =saveFile(file,"Profile");
        profile.setPhoto(photo);

        // save file details
        File newFile=fileRepository.save(photo);

        return newFile;

    }
    @Override
    public Resource getFile(Long id,String destination) throws MalformedURLException {

        File photo = fileRepository.findById(id).get();
        String photoName= photo.getName().substring(0, photo.getName().indexOf('.'));

        try{
            java.io.File directory = new java.io.File(UPLOAD_DIR, destination);
            java.io.File[] matchingFiles = directory.listFiles((dir, name) -> name.startsWith(photoName));

            if (matchingFiles != null && matchingFiles.length > 0) {
                // Assuming you want to return the first match
                Path imagePath = matchingFiles[0].toPath();
                Resource resource = new UrlResource(imagePath.toUri());

                if (resource.exists() || resource.isReadable()) {
                    return resource;
                } else {
                    throw new MalformedURLException("File not found or not readable: " + imagePath.toString());
                }
            } else {
                throw new MalformedURLException("No file found starting with: " + photoName);
            }

            /*
            Path imagePath = Paths.get(UPLOAD_DIR+java.io.File.separator+destination+java.io.File.separator)
                    .resolve(photoName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());
            return resource;*/

        }catch(MalformedURLException e ) {
            throw e;
        }

    }

    public File saveFile(MultipartFile file, String destination) throws IOException {
        try {

            // Create directory if it doesn't exist
            java.io.File directory = new java.io.File(UPLOAD_DIR+java.io.File.separator+destination);
            if (!directory.exists()) {
                directory.mkdir();
            }
            // Save file to server
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_DIR+java.io.File.separator+destination +
                    java.io.File.separator + file.getOriginalFilename());
            // write f iel to server
            Files.write(path, bytes);

            return File.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .size(file.getSize())
                    .createdAt(new Date())
                    .build();

        }catch (Exception exception){
            throw exception;
        }
    }

    @Override
    public MessageResponse deleteFile(Long id, String destination) {

        File file = fileRepository.findById(id).get();

        if(destination=="Treat-"){
            destination=destination+file.getTreatment().getId();
        }
        java.io.File toDeleteFile = new java.io.File(UPLOAD_DIR+java.io.File.separator+destination
                + java.io.File.separator + file.getName());

        if (toDeleteFile.exists() && toDeleteFile.isFile()) {
            if (toDeleteFile.delete()) {
                fileRepository.delete(file);
                return  MessageResponse.builder().message(messages.getString("FileService.deleteFile.MessageResponse.success")).build();
            } else {
                 return  MessageResponse.builder().message(messages.getString("FileService.deleteFile.MessageResponse.failed")).build();
            }
        } else {
             return  MessageResponse.builder().message(messages.getString("FileService.deleteFile.MessageResponse.notExist")).build();
        }
    }

}
