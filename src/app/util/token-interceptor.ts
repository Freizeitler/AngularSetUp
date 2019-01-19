import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LoginStateService } from "./../patterns/organisms/login/login-state.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private token: string;

    constructor(
        private loginStateService: LoginStateService
    ) {
        this.loginStateService.login$.subscribe(user => {
            if (user) {
                this.token = user.token;
            }
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        return next.handle(request);
    }
}
