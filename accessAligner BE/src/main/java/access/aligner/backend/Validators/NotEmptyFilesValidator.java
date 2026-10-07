package access.aligner.backend.Validators;

import access.aligner.backend.Validators.Annotations.NotEmptyFiles;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class NotEmptyFilesValidator implements ConstraintValidator<NotEmptyFiles, MultipartFile[]> {
    @Override
    public boolean isValid(MultipartFile[] files, ConstraintValidatorContext context) {
        if (files == null || files.length == 0) {
            return false; // No files provided
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                return false; // At least one file is empty
            }
        }

        return true; // All files are non-empty

    }
}
