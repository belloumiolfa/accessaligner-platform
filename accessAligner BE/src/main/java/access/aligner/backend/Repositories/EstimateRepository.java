package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Estimate;
import access.aligner.backend.Entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {
   Optional<Estimate>  findByFile(File file);
   Optional<Estimate> findByFile_Id(Long fileId);
 }
