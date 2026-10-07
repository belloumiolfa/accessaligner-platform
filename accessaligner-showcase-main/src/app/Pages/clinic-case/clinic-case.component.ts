import { Component } from "@angular/core";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { AllCacesComponent } from "../../Components/all-caces/all-caces.component";

@Component({
  selector: "app-clinic-case",
  standalone: true,
  imports: [TopBannerComponent, AllCacesComponent],
  templateUrl: "./clinic-case.component.html",
  styleUrl: "./clinic-case.component.css",
})
export class ClinicCaseComponent {}
