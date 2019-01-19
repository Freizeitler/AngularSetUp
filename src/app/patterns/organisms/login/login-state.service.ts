import { BehaviorSubject } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { WindowRef } from "../../../util/window-ref";

import { Login } from "./login.model";

@Injectable()
export class LoginStateService {

  public login$: BehaviorSubject<Login>;

  private loggedOut: Login = {
    isLoggedIn: false
  };

  // check if running im browser
  private storage: any;
  private storageKeys = {
    login: "login"
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private winRef: WindowRef
  ) {
    this.storage = isPlatformBrowser(this.platformId) && this.winRef.nativeWindow ? this.winRef.nativeWindow.localStorage : undefined;
    this.login$ = new BehaviorSubject(this.loggedOut);
    const login = this.getSavedLogin();
    if (login) {
      this.login$.next(login);
    }
  }

  removeLogin(): void {
    this.login$.next(this.loggedOut);
    if (this.storage) {
      try {
        this.storage.removeItem(this.storageKeys.login);
      } catch (error) {
        console.warn("Could not write in session storage");
      }
    }
  }

  saveLogin(login: Login): void {
    this.login$.next(login);
    if (this.storage) {
      try {
        this.storage[this.storageKeys.login] = JSON.stringify(login);
      } catch (error) {
        console.warn("Could not write in session storage");
      }
    }
  }

  private getSavedLogin(): Login {
    if (this.storage) {
      const saved = this.storage[this.storageKeys.login];

      return saved ? JSON.parse(saved) : this.loggedOut;
    } else {
      console.warn("No session storage available");

      return this.loggedOut;
    }
  }

}
