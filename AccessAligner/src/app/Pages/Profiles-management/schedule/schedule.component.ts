import { Component } from "@angular/core";
import { ComingPageComponent } from "../../../Shared/Pages/coming-page/coming-page.component";

@Component({
  selector: "app-schedule",
  standalone: true,
  imports: [ComingPageComponent],
  templateUrl: "./schedule.component.html",
  styleUrl: "./schedule.component.css",
})
export class ScheduleComponent {}
