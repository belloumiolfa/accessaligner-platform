import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";
import { loggedInUser } from "../Helpers/utils";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = loggedInUser();
 
    if (currentUser) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["sign-in"], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
