import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-treatment-eligible",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./treatment-eligible.component.html",
  styleUrl: "./treatment-eligible.component.css",
})
export class TreatmentEligibleComponent {
  errors: any;
  treatments$!: any[];
  treatment$!: any;

  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService,
    private modalService: ModalService
  ) {
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );
    this.appService.getTreatment$.subscribe((data) => (this.treatment$ = data));
  }

  treatmentEligibility(status: any) {
    if (status === "UNQUALIFIED") {
      this.modalService.openDescriptionEligibleModal(this.treatment$);
    } else {
      this.treatmentService.UpdateTreatmentStatus(this.treatment$?.id, status);
    }
  }
}
