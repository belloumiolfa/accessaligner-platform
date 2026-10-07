package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.UserStatusKey;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.net.ssl.SSLEngineResult;
import java.util.Collection;
import java.util.List;
import java.util.SequencedCollection;

public interface UserStatusRepository extends JpaRepository<UserStatus, UserStatusKey> {
    Collection<UserStatus> findByUser(User user);

 }
