import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class EstimateRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  uploadPdfFile(file: any, id: any, type: string, fileName: string) {
    const formData = new FormData();
    formData.append("file", file, fileName);

    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/private/saveEstimate?type=` +
          type +
          "&treatId=" +
          id,
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

  getPdfFile(id: any): Observable<any> {
    return this.http
      .get(this.apiBaseUrl + "/api/private/getEstimate?id=" + id, {
        responseType: "blob",
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

  updateEstimateStatus(id: Number, status: string): Observable<any> {
    return this.http
      .post(
        this.apiBaseUrl + "/api/private/updateEstimateStatus?id=" + id,
        status,
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

  deleteEstimate(id: Number): Observable<any> {
    return this.http
      .delete(this.apiBaseUrl + "/api/private/deleteEstimate?id=" + id, {
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

  deleteALLEstimate(id: Number): Observable<any> {
    return this.http
      .delete(this.apiBaseUrl + "/api/private/deleteAllEstimate?id=" + id, {
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
}
