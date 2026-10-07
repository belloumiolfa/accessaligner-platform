package access.aligner.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

/*

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)

*/
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id ;

    private String userName ;
    private String email;
    private String password;
    private Date createdAt;
    private Date updatedAt;
    private Boolean updatedLast;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile ;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "role"))
    @Builder.Default
    private Set<Role> roleList = new HashSet<>();

    public void setRole(Role role) {
        if (roleList == null) {
             roleList = new HashSet<>();
        }
        this.roleList.add(role);
        role.setUsers(this);
    }
    public Set<Role> getRoleList(){
        return this.roleList;
    }

    public void removeRole(Long roleId) {
        Role role = this.roleList.stream().filter(t -> t.getId() == roleId).findFirst().orElse(null);
        if (role != null) {
            this.roleList.remove(role);
            role.getUserList().remove(this);
        }
    }





    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(
            name = "user_event",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "event"))
    private Set<Event> eventList;





    @OneToMany(mappedBy = "user")
    private Set<UserStatus> userStatus=new HashSet<>();
    public void setStatus(UserStatus status) {
        if (userStatus == null) {
            userStatus = new HashSet<>();
        }
        this.userStatus.add(status);
    }
    public Long getCurrentStatus() {
        if (userStatus == null || userStatus.isEmpty()) {
            return null;
        }

        return userStatus.stream()
                .findFirst()
                .map(status -> status.getStatus().getId())
                .orElse(null);
    }



    @OneToMany(mappedBy = "responsible")
    private Set<UserStatus> userStatusResponsibility=new HashSet<>();



    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
        this.updatedAt=new Date();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roleList == null || roleList.isEmpty()) {
            return Collections.emptySet();
        }

        return roleList.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName().name()))
                .collect(Collectors.toSet());
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public int hashCode() {
        return 1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (this.getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;

    }

 }
