package access.aligner.backend.DTOs;

import access.aligner.backend.Entities.Profile;
import access.aligner.backend.Entities.Role;

import java.util.Date;
import java.util.Set;

public record AdminDTO(
        Long id ,
        String userName ,
        String email,
        Set<Role> roleList,
        ProfileDTO profile


) {
}
