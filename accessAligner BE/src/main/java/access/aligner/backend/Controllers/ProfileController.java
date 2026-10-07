package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.DTOs.Requests.ProfileRequest;
import access.aligner.backend.DTOs.Requests.SignupRequest;
import access.aligner.backend.DTOs.UserDTO;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Services.FileService;
import access.aligner.backend.Services.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@CrossOrigin(origins = "*", maxAge=3600)
@RestController
@RequestMapping("/api/private/profile")
@RequiredArgsConstructor
@Validated

public class ProfileController {
    private final ProfileService profileService;
    private final FileService fileService;

    @PostMapping ("update")
    public ResponseEntity<ProfileDTO> updateProfileController(
            @RequestBody ProfileRequest profileRequest, @RequestParam Long userId , HttpServletRequest request){
        return new ResponseEntity<>(profileService.updateProfile(profileRequest,userId),HttpStatus.OK);
    }
    @GetMapping("getPhoto")
    public ResponseEntity<Resource>getPhotoController(
            @RequestParam Long id , String type , HttpServletRequest request) throws MalformedURLException {
        return new ResponseEntity<>(fileService.getFile(id,type),HttpStatus.OK);
    }
    @PostMapping("updatePhoto" )
    public ResponseEntity<File> updatePhotoController(
            @RequestParam Long userId ,@RequestBody MultipartFile file, HttpServletRequest request) throws IOException {
        return new ResponseEntity<>(fileService.updatePhoto(file,userId),HttpStatus.OK);
    }

    @GetMapping("public/getById")
    public  ResponseEntity<ProfileDTO> getById(@RequestParam Long id, HttpServletRequest request){
        return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
    }

}
