import { Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { AppService } from "../../../Core/Services/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-new-treat-general",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: "./new-treat-general.component.html",
  styleUrl: "./new-treat-general.component.css",
})
export class NewTreatGeneralComponent implements OnDestroy {
  treatForm!: FormGroup<any>;
  patient$!: any;
  doctor$!: any;
  errors: any;
  savedTreatment$!: any;

  @Output() indexEmitter = new EventEmitter<string>();
  treatments$!: any[];
  initialFormValues: any;
  valueChangesSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private treatmentService: TreatmentService,
    private appService: AppService,
    private spinner: NgxSpinnerService,
    private stepsService: StepsService
  ) {
    this.stepsService.markdetectedChange(false);
    this.stepsService.markCLikcedSave(false);

    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
    this.appService.getUser$.subscribe((data) => (this.doctor$ = data));
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );

    this.appService.getTreatment$.subscribe((data) => {
      this.savedTreatment$ = data;

      this.treatForm = this.formBuilder.group({
        description: new FormControl(this.savedTreatment$.description!),
        treat: new FormControl(this.savedTreatment$.treat, [
          Validators.required,
        ]),
        postCross: new FormControl(this.savedTreatment$.postCross, [
          Validators.required,
        ]),
        antCross: new FormControl(this.savedTreatment$.antCross, [
          Validators.required,
        ]),
        gap: new FormControl(this.savedTreatment$.gap, [Validators.required]),
        overbite: new FormControl(this.savedTreatment$.overbite, [
          Validators.required,
        ]),
        classI: new FormControl(this.savedTreatment$.classI, [
          Validators.required,
        ]),
        reduceOverbite: new FormControl(this.savedTreatment$.reduceOverbite, [
          Validators.required,
        ]),
        crowding: new FormControl(this.savedTreatment$.crowding, [
          Validators.required,
        ]),
        extract: new FormControl(this.savedTreatment$.extract, [
          Validators.required,
        ]),
      });
    });
  }
  ngOnInit(): void {
    // Save initial form values

    this.initialFormValues = this.treatForm.getRawValue();
    this.valueChangesSubscription = this.treatForm.valueChanges.subscribe(
      (data) => {
        this.checkForChanges(data);
      }
    );
  }

  checkForChanges(data: any) {
    for (let key in this.initialFormValues) {
      if (this.initialFormValues[key] !== data[key]) {
        this.stepsService.markdetectedChange(true);

        break;
      } else {
        this.stepsService.markdetectedChange(false);
      }
    }
  }

  onSubmit($event: Event) {
    this.stepsService.markCLikcedSave(true);

    $event.preventDefault();
    this.spinner.show();
    this.treatmentService.AddTreatmentInfos(
      this.treatForm.value,
      this.patient$.id,
      2,
      "teeth"
    );
  }

  onReset($event: Event) {
    this.treatForm.reset();
  }

  ngOnDestroy(): void {
    this.initialFormValues = {};
    this.valueChangesSubscription = {};
  }
}
