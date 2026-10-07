import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  private readonly TIMEOUT = 5000; // Set the timeout duration in milliseconds
  private slowNetworkSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      this.detectSlowNetwork();
    }
  }

  private detectSlowNetwork() {
    if ("connection" in navigator) {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      connection.addEventListener("change", () => {
        this.checkNetworkSpeed(connection);
      });
      this.checkNetworkSpeed(connection);

      console.log(connection);
    }
  }

  private checkNetworkSpeed(connection: any) {
    const slowNetworkTypes = ["slow-2g", "2g"];

    if (
      slowNetworkTypes.includes(connection.effectiveType) ||
      connection.downlink < 1
    ) {
      this.slowNetworkSubject.next(true);
    } else {
      this.slowNetworkSubject.next(false);
    }
  }

  get slowNetwork$(): Observable<boolean> {
    return this.slowNetworkSubject.asObservable();
  }
}
