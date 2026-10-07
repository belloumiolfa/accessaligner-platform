import { Component } from "@angular/core";
import { PostBannerComponent } from "../../Components/Banners/post-banner/post-banner.component";
import { posts } from "../../Shared/data/posts";
import { PostContentComponent } from "../../Components/post-content/post-content.component";
import { NewsComponent } from "../../Components/news/news.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post",
  standalone: true,
  imports: [PostBannerComponent, PostContentComponent, NewsComponent],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.css",
})
export class PostComponent {
  posts = posts;
  post!: any;
  postId: string | null = null;
  otherPosts!: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // Capture the 'id' parameter from the route
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get("id"); // Extract the 'id' from the route parameters
      console.log(this.postId); // Use the id for logic, e.g., fetching data for a specific post

      this.post = this.posts.find((p) => p.id === this.postId);
      this.otherPosts = this.posts.filter((p) => p.id !== this.postId);

      console.log(this.post);
    });
  }
}
