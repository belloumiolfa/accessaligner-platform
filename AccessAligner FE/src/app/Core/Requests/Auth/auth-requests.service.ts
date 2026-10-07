import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { loggedInUser, logOut } from '../../Helpers/utils';
import { User } from '../../Models/user.models';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthRequestsService {
  apiBaseUrl = environment.apiBaseUrl;
  user: User | null = null;
  lang!: any;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) {
    this.lang = this.translate.currentLang; // or this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  public currentUser(): User | null {
    if (!this.user) {
      this.user = loggedInUser();
    }

    return this.user;
  }
  /****************************************************************************** */

  signup(data: any): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/api/public/signup`, data, {
        headers: new HttpHeaders().set('Accept-Language', this.lang), // Set the Accept-Language header
      })
      .pipe(map((user: any) => user));
  }

  confirmRegistration(token: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/api/public/signup/confirm-account`,
      { token: token },
    );
  }

  cancelRegistration(token: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiBaseUrl}/api/public/signup/cancel-registration`,
      { token: token },
    );
  }

  getConfirmationInfo(token: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}/api/public/signup/confirmation-info?token=${token}`,
    );
  }
  /****************************************************************************** */
  getUserById(id: any, accessToken?: string | null): Observable<any> {
    const token = accessToken ?? loggedInUser();
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/getById?id=${id}`, {
        headers: this.authorizationHeaders(token),
      })
      .pipe(map((user: any) => user));
  }

  getCurrentUser(): Observable<any> {
    return this.http
      .get<any>(`${this.apiBaseUrl}/api/private/me`, {
        headers: this.authorizationHeaders(loggedInUser()),
      })
      .pipe(map((user: any) => user));
  }

  private authorizationHeaders(token: unknown): HttpHeaders {
    let headers = new HttpHeaders().set('Accept-Language', this.lang);
    if (typeof token === 'string' && token.length > 0) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiBaseUrl}/api/public/signin`,
        { email, password },
        {
          headers: new HttpHeaders().set('Accept-Language', this.lang), // Set the Accept-Language header
        },
      )
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user) {
            // && user.token
            this.user = user;
            // store user details and jwt in session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        }),
      );
  }

  updateStatus(userId: any, status: any, adminId: any): Observable<User> {
    return this.http
      .post<User>(
        `${this.apiBaseUrl}/api/updateStatus`,
        {
          userId,
          status,
          adminId,
        },
        {
          headers: new HttpHeaders()
            .set(
              'Authorization',
              `Bearer ${this.route.snapshot.paramMap.get('token') || ''}`,
            )
            .set('Accept-Language', this.lang), // Set the Accept-Language header,
        },
      )
      .pipe(map((user: any) => user));
  }

  forgetPassword(email: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/forgetPassword`,
        { email },
        {
          headers: new HttpHeaders().set('Accept-Language', this.lang), // Set the Accept-Language header
        },
      )
      .pipe(map((data: any) => data));
  }

  updatePassword(
    token: string,
    password: String,
    confirmPassword: String,
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiBaseUrl}/api/updatePassword`,
        {
          token,
          password,
          confirmPassword,
        },
        {
          headers: new HttpHeaders().set('Accept-Language', this.lang), // Set the Accept-Language header
        },
      )
      .pipe(map((data: any) => data));
  }

  logout(): void {
    logOut();
    this.user = null;
  }
}
