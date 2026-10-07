import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BlockHeaderComponent } from "../../../Shared/Elements/block-header/block-header.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-users-overview",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BlockHeaderComponent, TranslateModule],
  templateUrl: "./users-overview.component.html",
  styleUrl: "./users-overview.component.css",
})
export class UsersOverviewComponent {
  clickedIndex = 0;

  setClickedIndex(i: number) {
    this.clickedIndex = i;
  }
}
