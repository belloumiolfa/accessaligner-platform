package access.aligner.backend.AdvicerController;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ValidationErrorResponse {
    private int code;
    private String message;
    private List<Map<String, String>> errors = new ArrayList<>();


    public void addError(int code,String field, String errorMessage) {
        Map<String, String> error = new HashMap<>();
        error.put(field, errorMessage);
        errors.add(error);
    }

}
