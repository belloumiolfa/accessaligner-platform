import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-modal-display-item-plan",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./modal-display-item-plan.component.html",
  styleUrl: "./modal-display-item-plan.component.css",
})
export class ModalDisplayItemPlanComponent {
  @Input() data: any;

  typeImage: boolean = false;
  typeStl: boolean = false;
  typeVideo: boolean = false;
  typePDF: boolean = false;
  modelSrc: any;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.data) {
      if (this.data.type.includes("image")) {
        this.typeImage = true;
      } else if (this.data.type.includes("video")) {
        this.typeVideo = true;
      } else if (this.data.type.includes("pdf")) {
        this.typePDF = true;
      }
    }
  }

  close() {
    this.activeModal.close();
  }
}
