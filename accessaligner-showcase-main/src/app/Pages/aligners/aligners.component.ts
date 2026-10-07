import { Component } from "@angular/core";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { ExpertisComponent } from "../../Components/expertis/expertis.component";
import { StepsComponent } from "../../Components/steps/steps.component";
import { SmileBannerComponent } from "../../Components/Banners/smile-banner/smile-banner.component";
import { BannerComponent } from "../../Components/Banners/banner/banner.component";

@Component({
  selector: "app-aligners",
  standalone: true,
  imports: [
    TopBannerComponent,
    ExpertisComponent,
    StepsComponent,
    SmileBannerComponent,
    BannerComponent,
  ],
  templateUrl: "./aligners.component.html",
  styleUrl: "./aligners.component.css",
})
export class AlignersComponent {}
