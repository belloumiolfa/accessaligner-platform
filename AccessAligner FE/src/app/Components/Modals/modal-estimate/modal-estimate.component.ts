import { Component, ElementRef, ViewChild } from "@angular/core";
import { TreatmentConfirmationComponent } from "../../Treatment/treatment-confirmation/treatment-confirmation.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppService } from "../../../Core/Services/app.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ContentDevisTreatComponent } from "../content-devis-treat/content-devis-treat.component";
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from "ng-multiselect-dropdown";
import { ListItem } from "ng-multiselect-dropdown/multiselect.model";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-modal-estimate",
  standalone: true,
  imports: [
    TreatmentConfirmationComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentDevisTreatComponent,
    NgMultiSelectDropDownModule,
    TranslateModule,
  ],
  templateUrl: "./modal-estimate.component.html",
  styleUrl: "./modal-estimate.component.css",
})
export class ModalEstimateComponent {
  estimateForm!: FormGroup<any>;
  totalAfterDiscount!: any;
  dataForDevis!: any;
  treatment$!: any;
  queteModal = false;
  selectedItemDiscount: any;
  selectedItemCurrency: any;
  dropdownListDiscount = [10, 20, 30, 40, 50];
  dropdownListCurrency = ["DT", "EURO", "DOLLAR"];

  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: "item_id",
    textField: "item_name",
  };
  displayDevis: boolean = false;
  @ViewChild("content") content!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });

    this.estimateForm = this.formBuilder.group({
      upper: new FormControl("", [Validators.required]),
      priceUpper: new FormControl("", [Validators.required]),
      lower: new FormControl("", [Validators.required]),
      priceLower: new FormControl("", [Validators.required]),
      discount: new FormControl(""),
      currency: new FormControl("", [Validators.required]),
    });
  }

  estimates: any[] = [];

  onSubmit() {
    let data = this.estimateForm.value;

    let total =
      (data.upper * data.priceUpper * 1000 +
        data.lower * data.priceLower * 1000) /
      1000;

    if (data.discount > 0) {
      this.totalAfterDiscount = total - (total * data.discount) / 100;
    } else {
      this.totalAfterDiscount = total;
    }

    this.dataForDevis = {
      data: data,
      total: total,
      totalAfterDiscount: this.totalAfterDiscount,
      totalSup: data.priceUpper * data.upper,
      totalInf: data.priceLower * data.lower,
      currency: this.selectedItemCurrency,
    };

    this.displayDevis = true;
    // open an other modal that shows the estimate details like the old one
  }

  @ViewChild("contentToExport", { static: false }) contentToExport!: ElementRef;
  save() {
    this.displayDevis = true;
  }

  close() {
    this.activeModal.close();
  }

  onItemSelectDicount($event: ListItem) {
    this.estimateForm.patchValue({
      discount: $event,
    });
    this.selectedItemDiscount = $event;
  }
  onItemSelectCurrency($event: ListItem) {
    this.estimateForm.patchValue({
      currency: $event,
    });

    this.selectedItemCurrency = $event;
  }
}
