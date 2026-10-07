package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByPhoto_Id(Long photoId);
}
