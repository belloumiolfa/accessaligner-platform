package access.aligner.backend.DTOs;

import access.aligner.backend.Entities.*;

import java.util.Date;
import java.util.Set;

public record UserDTO(
        Long id ,
        String userName ,
        String email,
        Date createdAt,
        Date updatedAt,
        Set<Role> roleList,
        ProfileDTO profile,
        Set<Event> eventList,
        UserStatusDTO userStatus

) {}
