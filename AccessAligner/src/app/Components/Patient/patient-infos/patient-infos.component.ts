import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivitiesComponent } from "../../Treatment/activities/activities.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-patient-infos",
  standalone: true,
  imports: [FormsModule, CommonModule, ActivitiesComponent, TranslateModule],
  templateUrl: "./patient-infos.component.html",
  styleUrl: "./patient-infos.component.css",
})
export class PatientInfosComponent {
  @Input() patient$!: any;
  treatments$!: any;
}
