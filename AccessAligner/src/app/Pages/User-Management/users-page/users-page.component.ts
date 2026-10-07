import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-users-page",
  standalone: true,
  imports: [CommonModule, RouterModule, BlockHeaderComponent, TranslateModule],
  templateUrl: "./users-page.component.html",
  styleUrl: "./users-page.component.css",
})
export class UsersPageComponent {}
