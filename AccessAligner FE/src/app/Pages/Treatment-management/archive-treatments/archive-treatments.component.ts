import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentListComponent } from "../treatment-list/treatment-list.component";
import { NgxSpinnerService } from "ngx-spinner";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
@Component({
  selector: "app-archive-treatments",
  standalone: true,
  imports: [TreatmentListComponent],
  templateUrl: "./archive-treatments.component.html",
  styleUrl: "./archive-treatments.component.css",
})
export class ArchiveTreatmentsComponent {
  treatments$!: any;

  constructor(
    private appService: AppService,
    private utilsService: UtilsService
  ) {
    this.appService.getTreatments$.subscribe((data) => {
      this.treatments$ = data.filter(
        (treat) =>
          treat.status === "FINISHED" ||
          treat.status === "CANCELED" ||
          treat.status === "UNQUALIFIED"
      );
    });
  }
}
