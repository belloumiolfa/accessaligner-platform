import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { HandleErrorsService } from "../../../Core/Helpers/handle-errors.service";
import { AppService } from "../../../Core/Services/app.service";

import { provideNativeDateAdapter } from "@angular/material/core";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { filter, take } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: "app-patient-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./patient-form.component.html",
  styleUrl: "./patient-form.component.css",
})
export class PatientFormComponent implements AfterViewInit {
  patientForm!: FormGroup<any>;
  errors: any = {};
  user$!: any;
  patient$!: any;
  patients$!: any;
  initialFormValues: any;
  valueChangesSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private appService: AppService,
    private stepsService: StepsService,
    private router: Router
  ) {
    this.stepsService.markdetectedChange(false);
    this.stepsService.markCLikcedSave(false);
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
    this.appService.getPatients$.subscribe((data) => (this.patients$ = data));
  }
  ngOnDestroy(): void {
    this.initialFormValues = {};
    this.valueChangesSubscription = {};
    $("#datetimepicker").bootstrapMaterialDatePicker("destroy");
  }

  initializeForm(): void {
    this.patientForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      sex: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      disease: new FormControl(""),
      address: new FormControl(""),
      comment: new FormControl(""),
    });

    this.appService.getPatient$.subscribe((data) => {
      this.patient$ = data;
      if (this.patient$) {
        this.patientForm.patchValue({
          firstName: this.patient$.firstName,
          lastName: this.patient$.lastName,

          birthday: this.patient$.birthday
            ? this.getdate(this.patient$.birthday)
            : this.patient$.birthday,
          sex: this.patient$.sex,
          email: this.patient$.email,
          phone: this.patient$.phone,
          disease: this.patient$.disease,
          address: this.patient$.address,
          comment: this.patient$.comment,
        });
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    $("#datetimepicker")
      .bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        maxDate: new Date(),
      })
      .on("change", (e: any, date: { format: (arg0: string) => any }) => {
        const formattedDate = date.format("YYYY-MM-DD");
        this.patientForm.get("birthday")?.setValue(formattedDate);
      });
    // Set the initial date in the date picker and form control

    this.patientForm
      .get("birthday")
      ?.setValue(this.patient$.birthday.format("YYYY-MM-DD"));

    // Save initial form values

    this.initialFormValues = this.patientForm.valueChanges
      .pipe(take(1))
      .subscribe((data) => {
        this.valueChangesSubscription = data;
        this.valueChangesSubscription = this.patientForm.valueChanges
          .pipe(take(2))
          .subscribe((data) => {
            this.checkForChanges(data);
          });
      });
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          $("#datetimepicker")
            .bootstrapMaterialDatePicker({
              weekStart: 0,
              time: false,
              maxDate: new Date(),
            })
            .on("change", (e: any, date: { format: (arg0: string) => any }) => {
              const formattedDate = date.format("YYYY-MM-DD");
              this.patientForm.get("birthday")?.setValue(formattedDate);
            });
        }, 0);
      });

    this.initialFormValues = this.patientForm.valueChanges
      .pipe(take(1))
      .subscribe((data) => {
        this.valueChangesSubscription = data;
        this.valueChangesSubscription = this.patientForm.valueChanges
          .pipe(take(2))
          .subscribe((data) => {
            this.checkForChanges(data);
          });
      });
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

  onSubmit(e: any) {
    this.errors = this.handleErrors.handleError({});

    if (this.patientForm.valid) {
      if (this.patient$?.id) this.updatePatient();
      else this.saveNewPatient();
    }
  }
  getdate(date: any) {
    return date.slice(0, 10);
  }
  saveNewPatient() {
    this.stepsService.markCLikcedSave(true);
    this.patientService.AddPatient(this.patientForm.value, this.user$.id);
    this.errors = this.handleErrors.errors;
  }

  updatePatient() {
    this.stepsService.markCLikcedSave(true);
    this.patientService.UpdatePatient(
      this.patientForm.value,
      this.patient$.id,
      this.patient$
    );

    this.errors = this.handleErrors.errors;
  }
}
