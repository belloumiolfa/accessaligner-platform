package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.UserStatusKey;
import access.aligner.backend.Enum.Enum_Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface UserStatusRepository extends JpaRepository<UserStatus, UserStatusKey> {
    Collection<UserStatus> findByUser(User user);
    boolean existsByUser_EmailAndStatus_NameAndUpdatedLastTrue(
            String email,
            Enum_Status statusName
    );

 }
