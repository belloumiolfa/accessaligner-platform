import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-finish-treatment",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: "./finish-treatment.component.html",
  styleUrl: "./finish-treatment.component.css",
})
export class FinishTreatmentComponent {
  treatments$: any[] = [];
  treatment$!: any;
  errors: any;
  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService
  ) {
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );
    this.appService.getTreatment$.subscribe((data) => (this.treatment$ = data));
  }

  onUpdateStatus(status: any) {
    this.treatmentService.UpdateTreatmentStatus(this.treatment$?.id, status);
  }
}
