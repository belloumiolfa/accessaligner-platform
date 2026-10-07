import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PatientService } from "../../../Core/Services/PatientService/patient.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-patient",
  standalone: true,
  imports: [
    BlockHeaderComponent,
    RouterOutlet,
    RouterModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: "./patient.component.html",
  styleUrl: "./patient.component.css",
})
export class PatientComponent {
  clickedIndex = 1;
  errors!: any;

  constructor(private patientService: PatientService) {
    this.patientService.GetPatients();
  }
}
