import { Component } from "@angular/core";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { CacesComponent } from "../../Components/caces/caces.component";
import { TestimonialComponent } from "../../Components/testimonial/testimonial.component";
import { BannerComponent } from "../../Components/Banners/banner/banner.component";
import { ChoiceComponent } from "../../Components/choice/choice.component";

@Component({
  selector: "app-why-access-aligner",
  standalone: true,
  imports: [
    TopBannerComponent,
    CacesComponent,
    TestimonialComponent,
    BannerComponent,
    ChoiceComponent,
  ],
  templateUrl: "./why-access-aligner.component.html",
  styleUrl: "./why-access-aligner.component.css",
})
export class WhyAccessAlignerComponent {}
