import { Component, Input } from "@angular/core";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { AppService } from "../../../Core/Services/app.service";
import Swal from "sweetalert2";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DataTablesModule } from "angular-datatables";
import { SearchService } from "../../../Core/Helpers/search.service";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { ProfileImageComponent } from "../../../Shared/Elements/profile-image/profile-image.component";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";

@Component({
  selector: "app-treatment-list",
  standalone: true,
  imports: [
    DataTablesModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
    TeamInfoComponent,
    ProfileImageComponent,
    TranslateModule,
  ],
  templateUrl: "./treatment-list.component.html",
  styleUrl: "./treatment-list.component.css",
})
export class TreatmentListComponent {
  @Input() treatments$!: any;
  @Input() archive!: any;
  @Input() overview!: any;

  isTreatmentCompletedOrNew!: any;
  searchTerm: string = "";
  treatmentsAfterFilter: any[] = [];
  filter: boolean = false;
  errors: any;
  user$!: any;
  lang!: string;

  constructor(
    private treatmentService: TreatmentService,
    private appService: AppService,
    private searchService: SearchService,
    private modalService: ModalService,
    private statucClassService: StatusClassService,
    public utils: UtilsService,
    private router: Router,
    private translate: TranslateService,
    private typeTreatment: TypeTreatmentService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));

    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }
  getTypeTreatement(type: any) {
    return this.typeTreatment.getTypeTreatement(type);
  }

  navigateToPorfile(id: number) {
    this.router.navigate(["/profile/" + id + "/overview"], {
      queryParams: { viewProfile: true },
    });
  }

  onDelete(id: number) {
    this.treatmentService.DeleteTreatment(id, false);
  }

  isEmptyTreatments(treatments: any) {
    return Object.keys(treatments).length === 0;
  }

  isFinalEstimateAccepted(estimates: any[]) {
    const finalEstimate = estimates.find(
      (estimate) => estimate.file.role === "final_estim"
    );

    return finalEstimate && finalEstimate.status === "ACCEPTED";
  }

  calculateCompletionPercentage(dataObject: any) {
    let totalFields = 0;
    //  let completedFields = 0;

    switch (dataObject.status) {
      case "NEW":
        totalFields = +10;
        break;

      case "COMPLETED":
        totalFields = +20;
        break;
      case "QUALIFIED":
        totalFields = +30;
        break;
      case "UNQUALIFIED":
        totalFields = +20;
        break;
      case "CONFIRMED":
        totalFields = +40;
        break;
      case "CANCELED":
        totalFields = +30;
        break;
      case "PROGRESS":
        totalFields = +50;

        if (
          dataObject.plans.length > 0 /*  &&
          dataObject.estimates.some(
            (estimate: any) =>
              estimate.file.role === "final_estim" &&
              estimate.status === "ACCEPTED"
          ) */
        ) {
          totalFields = +60;
        }
        break;
      case "ACCEPTED":
        totalFields = +70;
        break;
      case "REJECTED":
        totalFields = +60;
        break;
      case "PRODUCTION":
        totalFields = +80;
        break;
      case "DELIVERED":
        totalFields = +90;
        break;
      case "FINISHED":
        totalFields = +100;
        break;
      default:
        totalFields = +0;
        break;
    }

    return totalFields;
  }

  initialFiltred(treatments: any): any {
    return treatments.sort(
      (
        treatA: { updatedAt: string | number | Date },
        treatB: { updatedAt: string | number | Date }
      ) => {
        return (
          new Date(treatB.updatedAt).getTime() -
          new Date(treatA.updatedAt).getTime()
        );
      }
    );
  }

  intitalizedTreatments() {
    this.filter = false;
  }

  filterTreatment(statuses: string[]) {
    this.filter = true;
    this.treatmentsAfterFilter = this.treatments$
      .filter((treat: { status: string }) => statuses.includes(treat.status))
      .sort(
        (
          treatA: { updatedAt: string | number | Date },
          treatB: { updatedAt: string | number | Date }
        ) => {
          return (
            new Date(treatB.updatedAt).getTime() -
            new Date(treatA.updatedAt).getTime()
          );
        }
      );
  }

  getStatusClass(status: any): any {
    return this.statucClassService.getClassStatus(status);
  }

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.treatmentsAfterFilter = this.searchService.searchByPatient(
        this.searchTerm,
        this.treatments$
      );
    } else {
      this.filter = false;
    }
  }
  confirmedPlan!: any;
  selectedPlan(treatment: any): any {
    if (treatment.plans.length > 1) {
      let result = treatment.plans.filter(
        (e: any) => e.status !== "NEW" && e.status !== "REJECTED"
      )[0];
      this.confirmedPlan = result;
    } else {
      this.confirmedPlan = treatment.plans[0];
    }
    return this.confirmedPlan;
  }

  treatmentCompletedOrNew(treatment: any): any {
    this.isTreatmentCompletedOrNew =
      treatment.status === "NEW" || treatment.status === "COMPLETED";

    return this.isTreatmentCompletedOrNew;
  }
  onOpenModalPlan(plan: any, treatment: any) {
    this.appService.setPlan$(plan);

    this.modalService.openDisplayPlanModel(plan, treatment);
  }
  onReback(treatment: any) {
    console.log(treatment);

    this.treatmentService.UpdateTreatmentStatus(
      treatment.id,
      treatment.previousStatus
    );
  }
}
