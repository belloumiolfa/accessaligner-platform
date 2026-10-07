import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-treat-general",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./treat-general.component.html",
  styleUrl: "./treat-general.component.css",
})
export class TreatGeneralComponent {
  @Input() treatment$!: any;
}
