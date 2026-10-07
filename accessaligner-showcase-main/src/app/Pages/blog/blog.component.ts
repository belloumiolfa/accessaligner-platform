import { Component } from "@angular/core";
import { TopBannerComponent } from "../../Components/Banners/top-banner/top-banner.component";
import { SmileBannerComponent } from "../../Components/Banners/smile-banner/smile-banner.component";
import { PostsComponent } from "../../Components/posts/posts.component";

@Component({
  selector: "app-blog",
  standalone: true,
  imports: [TopBannerComponent, SmileBannerComponent, PostsComponent],
  templateUrl: "./blog.component.html",
  styleUrl: "./blog.component.css",
})
export class BlogComponent {}
