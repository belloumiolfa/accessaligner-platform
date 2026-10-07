import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-treatment-confirmation",
  standalone: true,
  imports: [TranslateModule],
  templateUrl: "./treatment-confirmation.component.html",
  styleUrl: "./treatment-confirmation.component.css",
})
export class TreatmentConfirmationComponent {
  errors: any;
  treatments$!: any[];
  treatment$!: any;

  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService
  ) {
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );
    this.appService.getTreatment$.subscribe((data) => (this.treatment$ = data));
  }

  treatmentConfirmation(status: any) {
    this.treatmentService.UpdateTreatmentStatus(this.treatment$?.id, status);
  }
}
