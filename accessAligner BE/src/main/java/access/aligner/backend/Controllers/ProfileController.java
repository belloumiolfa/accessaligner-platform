package access.aligner.backend.Controllers;

import access.aligner.backend.DTOs.ProfileDTO;
import access.aligner.backend.DTOs.Requests.ProfileRequest;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Services.FileService;
import access.aligner.backend.Services.ProfileService;
import access.aligner.backend.Services.ResourceAuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
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
    private final ResourceAuthorizationService authorizationService;

    @PostMapping ("update")
    public ResponseEntity<ProfileDTO> updateProfileController(
            @RequestBody ProfileRequest profileRequest, Authentication authentication) {
        Long userIdFromPrincipal = authorizationService.currentUserId(authentication);
        return new ResponseEntity<>(profileService.updateProfile(profileRequest, userIdFromPrincipal),HttpStatus.OK);
    }

    @GetMapping("getPhoto")
    public ResponseEntity<Resource>getPhotoController(
            @RequestParam Long id, @RequestParam String type, Authentication authentication)
            throws MalformedURLException {
        authorizationService.requireProfilePhotoOwner(id, authentication);
        if (!"Profile".equals(type)) {
            throw new AccessDeniedException("Invalid profile photo location");
        }
        return new ResponseEntity<>(fileService.getFile(id,"Profile"),HttpStatus.OK);
    }

    @PostMapping("updatePhoto" )
    public ResponseEntity<File> updatePhotoController(
            @RequestBody MultipartFile file, Authentication authentication) throws IOException {
        Long userIdFromPrincipal = authorizationService.currentUserId(authentication);
        return new ResponseEntity<>(fileService.updatePhoto(file,userIdFromPrincipal),HttpStatus.OK);
    }

    @GetMapping("public/getById")
    public ResponseEntity<ProfileDTO> getById(@RequestParam Long id, Authentication authentication) {
        authorizationService.requireProfileReadAccess(id, authentication);
        return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
    }

}
