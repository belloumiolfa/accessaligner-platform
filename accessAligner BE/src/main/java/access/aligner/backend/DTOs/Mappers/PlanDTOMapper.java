package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.FileDTO;
import access.aligner.backend.DTOs.PlanDTO;
import access.aligner.backend.Entities.File;
import access.aligner.backend.Entities.Plan;
import access.aligner.backend.Repositories.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;
@RequiredArgsConstructor @Service
public class PlanDTOMapper implements Function<Plan, PlanDTO> {
    private final FileDTOMapper fileDTOMapper;
    private final FileRepository fileRepository;
    @Override
    public PlanDTO apply(Plan plan) {
        Set<File> files=fileRepository.findByPlan(plan);
        return new PlanDTO(
                plan.getId(),
                getPlanFiles(files,"resultPhotos"),
                getPlanFiles(files,"resultVideos"),
                getPlanFiles(files,"resultReports"),
                plan.getStatus(),
                plan.getCreatedAt(),
                plan.getUpdatedAt(),
                plan.getDeleveryDate(),
                plan.getComment(),
                plan.getFeedBack(),
                plan.getCode(),
                plan.getProductionDays()
        );
    }

    Set<FileDTO> getPlanFiles(Set<File>data, String role ){
        Set<FileDTO> result=new HashSet<>();

        if(!data.isEmpty()) {
            for (File file : data
            ) {
                if(file.getRole()!=(null) && file.getRole().equals(role)) {
                    result.add(fileDTOMapper.apply(file));
                }            }
        }
        return result;
    }
}
