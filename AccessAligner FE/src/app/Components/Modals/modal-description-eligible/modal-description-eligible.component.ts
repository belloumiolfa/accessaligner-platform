import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";

@Component({
  selector: "app-modal-description-eligible",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./modal-description-eligible.component.html",
  styleUrl: "./modal-description-eligible.component.css",
})
export class ModalDescriptionEligibleComponent {
  @Input() treatment: any;
  description: any;
  errors!: any;
  constructor(
    private activeModal: NgbActiveModal,
    private handleAlerts: HandleAlertsService,
    private treatmentService: TreatmentService,
    private typeTreatmentService: TypeTreatmentService
  ) {
    this.description = new FormControl("");
  }
  getTypeTreatement(treat: any) {
    return this.typeTreatmentService.getTypeTreatement(treat);
  }
  onSubmit() {
    this.treatment.description = this.description;

    /*  this.handleAlerts.handleConfirmAlert().then((result) => {
      if (result.isConfirmed) { */
    let data = {
      description: this.description,
      treat: this.treatment.treat,
      postCross: this.treatment.postCross,
      antCross: this.treatment.antCross,
      gap: this.treatment.gap,
      overbite: this.treatment.overbite,
      classI: this.treatment.classI,
      reduceOverbite: this.treatment.reduceOverbite,
      crowding: this.treatment.crowding,
      extract: this.treatment.extract,
    };

    this.treatmentService.UpdateTreatmentStatus(
      this.treatment?.id,
      "UNQUALIFIED"
    );

    this.treatmentService
      .AddTreatInfoEligible(data, this.treatment.patient.id)
      .subscribe((res) => {
        if (res === true) this.close();
      });
    /* }
    }); */
  }
  descriptionChange(ev: any) {
    this.description = ev.target.value;
  }
  close() {
    this.activeModal.close();
  }
}
