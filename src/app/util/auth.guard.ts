import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

import { Login } from "./../patterns/organisms/login/login.model";
import { LoginStateService } from "./../patterns/organisms/login/login-state.service";

@Injectable()
export class AuthGuard implements CanActivate {

  login: Login;

  constructor(
    private router: Router,
    private loginStateService: LoginStateService
  ) {
    this.loginStateService.login$.subscribe(login => {
      this.login = login;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.login && this.login.isLoggedIn) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
