import { Component } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { CommonModule } from "@angular/common";
import { TreatmentConfirmationComponent } from "../treatment-confirmation/treatment-confirmation.component";
import { QuoteReportComponent } from "../quote-report/quote-report.component";
import { TreatmentEligibleComponent } from "../treatment-eligible/treatment-eligible.component";
import { RouterModule } from "@angular/router";
import { GetPlansTreatComponent } from "../get-plans-treat/get-plans-treat.component";
import { FinishTreatmentComponent } from "../finish-treatment/finish-treatment.component";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { NewPlanComponent } from "../new-plan/new-plan.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-treatment-status",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    QuoteReportComponent,
    TreatmentEligibleComponent,
    TreatmentConfirmationComponent,
    GetPlansTreatComponent,
    FinishTreatmentComponent,
    TeamInfoComponent,
    NewPlanComponent,
    TranslateModule,
  ],
  templateUrl: "./treatment-status.component.html",
  styleUrl: "./treatment-status.component.css",
})
export class TreatmentStatusComponent {
  treatment$!: any;
  user$!: any;

  constructor(private appService: AppService, public utils: UtilsService) {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
    });
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
  }

  oneAcceptedEstimate(estimates: any): any {
    let result = false;
    for (let index = 0; index < estimates.length; index++) {
      if (
        estimates[index].status === "ACCEPTED" &&
        estimates[index].role === "init_estim"
      ) {
        result = true;
        break;
      }
    }
    return result;
  }

  selectedPlan(plans: any): any {
    for (let index = 0; index < plans?.length; index++) {
      if (plans[index].status !== "NEW" && plans[index].status !== "REJECTED") {
        return plans[index];
      }
    }
  }
}
