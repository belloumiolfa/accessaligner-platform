import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { loggedInUser } from "../../Helpers/utils";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class AdminRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  lang!: any;
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  newAdmin(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/api/private/new-admin`, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${loggedInUser()}`)
          .set('Accept-Language', this.lang), // Set the Accept-Language header,
      })
      .pipe(map((data: any) => data));
  }

  getAdmins(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/get-admins`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${loggedInUser()}`)
          .set('Accept-Language', this.lang), // Set the Accept-Language header,
      })
      .pipe(map((data: any) => data));
  }

  deleteAdmin(id: any) {
    return this.http
      .delete<any>(`${this.apiBaseUrl}/api/private/delete-admin?id=${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${loggedInUser()}`)
          .set('Accept-Language', this.lang), // Set the Accept-Language header,
      })
      .pipe(map((user: any) => user));
  }
  switchToSuperAdmin(id: any, switchRole: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiBaseUrl}/api/private/switch-role?adminId=` +
          id +
          '&switchRole=' +
          switchRole,
        {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${loggedInUser()}`)
            .set('Accept-Language', this.lang), // Set the Accept-Language header,
        },
      )
      .pipe(map((data: any) => data));
  }

  approveUser(userId: number): Observable<any> {
    return this.http.patch<any>(
      `${this.apiBaseUrl}/admin/users/${userId}/accept`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${loggedInUser()}`)
          .set('Accept-Language', this.lang), // Set the Accept-Language header,
      },
    );
  }

  rejectUser(userId: number, reason: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiBaseUrl}/admin/users/${userId}/reject`,
      { reason },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${loggedInUser()}`)
          .set('Accept-Language', this.lang), // Set the Accept-Language header,
      },
    );
  }
}
