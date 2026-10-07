import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-patient-display-informations",
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: "./patient-display-informations.component.html",
  styleUrl: "./patient-display-informations.component.css",
})
export class PatientDisplayInformationsComponent {
  @Input() treatment!: any;
}
