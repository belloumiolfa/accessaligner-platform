package access.aligner.backend.Repositories;

import access.aligner.backend.Entities.Role;
import access.aligner.backend.Enum.Enum_Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Enum_Role user);
}
