import { ActivatedRoute, Router } from "@angular/router";
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";

import { RegExpConstants } from "../../../constants/constants";
import { ApiService } from "../../../services/api.service";
import { Login, LoginSuccessful } from "./login.model";
import { LoginStateService } from "./login-state.service";
import { ColorService } from "../../../services/color.service";
import { Subscription } from "rxjs";

@Component({
    selector: "org-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit, OnDestroy {

    @Input() public loginData: any;
    @Input() public errorMessages: any;
    @Input() public brandingColor: any;
    @Input() public whitelabel: string;
    public isLoggedIn: boolean;
    public loginErrorText: string;
    public value: object;
    public returnUrl: string;

    // Form Group and Validators
    public loginFormGroup: FormGroup = new FormGroup({
        email: new FormControl("", [
            Validators.required,
            Validators.pattern(this.regExpConstants.EMAIL_REGEXP),
        ]),
        password: new FormControl("", [
            Validators.required,
        ]),
    });

    private login_: Subscription;

    constructor(
        public apiService: ApiService,
        public regExpConstants: RegExpConstants,
        private loginStateService: LoginStateService,
        private route: ActivatedRoute,
        private router: Router,
        public colorService: ColorService
    ) {
        this.login_ = this.loginStateService.login$.subscribe(login => {
            if (login) {
                this.isLoggedIn = login.isLoggedIn;
            }
        });
    }

    ngOnInit(): void {
        if (this.isLoggedIn) {
            this.loginStateService.removeLogin();
        }
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/" + this.whitelabel + "/kundenportal";
    }

    ngOnDestroy(): void {
        this.login_.unsubscribe();
    }

    onSubmit(): void {
        const params = new HttpParams().set("whitelabel", this.whitelabel);
        this.apiService.executePost("/login", this.loginFormGroup.value, params)
            .subscribe(
                (response: LoginSuccessful) => {
                    const login: Login = {
                        email: this.loginFormGroup.value,
                        isLoggedIn: true,
                        token: (response as LoginSuccessful).token,
                    };

                    this.loginStateService.saveLogin(login);
                    this.router.navigateByUrl(this.returnUrl);
                },
                (err: HttpErrorResponse)  => {
                    this.loginErrorText = err.statusText + ": " + err.error.reason;
                }
            );
    }
}
