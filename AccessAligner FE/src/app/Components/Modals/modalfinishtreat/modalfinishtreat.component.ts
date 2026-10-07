import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TimelineTreatmentsComponent } from "../../../Pages/Treatment-management/timeline-treatments/timeline-treatments.component";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { CommonModule } from "@angular/common";
import { AppService } from "../../../Core/Services/app.service";
import { StepsService } from "../../../Core/Helpers/Steps/steps.service";
import { TranslateModule } from "@ngx-translate/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-modalfinishtreat",
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    TimelineTreatmentsComponent,
    TranslateModule,
  ],
  templateUrl: "./modalfinishtreat.component.html",
  styleUrl: "./modalfinishtreat.component.css",
})
export class ModalfinishtreatComponent {
  @Input() data: any;
  @Input() isCompleted: any;

  errors: any;
  treatments$!: any[];

  constructor(
    public activeModal: NgbActiveModal,
    private treatmentService: TreatmentService,
    private appService: AppService,
    private stepsService: StepsService
  ) {
    this.appService.getTreatments$.subscribe(
      (data) => (this.treatments$ = data)
    );
  }

  term!: FormControl;

  ngOnInit(): void {
    this.term = new FormControl("", [Validators.required]);
  }

  close() {
    this.activeModal.close();
  }

  closeUpdate() {
    this.stepsService.markCurrentStep(0);
    this.activeModal.close();
  }

  completeTreatment() {
    this.treatmentService.UpdateTreatmentStatus(this.data?.id, "COMPLETED");
    this.activeModal.close();
  }
}
