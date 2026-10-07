import { Component } from "@angular/core";
import { posts } from "../../Shared/data/posts";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-posts",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.css",
})
export class PostsComponent {
  posts = posts;
}
