import { Component, Input } from "@angular/core";

@Component({
  selector: "app-post-banner",
  standalone: true,
  imports: [],
  templateUrl: "./post-banner.component.html",
  styleUrl: "./post-banner.component.css",
})
export class PostBannerComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() image!: string;
}
