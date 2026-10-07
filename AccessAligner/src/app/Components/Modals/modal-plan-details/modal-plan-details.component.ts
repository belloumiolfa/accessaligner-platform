import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { AppService } from "../../../Core/Services/app.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TeamInfoComponent } from "../../../Shared/Elements/team-info/team-info.component";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { PlanService } from "../../../Core/Services/PlanService/plan.service";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { StatusClassService } from "../../../Core/Helpers/status-class.service";
import { UtilsService } from "../../../Auth/Helpers/utils.service";
import { TranslateModule } from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";

declare var $: any;
@Component({
  selector: "app-modal-plan-details",
  standalone: true,
  imports: [
    CommonModule,
    TeamInfoComponent,
    NgxSpinnerModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./modal-plan-details.component.html",
  styleUrl: "./modal-plan-details.component.css",
})
export class ModalPlanDetailsComponent implements OnInit, AfterViewInit {
  @Input() plan: any;
  @Input() treatment: any;
  plan$!: any;

  existedFilesPhotos: any[] = [];
  existedFilesVedios: any[] = [];
  existedFilesReports: any[] = [];
  productionDelay: any;
  treatments$!: any[];

  myGroup: any;
  deliveryDate!: any;
  productionForm!: any;
  feedBackForm!: any;

  showPhotosSpinner: boolean = false;
  showVideosSpinner: boolean = false;
  showReprotsSpinner: boolean = false;
  errors: any;
  user$!: any;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: ModalService,
    private planService: PlanService,
    private spinner: NgxSpinnerService,
    private appService: AppService,
    private statucClassService: StatusClassService,
    public utils: UtilsService,
    private typeTreatment: TypeTreatmentService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));

    this.appService.getPlan$.subscribe((data) => {
      this.plan$ = data;
    });

    this.deliveryDate = new FormControl("", Validators.required);
    this.productionForm = new FormControl("", Validators.required);
    this.feedBackForm = new FormControl("");
  }

  close() {
    this.activeModal.close();
  }

  ngOnInit() {
    if (this.plan) {
      if (this.plan.photos.length !== 0) {
        this.existedFilesPhotos = this.appService.getFilesPlan(
          this.plan.photos,
          this.treatment.id
        );
      }

      if (this.plan.videos.length !== 0) {
        this.existedFilesVedios = this.appService.getFilesPlan(
          this.plan.videos,
          this.treatment.id
        );
      }

      if (this.plan.reports.length !== 0) {
        this.existedFilesReports = this.planService.GetReports(
          this.plan.reports,
          this.treatment.id,
          this.plan.id
        );
      }
    }
  }
  getTypeTreatement(type: any) {
    return this.typeTreatment.getTypeTreatement(type);
  }

  getRepports(repports: any[], treatId: Number, planId: Number) {
    this.existedFilesReports = this.planService.GetReports(
      repports,
      treatId,
      planId
    );
  }

  ngAfterViewInit(): void {
    $("#datetimepicker")
      .bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        minDate: new Date(),
      })
      .on("change", (e: any, date: { format: (arg0: string) => any }) => {
        const formattedDate = date.format("YYYY-MM-DD");
        this.deliveryDate?.setValue(formattedDate);
      });
  }

  onOpenPdf(file: any) {
    window.open(URL.createObjectURL(file.blob));
  }

  updateTreatmentPlan(data: any) {
    this.appService.setPlan$(data);
    this.appService.setTreatment({
      ...this.treatment,
      plans: [
        ...this.treatment.plans.filter((p: any) => p.id !== data.id),
        data,
      ],
    });

    this.spinner.hide();
  }

  displayItem(item: any) {
    this.modalService.openDisplayPhtotoPlanModel(item);
  }

  onUpdateStatus(planId: any, status: string) {
    this.planService.UpdateStatus(
      planId,
      status,
      this.feedBackForm.value,
      this.treatment
    );
  }

  onUpdateDeleveryDate(planId: any, date: Date, status: string) {
    this.planService.UpdateDateDelivery(
      new Date(date),
      this.feedBackForm.value,
      planId,
      status,
      this.treatment
    );
  }

  onStartProduction(planId: Number) {
    this.planService.UpdateProductionDelay(
      this.feedBackForm.value,
      this.productionForm.value,
      planId,
      this.treatment
    );
  }

  getStatusClass(status: any): any {
    return this.statucClassService.getClassStatus(status);
  }
}
