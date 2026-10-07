package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Plan;
import access.aligner.backend.Entities.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface FileRepository extends JpaRepository<File, Long> {
    Set<File> findByTreatment(Treatment treatment);
    Set<File> findByPlan(Plan plan);
}
