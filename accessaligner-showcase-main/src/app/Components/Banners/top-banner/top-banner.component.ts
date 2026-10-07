import { Component, Input, input } from "@angular/core";

@Component({
  selector: "app-top-banner",
  standalone: true,
  imports: [],
  templateUrl: "./top-banner.component.html",
  styleUrl: "./top-banner.component.css",
})
export class TopBannerComponent {
  @Input() title!: string;
  @Input() subTitle!: string;
}
