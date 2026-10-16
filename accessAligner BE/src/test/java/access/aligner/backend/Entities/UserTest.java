package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Enum.Enum_Status;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
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

    @Test
    void resolveCurrentUserStatusUsesNewestHistoryWhenNoCurrentStatusIsMarked() {
        UserStatus olderStatus = userStatus(Enum_Status.WAIT, 1_000L, false);
        UserStatus latestStatus = userStatus(Enum_Status.ACCEPTED, 2_000L, false);
        User user = User.builder()
                .userStatus(Set.of(olderStatus, latestStatus))
                .build();

        assertSame(latestStatus, user.resolveCurrentUserStatus());
        assertEquals(latestStatus.getStatus().getId(), user.getCurrentStatus());
    }

    @Test
    void resolveCurrentUserStatusPrefersMarkedStatus() {
        UserStatus olderMarkedStatus = userStatus(Enum_Status.WAIT, 1_000L, true);
        UserStatus newerUnmarkedStatus = userStatus(Enum_Status.ACCEPTED, 2_000L, false);
        User user = User.builder()
                .userStatus(Set.of(olderMarkedStatus, newerUnmarkedStatus))
                .build();

        assertSame(olderMarkedStatus, user.resolveCurrentUserStatus());
    }

    @Test
    void resolveCurrentUserStatusReturnsNullWhenHistoryIsEmpty() {
        assertNull(User.builder().build().resolveCurrentUserStatus());
    }

    private UserStatus userStatus(Enum_Status name, long updatedAt, boolean isCurrent) {
        return UserStatus.builder()
                .status(Status.builder().id((long) name.ordinal() + 1).name(name).build())
                .updatedAt(new Date(updatedAt))
                .updatedLast(isCurrent)
                .build();
    }
}
