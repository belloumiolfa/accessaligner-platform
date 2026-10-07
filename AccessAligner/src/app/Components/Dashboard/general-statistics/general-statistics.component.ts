import { Component } from "@angular/core";
import { TotalCountCardComponent } from "../total-count-card/total-count-card.component";
import { DashboardService } from "../../../Core/Services/DashboardService/dashboard.service";

@Component({
  selector: "app-general-statistics",
  standalone: true,
  imports: [TotalCountCardComponent],
  templateUrl: "./general-statistics.component.html",
  styleUrl: "./general-statistics.component.css",
})
export class GeneralStatisticsComponent {
  totalTreats$: any;
  totalTreatsByStatus$: any;
  totalDentist$: any;
  totalPatient$: any;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getTotalTreats$.subscribe((data) => {
      this.totalTreats$ = data;
    });

    this.dashboardService.getTotalTreatsByStatus$.subscribe((data) => {
      this.totalTreatsByStatus$ = data;
    });

    this.dashboardService.getTotalDentist$.subscribe((data) => {
      this.totalDentist$ = data;
    });

    this.dashboardService.getTotalPatient$.subscribe((data) => {
      this.totalPatient$ = data;
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dashboardService.getTotalTreatments();
    this.dashboardService.getTotalTreatsByStatus("FINISHED");
    this.dashboardService.getTotalDentist();
    this.dashboardService.getTotalPatient();
  }
}
