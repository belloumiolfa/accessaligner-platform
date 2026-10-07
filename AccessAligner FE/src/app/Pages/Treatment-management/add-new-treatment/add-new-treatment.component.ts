import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { AppService } from "../../../Core/Services/app.service";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { TimelineTreatmentsComponent } from "../timeline-treatments/timeline-treatments.component";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { ModalService } from "../../../Core/Helpers/modal.service";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import {
  steps,
  stepsFrench,
} from "../../../Shared/Static Data/steps-treatment";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { checkFiles, isTreatmentCompleted } from "../../../Core/Helpers/utils";
@Component({
  selector: "app-add-new-treatment",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    TimelineTreatmentsComponent,
    TranslateModule,
  ],
  templateUrl: "./add-new-treatment.component.html",
  styleUrl: "./add-new-treatment.component.css",
})
export class AddNewTreatmentComponent implements OnDestroy {
  id!: any;
  errors: any;
  treatment$!: any;
  clickedIndex!: any;
  detected$: any;
  clickedSave$: any;
  disabledSteps$: any;
  disabledStepsTreatment$: any;
  clickedFinish!: boolean;
  canNavigate: boolean = true;

  steps!: any[];
  addPatientMsg: string = "";
  saveMsg: string = "";
  lang!: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private appService: AppService,
    private stepsService: StepsService,
    private treatService: TreatmentService,
    private modalService: ModalService,
    private handleSweetAlerts: HandleAlertsService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.steps = steps;
    else this.steps = stepsFrench;

    this.translate
      .get(
        "pages.treatment-management.add-new-treatment.steps-messages.save-msg"
      )
      .subscribe((translatedMessage) => {
        this.saveMsg = translatedMessage;
      });

    this.stepsService.getClickedIndex$.subscribe((data) => {
      this.clickedIndex = data;
    });

    this.stepsService.getDisabledSteps$.subscribe((data) => {
      this.disabledSteps$ = data;
    });

    this.activeRoute.params.subscribe((params) => {
      this.id = params["id"];

      if (params["id"] === "null") {
        this.clickedIndex = 0;
      }

      this.stepsService.getClickedSave$.subscribe((data) => {
        this.clickedSave$ = data;
      });

      if (this.id === "null" && this.disabledSteps$) {
        this.canNavigate = false;
      }

      this.getPatient();
    });

    this.appService.getTreatment$.subscribe((data: Object) => {
      this.treatment$ = data;

      this.steps[0].done = this.treatment$?.patient?.firstName != null;
      this.steps[1].done = this.treatment$?.treat != null;
      this.steps[2].done = this.treatment$?.teeth?.length > 0;
      this.steps[3].done = this.treatment$?.lengthPhotos >= 10;
      this.steps[4].done = this.treatment$?.lengthClinics >= 4;
    });
  }

  chceckLength(treat: any) {
    return this.treatment$.photos.length;
  }

  ngOnDestroy(): void {
    this.stepsService.markdetectedChange(false);
  }

  getPatient() {
    if (this.id != "null")
      this.patientService.GetPatient(this.id).subscribe((res) => {
        if (res === true) {
          this.getPatientCurretntTreatment();
        }
      });
  }

  getPatientCurretntTreatment() {
    this.treatService.GetInitPatientsTreat(Number(this.id));
  }

  ngOnInit(): void {
    this.stepsService.getDetectedChanges$.subscribe((data) => {
      this.detected$ = data;
    });

    let url = this.router.url.split("/");

    this.clickedIndex = this.steps.findIndex((step) => {
      return step.url == url[url.length - 1];
    });
  }

  getAlert(i: any) {
    if (i !== 0 && this.id === "null" && this.disabledSteps$) {
      this.handleSweetAlerts.handleSweetAlert(
        this.translate.instant(
          "pages.treatment-management.add-new-treatment.steps-messages.add-patient-msg"
        ),
        "warning",
        false
      );

      this.canNavigate = false;
      console.log("pstt ", this.canNavigate);
    } else if (this.detected$ == true && this.clickedSave$ == false) {
      this.handleSweetAlerts.handleSweetAlert(
        this.translate.instant(
          "pages.treatment-management.add-new-treatment.steps-messages.save-msg"
        ),
        "warning",
        false
      );

      this.canNavigate = false;
    } else {
      this.clickedIndex = i;

      this.canNavigate = true;
    }
  }

  getLink(
    url: string,
    i: number,
    canNavigate: boolean,
    clicked: boolean,
    disabled: boolean
  ): string {
    if (
      i !== 0 &&
      this.id === "null" &&
      this.disabledSteps$ &&
      this.canNavigate == false
    ) {
      return this.steps[0].url;
    }

    if (canNavigate == false && i > 0 && !clicked) {
      let urlto = this.steps[i - 1].url;

      return this.steps[i - 1].url;
    } else {
      return url;
    }
  }

  nextStep() {
    this.clickedFinish = true;

    this.stepsService.getDetectedChanges$.subscribe((data) => {
      this.detected$ = data;
    });

    this.stepsService.getClickedSave$.subscribe((data) => {
      this.clickedSave$ = data;
    });

    if (this.id === "null" && this.disabledSteps$) {
      this.handleSweetAlerts.handleSweetAlert(
        this.translate.instant(
          "pages.treatment-management.add-new-treatment.steps-messages.add-patient-msg"
        ),
        "warning",
        false
      );
    } else if (this.detected$ == true && this.clickedSave$ == false) {
      this.handleSweetAlerts.handleSweetAlert(this.saveMsg, "warning", false);
    } else {
      this.clickedIndex = this.clickedIndex + 1;
      this.router.navigate([
        `treatment/new-treatment/${this.treatment$?.patient?.id}/${
          this.steps[this.clickedIndex].url
        }`,
      ]);
    }
  }

  previousStep() {
    this.clickedIndex -= 1;
    this.router.navigate([
      `treatment/new-treatment/${this.treatment$?.patient?.id}/${
        this.steps[this.clickedIndex].url
      }`,
    ]);
  }

  finishing() {
    this.clickedFinish = true;

    this.stepsService.getDetectedChanges$.subscribe((data) => {
      this.detected$ = data;
    });

    this.stepsService.getClickedSave$.subscribe((data) => {
      this.clickedSave$ = data;
    });
    this.stepsService.getDetectedChanges$.subscribe((data) => {
      this.detected$ = data;
    });

    this.stepsService.getClickedSave$.subscribe((data) => {
      this.clickedSave$ = data;
    });

    if (this.detected$ == true && this.clickedSave$ == false) {
      this.handleSweetAlerts.handleSweetAlert(
        this.translate.instant(
          "pages.treatment-management.add-new-treatment.steps-messages.save-msg"
        ),
        "warning",
        false
      );
    } else {
      let verify =
        isTreatmentCompleted(this.treatment$) &&
        (this.treatment$.status === "NEW" ||
          this.treatment$.status === "QUALIFIED");

      this.modalService.open(this.treatment$, verify);
    }
  }
}
