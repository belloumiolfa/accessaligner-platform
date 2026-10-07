import { Component, Input } from "@angular/core";
import { ProfileImageComponent } from "../../Shared/Elements/profile-image/profile-image.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-info-profile-menu",
  standalone: true,
  imports: [ProfileImageComponent, CommonModule, RouterModule],
  templateUrl: "./info-profile-menu.component.html",
  styleUrl: "./info-profile-menu.component.css",
})
export class InfoProfileMenuComponent {
  @Input() user: any;
  @Input() profilePhoto$: any;
}
