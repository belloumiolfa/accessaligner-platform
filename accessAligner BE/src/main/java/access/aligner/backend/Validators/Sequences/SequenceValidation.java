package access.aligner.backend.Validators.Sequences;

 import access.aligner.backend.Validators.Groups.FirstGroup;
import access.aligner.backend.Validators.Groups.InitialGroup;
import access.aligner.backend.Validators.Groups.SecondGroup;
import jakarta.validation.GroupSequence;
import jakarta.validation.groups.Default;

@GroupSequence({Default.class, InitialGroup.class, FirstGroup.class, SecondGroup.class})

public interface SequenceValidation {
}
