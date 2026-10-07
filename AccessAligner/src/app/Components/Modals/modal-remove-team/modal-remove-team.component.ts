import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import { TranslateModule } from "@ngx-translate/core";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";

@Component({
  selector: "app-modal-remove-team",
  standalone: true,
  imports: [CommonModule, ProfileImageComponent, TranslateModule],
  templateUrl: "./modal-remove-team.component.html",
  styleUrl: "./modal-remove-team.component.css",
})
export class ModalRemoveTeamComponent {
  @Input() treatment: any;
  team: any[] = [];
  errors: any;
  constructor(
    private activeModel: NgbActiveModal,
    private treatmentService: TreatmentService
  ) {}

  ngOnInit(): void {
    this.team = this.treatment?.team;
  }
  close() {
    this.activeModel.close();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["photoId"] && changes["photoId"].currentValue) {
      this.team = changes["treatment"].currentValue.team;
    }
  }
  deleteConfirm(member: any) {
    this.treatmentService.RemoveTeam(this.treatment, member);
  }
}
