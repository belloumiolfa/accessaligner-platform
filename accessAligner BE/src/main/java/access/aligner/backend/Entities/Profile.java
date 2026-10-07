package access.aligner.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id ;

    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String description;
    private String profession;
    private String phone;
    private String mobile;
    private String address;
    private Date createdAt;
    private Date updatedAt;

    private String tax;

    @OneToOne(cascade = CascadeType.ALL)
    private File photo;

}
