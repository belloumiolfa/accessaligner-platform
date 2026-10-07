import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-activities",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: "./activities.component.html",
  styleUrl: "./activities.component.css",
})
export class ActivitiesComponent {
  show = false;
  @Input() treatment$!: any;
}
