import { Component } from "@angular/core";
import { AddFileComponent } from "../../../Shared/Elements/add-file/add-file.component";
import { CommonModule } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { AppService } from "../../../Core/Services/app.service";
import Swal from "sweetalert2";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { FileService } from "../../../Core/Helpers/file.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  clinicalScans,
  clinicalScansFrench,
} from "../../../Shared/Static Data/clinical-scans";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";

@Component({
  selector: "app-new-treat-clinics",
  standalone: true,
  imports: [
    CommonModule,
    AddFileComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: "./new-treat-clinics.component.html",
  styleUrl: "./new-treat-clinics.component.css",
})
export class NewTreatClinicsComponent {
  files: File[] = [];
  clinics = clinicalScans;
  treatment$!: any;
  existedFiles$: any[] = [];
  errors: any;
  comment = new FormControl("");
  lang!: string;
  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private stepService: StepsService,
    private fileServices: FileService,
    private translate: TranslateService
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    if (this.lang == "en") this.clinics = clinicalScans;
    else this.clinics = clinicalScansFrench;

    this.stepService.markdetectedChange(false);
    this.stepService.markCLikcedSave(false);

    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      if (this.treatment$.photosComment !== "null")
        this.comment.setValue(this.treatment$.clinicsComment);

      this.existedFiles$ = this.fileServices?.getFiles(
        this.treatment$?.clinics,
        this.treatment$?.id
      );
    });
  }

  existedFile(photo: any) {
    const result = this.existedFiles$!?.filter(
      (file: any) => file?.name?.split(".")[0] === photo.name
    );
    return result[0];
  }

  onDeleteFile(event: any) {
    this.existedFiles$ = this.treatmentService.DeleteFile(
      event,
      this.treatment$,
      this.existedFiles$,
      "clinics"
    );
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.spinner.show();

    this.stepService.markCLikcedSave(true);

    this.treatmentService.AddTreatPhotos(
      this.files,
      this.treatment$.id,
      "clinic",
      this.comment.value
    );
  }

  onReset() {
    this.files = [];
  }
  onChangeFile($event: any) {
    this.files.push($event);
    this.stepService.markdetectedChange(true);
  }
}
