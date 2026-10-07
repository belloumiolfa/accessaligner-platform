import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchComponent } from "../search/search.component";
import { TranslateButtonComponent } from "../translate-button/translate-button.component";

@Component({
  selector: "app-block-header",
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SearchComponent,
    TranslateButtonComponent,
  ],
  templateUrl: "./block-header.component.html",
  styleUrl: "./block-header.component.css",
})
export class BlockHeaderComponent {
  @Input() page!: any;
  @Input() father!: any;
  @Input() subPage!: any;
}
