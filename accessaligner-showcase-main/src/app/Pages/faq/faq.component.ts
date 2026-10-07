import { Component } from "@angular/core";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { QuestionsComponent } from "../../Components/questions/questions.component";
import { SearchBannerComponent } from "../../Components/Banners/search-banner/search-banner.component";

@Component({
  selector: "app-faq",
  standalone: true,
  imports: [TopBannerComponent, QuestionsComponent, SearchBannerComponent],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.css",
})
export class FaqComponent {}
