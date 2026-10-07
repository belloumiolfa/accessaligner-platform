import { Injectable } from "@angular/core";
import { MessageRequestsService } from "../../Requests/Message/message-requests.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Helpers/handle-errors.service";
import { AppService } from "../app.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(
    private messageRequest: MessageRequestsService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private appService: AppService,
    private translate: TranslateService
  ) {}

  saveNewMessage(data: any) {
    this.messageRequest.saveNewMessage(data).subscribe(
      (data) => {
        this.appService.addMessages(data);
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.messages-service.failed-send-msg"),
          "error",
          false
        );
      }
    );
  }

  getMessages(treatmentId: any) {
    this.messageRequest.getMessages(treatmentId).subscribe(
      (data) => {
        this.appService.setMessages$(data);
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.messages-service.failed-get-msg"),
          "error",
          false
        );
      }
    );
  }
  markAsSeen(messageId: any, userId: any) {
    this.messageRequest.markAsSeen(messageId, userId).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.translate.instant("alert-msg.messages-service.failed-get-msg"),
          "error",
          false
        );
      }
    );
  }
}
