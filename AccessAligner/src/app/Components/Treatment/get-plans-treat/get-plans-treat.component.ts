import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { AppService } from "../../../Core/Services/app.service";
import { PlanService } from "../../../Core/Services/PlanService/plan.service";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TranslateModule } from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";
@Component({
  selector: "app-get-plans-treat",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TeamInfoComponent,
    TranslateModule,
  ],
  templateUrl: "./get-plans-treat.component.html",
  styleUrl: "./get-plans-treat.component.css",
})
export class GetPlansTreatComponent {
  treatment$!: any;
  show: any;
  plan$!: any;
  errors: any;
  user$!: any;
  spinnerShow: boolean = true;

  constructor(
    private modalService: ModalService,
    private appService: AppService,
    private planService: PlanService,
    private statusService: StatusClassService,
    private typeTreatment: TypeTreatmentService,

    public utils: UtilsService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));

    this.appService.getPlan$.subscribe((data) => {
      this.plan$ = data;
      this.spinnerShow = false;
    });

    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
  }
  acceptedPlan() {
    return this.treatment$.plans.filter(
      (e: any) => e.status !== "NEW" //&& e.status !== "REJECTED"
    )[0];
  }

  onOpenModalPlan(plan: any) {
    this.appService.setPlan$(plan);
    this.modalService.openDisplayPlanModel(plan, this.treatment$);
  }

  getSatusClass(status: string): string {
    return this.statusService.getClassStatus(status);
  }

  getPCClass(status: string): string {
    return this.statusService.getClassPC(status);
  }

  getPCByStatus(status: string) {
    return this.statusService.getPCByStatus(status);
  }

  onDeletePlan(id: any, status: string) {
    this.planService.DeletePlan(id, this.treatment$);
  }

  onUpdateSatusConfirm(planId: any, status: string) {
    this.planService.UpdateStatusGetPlans(planId, status, this.treatment$);
  }

  getTypeTreatement(type: any) {
    return this.typeTreatment.getTypeTreatement(type);
  }
}
