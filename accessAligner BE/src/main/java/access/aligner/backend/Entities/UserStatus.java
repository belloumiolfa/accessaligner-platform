package access.aligner.backend.Entities;

import access.aligner.backend.Entities.Keys.UserStatusKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatus  {
    @EmbeddedId
    @Column(name = "userStatus_id")
    private UserStatusKey id ;

    private Date updatedAt;
    private Boolean updatedLast;
    private String comment;
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name ="responsible")
    private User responsible;


    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name ="user")
    private User user;



    @ManyToOne
    @MapsId("statusId")
    @JoinColumn(name ="status")
    private Status status;

    @PrePersist
    void defaultValues (){
        this.updatedAt= new Date ();
    }

}
