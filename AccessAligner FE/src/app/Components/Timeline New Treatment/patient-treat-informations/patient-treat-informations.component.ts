import { Component, Input } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InfosComponent } from "../../Treatment/infos/infos.component";
import { TranslateModule } from "@ngx-translate/core";
import { TypeTreatmentService } from "../../../Core/Helpers/type-treatment.service";

@Component({
  selector: "app-patient-treat-informations",
  standalone: true,
  imports: [FormsModule, CommonModule, InfosComponent, TranslateModule],
  templateUrl: "./patient-treat-informations.component.html",
  styleUrl: "./patient-treat-informations.component.css",
})
export class PatientTreatInformationsComponent {
  treatment$!: any;
  @Input() treatment: any;
  constructor(private typeTreatment: TypeTreatmentService) {}

  getTypeTreatment(treat: string) {
    return this.typeTreatment.getTypeTreatement(treat);
  }
}
