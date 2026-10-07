import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  observableHandling: any;
  user$!: any;

  constructor() {}

  getDecodedAccessToken(token: any): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  isAdmin(user: any) {
    for (let index = 0; index < user.roleList?.length; index++) {
      const element = user.roleList[index];
      if (element.name === "ADMIN") {
        return true;
      }
    }
    return false;
  }

  isSuperAdmin(user: any) {
    // check this
    for (let index = 0; index < user.roleList?.length; index++) {
      const element = user.roleList[index];
      if (element.name === "SUPER_ADMIN") {
        return true;
      }
    }
    return false;
  }

  isDoctor(user: any) {
    for (let index = 0; index < user.roleList?.length; index++) {
      const element = user.roleList[index];
      if (element.name === "DENTIST") {
        return true;
      }
    }
    return false;
  }

  getToken() {
    return this.getDecodedAccessToken(localStorage.getItem("access_token"));
  }

  getExpiration() {
    return this.observableHandling.interval(
      new Date(this.getToken()?.expirDate).valueOf() - new Date().valueOf()
    );
  }
}
