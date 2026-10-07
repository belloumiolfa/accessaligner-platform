import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { PlanService } from "../../../Core/Services/PlanService/plan.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppService } from "../../../Core/Services/app.service";
import { TreatmentService } from "../../../Core/Services/TreatService/treatment.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-add-new-plan",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TranslateModule,
  ],
  templateUrl: "./add-new-plan.component.html",
  styleUrl: "./add-new-plan.component.css",
})
export class AddNewPlanComponent {
  // description: any;

  photos: File[] = [];
  videos: File[] = [];
  reports: File[] = [];

  form!: FormGroup<any>;
  treatId!: any;
  treatment$!: any;
  treatments$!: any[];
  errors: any;
  savedPlan!: any;
  planData: {} = {};
  constructor(
    private planService: PlanService,
    private activeRoute: ActivatedRoute,
    private appService: AppService,
    private treatmentService: TreatmentService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
    this.appService.getTreatments$.subscribe((data) => {
      this.treatments$ = data;
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.treatId = params["id"];
      this.treatmentService.GetTreatmentById(this.treatId);
    });
    this.form = new FormGroup({
      /*       term: new FormControl("", [Validators.required]),
       */ description: new FormControl(""),
      code: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    /*     if (this.form.value.term === true) {
     */ this.planData = {
      treatId: this.treatId,
      description: this.form.value.description,
      code: this.form.value.code,
      photos: this.photos,
      reports: this.reports,
      videos: this.videos,
    };
    this.planService.AddPlan(this.planData, this.treatment$);
    /*  } */
  }

  onSelect(event: { addedFiles: File[] }) {
    event.addedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        this.photos.push(file);
      } else if (file.type.startsWith("video/")) {
        this.videos.push(file);
      } else if (file.type === "application/pdf") {
        this.reports.push(file);
      }
    });
  }

  onRemove(event: File, type: "photo" | "video" | "report") {
    if (type === "photo") {
      this.photos.splice(this.photos.indexOf(event), 1);
    } else if (type === "video") {
      this.videos.splice(this.videos.indexOf(event), 1);
    } else if (type === "report") {
      this.reports.splice(this.reports.indexOf(event), 1);
    }
  }
}
