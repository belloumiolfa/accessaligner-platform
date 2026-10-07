import { Component } from "@angular/core";
import { TestimonialComponent } from "../../Components/testimonial/testimonial.component";
import { BannerComponent } from "../../Components/Banners/banner/banner.component";
import { WhoAsComponent } from "../../Components/who-as/who-as.component";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { SolutionsComponent } from "../../Components/solutions/solutions.component";
import { SmileBannerComponent } from "../../Components/Banners/smile-banner/smile-banner.component";

@Component({
  selector: "app-about-as",
  standalone: true,
  imports: [
    TestimonialComponent,
    BannerComponent,
    WhoAsComponent,
    TopBannerComponent,
    SolutionsComponent,
    SmileBannerComponent,
  ],
  templateUrl: "./about-as.component.html",
  styleUrl: "./about-as.component.css",
})
export class AboutAsComponent {}
