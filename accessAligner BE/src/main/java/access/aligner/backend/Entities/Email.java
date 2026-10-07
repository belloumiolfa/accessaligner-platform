package access.aligner.backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "email")
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_id")

    private Long id;

    private String subject;
    private String sentTo;
    private String sender;

    @Column(length = 65555)
    private String content;

    private Date createdAt;
    @PrePersist
    void defaultValues (){
        this.createdAt= new Date ();
    }

}
