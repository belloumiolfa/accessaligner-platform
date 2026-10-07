package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Extension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

import java.util.Date;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id ;

    private Date createdAt;
    private String name;
    private String type;
    private String role;
    private Long size;

    @ManyToOne
    private Treatment treatment;

    @ManyToOne
    private Plan plan;


 }
