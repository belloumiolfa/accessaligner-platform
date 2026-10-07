package access.aligner.backend.Repositories;

import access.aligner.backend.DTOs.Dashboard.TopDentistProjection;
import access.aligner.backend.Entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String username);
    @EntityGraph(attributePaths = "roleList")
    Optional<User> findByEmail(String email);
    Optional<User> findByProfile_Id(Long profileId);
    @Query(value = """
        SELECT 
            d.user_id AS userId, 
            pr.first_name AS firstName, 
            pr.last_name AS lastName, 
            pr.photo_file_id AS photoFileId, 
            d.created_at AS joinDate,
            COUNT(t.treatment_id) AS treatmentCount
        FROM 
            accessaligner.user d
        JOIN 
            accessaligner.patient p ON p.doctor = d.user_id
        JOIN 
            accessaligner.treatment t ON t.patient = p.patient_id
        JOIN 
            accessaligner.profile pr ON pr.profile_id = d.profile_id
        GROUP BY 
            d.user_id, pr.first_name, pr.last_name, pr.photo_file_id
        ORDER BY 
            treatmentCount DESC
        LIMIT :top
    """, nativeQuery = true)
    List<TopDentistProjection> findTopDentists(int top);
}
