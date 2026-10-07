package access.aligner.backend.DTOs.Mappers;

import access.aligner.backend.DTOs.MessageDTO;
import access.aligner.backend.DTOs.SeenDTO;
import access.aligner.backend.Entities.Message;

import java.util.function.Function;

public class SeenDTOMapper implements Function<Message, SeenDTO> {
    @Override
    public SeenDTO apply(Message message) {
        return null;
    }
}
