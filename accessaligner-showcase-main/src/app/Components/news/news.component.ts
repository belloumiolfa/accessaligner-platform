import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-news",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./news.component.html",
  styleUrl: "./news.component.css",
})
export class NewsComponent {
  @Input() posts!: any;
  @Input() title!: string;
  @Input() subTitle!: string;
}
