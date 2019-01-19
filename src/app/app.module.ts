// import Angular related stuff here
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LOCALE_ID, NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { APP_CONFIG } from "./config/app.config";
import { environment } from "../environments/environment";

// import all patterns here
import { AuthGuard } from "./util/auth.guard";
import { LoginStateService } from "./patterns/organisms/login/login-state.service";
import { TokenInterceptor } from "./util/token-interceptor";
import { WindowRef } from "./util/window-ref";

// Third party


registerLocaleData(localeDe, "de");
@NgModule({
    declarations: [

    ],
    imports: [
        BrowserModule.withServerTransition({appId: "strombewegung"}),
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        TransferHttpCacheModule,
    ],
    providers: [
        AuthGuard,
        LoginStateService,
        Title,
        WindowRef,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: "de"
        },
        {
            provide: APP_CONFIG,
            useValue: environment.config,
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
