import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Observable, map } from "rxjs";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class MessageRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  saveNewMessage(data: any): Observable<any> {
    return this.http
      .post(this.apiBaseUrl + "/api/private/messages/save-message", data, {
        headers: new HttpHeaders()
          .set("Authorization", `Bearer ${loggedInUser()}`)
          .set("Accept-Language", this.lang), // Set the Accept-Language header,
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getMessages(treatId: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/messages/get-messages?treatId=" +
          treatId,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  markAsSeen(messageId: Number, userId: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/messages/seen?messageId=" +
          messageId +
          "&userId=" +
          userId,
        {
          headers: new HttpHeaders()
            .set("Authorization", `Bearer ${loggedInUser()}`)
            .set("Accept-Language", this.lang), // Set the Accept-Language header,
        }
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
