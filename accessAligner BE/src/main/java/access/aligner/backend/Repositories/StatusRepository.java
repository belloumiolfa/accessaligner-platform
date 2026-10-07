package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Status;
import access.aligner.backend.Enum.Enum_Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findByName(Enum_Status enumStatus);
}
