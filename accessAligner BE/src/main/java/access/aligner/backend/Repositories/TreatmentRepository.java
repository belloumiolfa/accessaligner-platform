package access.aligner.backend.Repositories;

 import access.aligner.backend.DTOs.Records.TreatDto;
 import access.aligner.backend.Entities.Patient;
 import access.aligner.backend.Entities.Treatment;
 import access.aligner.backend.Enum.Enum_Status;
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.data.jpa.repository.Query;

 import java.util.Collection;
 import java.util.List;

public interface TreatmentRepository extends JpaRepository<Treatment,Long > {
    Collection<Treatment> findByPatient(Patient patient);

    List<Treatment> findByStatusInOrderByCreatedAtDesc(List<Enum_Status> statuses);

    int countByStatus(Enum_Status status);

    @Query(value = """
                SELECT MONTH(t.created_at) AS month, COUNT(t.treatment_id) AS treatment_count
                   FROM accessaligner.treatment t 
                   WHERE YEAR(t.created_at) = :year
                   GROUP BY MONTH(t.created_at)
                   ORDER BY month;
            """, nativeQuery = true)
    List<Object[]> findTreatStatisticsByYear( int year);
}
