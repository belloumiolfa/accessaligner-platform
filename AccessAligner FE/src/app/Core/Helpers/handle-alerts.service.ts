import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class HandleAlertsService {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  handleSweetAlert(title: any, icon: any, showConfirmButton: any) {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      timerProgressBar: true,
      timer: 3000,
      /* timerProgressBar: !showConfirmButton,
      timer: !showConfirmButton ? 2000 : 0, */
      showConfirmButton: showConfirmButton,
      customClass: {
        container: "",
        popup: "",
        title: "",
        closeButton: "",
        icon: "",
        image: "",
        htmlContainer: "",
        input: "",
        inputLabel: "",
        validationMessage: "",
        actions: "",
        confirmButton: "",
        denyButton: "",
        cancelButton: "",
        loader: "",
        footer: "",
        timerProgressBar: "",
      },

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  handleConfirmAlert() {
    return Swal.fire({
      title: this.translate.instant("alert-msg.confirm-alert.confirm-title"),
      text: this.translate.instant("alert-msg.confirm-alert.confirm-text"),
      icon: "warning",
      toast: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant(
        "alert-msg.confirm-alert.confirm-button"
      ),
      cancelButtonText: this.translate.instant(
        "alert-msg.confirm-alert.cancel-button"
      ),
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#b9b9b9",

      customClass: {
        container: "",
        popup: "sweet-alert",
        title: "",
        closeButton: "",
        icon: "",
        image: "",
        htmlContainer: "",
        input: "",
        inputLabel: "",
        validationMessage: "",
        actions: "",
        confirmButton: "",
        denyButton: "",
        cancelButton: "",
        loader: "",
        footer: "",
        timerProgressBar: "",
      },

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }
}
