package access.aligner.backend.Entities;

import access.aligner.backend.Enum.Enum_Status;
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

public class Estimate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Enum_Status status;
    private Date createdAt;
    private String blobURL;
    @OneToOne(cascade = CascadeType.ALL)
    private File file;
}
