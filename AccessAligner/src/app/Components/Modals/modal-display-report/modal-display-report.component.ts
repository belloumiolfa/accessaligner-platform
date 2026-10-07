import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";

@Component({
  selector: "app-modal-display-report",
  standalone: true,
  imports: [CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: "./modal-display-report.component.html",
  styleUrl: "./modal-display-report.component.css",
})
export class ModalDisplayReportComponent {
}
