package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Role;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserTest {
    @Test
    void getAuthoritiesMapsRolesToGrantedAuthorities() {
        User user = new User();
        user.setRole(Role.builder().name(Enum_Role.ADMIN).build());
        user.setRole(Role.builder().name(Enum_Role.DENTIST).build());

        Set<String> authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        assertEquals(Set.of("ROLE_ADMIN", "ROLE_DENTIST"), authorities);
    }

    @Test
    void getAuthoritiesReturnsNoAuthoritiesWhenRoleListIsNull() {
        User user = User.builder().build();

        assertTrue(user.getAuthorities().isEmpty());
    }
}
