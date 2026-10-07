import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { GeneralStatisticsComponent } from "../../../Components/Dashboard/general-statistics/general-statistics.component";
import { CompaignPerformanceComponent } from "../../../Components/Dashboard/compaign-performance/compaign-performance.component";
import { TopDentistComponent } from "../../../Components/Dashboard/top-dentist/top-dentist.component";
import { TreatmentStatisticsComponent } from "../../../Components/Dashboard/treatment-statistics/treatment-statistics.component";
import { DentistStatisticsComponent } from "../../../Components/Dashboard/dentist-statistics/dentist-statistics.component";
import { DentistActivityComponent } from "../../../Components/Dashboard/dentist-activity/dentist-activity.component";
import { TreatmentStatusComponent } from "../../../Components/Dashboard/treatment-status/treatment-status.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    BlockHeaderComponent,
    GeneralStatisticsComponent,
    CompaignPerformanceComponent,
    TopDentistComponent,
    TopDentistComponent,
    TreatmentStatisticsComponent,
    DentistStatisticsComponent,
    DentistStatisticsComponent,
    TreatmentStatusComponent,
    DentistActivityComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {}
