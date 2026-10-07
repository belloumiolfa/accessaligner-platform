import { Component } from "@angular/core";
import { HeroComponent } from "../../Components/hero/hero.component";
import { GoalsComponent } from "../../Components/goals/goals.component";
import { AboutComponent } from "../../Components/about/about.component";
import { HowWorksComponent } from "../../Components/how-works/how-works.component";
import { CacesComponent } from "../../Components/caces/caces.component";
import { TestimonialComponent } from "../../Components/testimonial/testimonial.component";
import { NewsComponent } from "../../Components/news/news.component";
import { BannerComponent } from "../../Components/Banners/banner/banner.component";
import { posts } from "../../Shared/data/posts";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HeroComponent,
    GoalsComponent,
    AboutComponent,
    HowWorksComponent,
    CacesComponent,
    TestimonialComponent,
    NewsComponent,
    BannerComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  posts = posts.slice(0, 3);
}
