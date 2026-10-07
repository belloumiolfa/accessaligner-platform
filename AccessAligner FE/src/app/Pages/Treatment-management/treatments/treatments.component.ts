import { Component } from "@angular/core";
import { TreatmentListComponent } from "../treatment-list/treatment-list.component";
import { AppService } from "../../../Core/Services/app.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TreatmentListPerformanceComponent } from "../treatment-list/treatment-list-performance/treatment-list-performance.component";
@Component({
  selector: "app-treatments",
  standalone: true,
  imports: [TreatmentListComponent, TreatmentListPerformanceComponent],
  templateUrl: "./treatments.component.html",
  styleUrl: "./treatments.component.css",
})
export class TreatmentsComponent {
  treatments$!: any;
  searchTerm: string = "";

  treatmentsBeforeFilter!: any;
  filter: boolean = false;

  constructor(
    private appService: AppService,
    private utilsService: UtilsService
  ) {
    this.appService.getTreatments$.subscribe((data) => {
      this.treatments$ = data.filter(
        (treatment) =>
          treatment.status !== "FINISHED" &&
          treatment.status !== "CANCELED" &&
          treatment.status !== "UNQUALIFIED"
      );
    });
  }

  /**
   * new version
   */
}
