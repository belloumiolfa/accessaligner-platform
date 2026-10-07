import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class UserRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  updateSetting(
    userName: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/securitySettings`,
        { userName, currentPassword, newPassword },
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

  updateProfile(data: any, id: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/profile/update?userId=` + id,
        { ...data },
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

  updatePhoto(file: File, id: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    return this.http
      .post(
        this.apiBaseUrl + "/api/private/profile/updatePhoto?userId=" + id,
        formData,
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

  getPhoto(id: any, type: any): Observable<any> {
    return this.http
      .get(
        this.apiBaseUrl +
          "/api/private/profile/getPhoto?id=" +
          id +
          "&type=" +
          type,
        {
          responseType: "blob",
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

  getDoctors(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-doctors`, {
        headers: new HttpHeaders()
          .set("Authorization", `Bearer ${loggedInUser()}`)
          .set("Accept-Language", this.lang), // Set the Accept-Language header,
      })
      .pipe(map((data: any) => data));
  }
}
