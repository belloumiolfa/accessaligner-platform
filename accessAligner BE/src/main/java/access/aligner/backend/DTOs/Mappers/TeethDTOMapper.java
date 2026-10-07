package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.TeethDTO;
import access.aligner.backend.Entities.Teeth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
@RequiredArgsConstructor

public class TeethDTOMapper implements Function<Teeth, TeethDTO> {
    @Override
    public TeethDTO apply(Teeth teeth) {
        return new TeethDTO(
                teeth.getId(), teeth.getNum(), teeth.getAction()!=null ? teeth.getAction().ordinal():0
        );
    }
}
