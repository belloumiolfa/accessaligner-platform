package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.EstimateDTO;
import access.aligner.backend.Entities.Estimate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class EstimateDTOMapper implements Function<Estimate, EstimateDTO> {
    private final FileDTOMapper fileDTOMapper;

    @Override
    public EstimateDTO apply(Estimate estimate) {
        return new EstimateDTO(
                estimate.getId(),
                estimate.getStatus(),
                estimate.getCreatedAt(),
                estimate.getBlobURL(),
                fileDTOMapper.apply(estimate.getFile())
        );
    }
}
