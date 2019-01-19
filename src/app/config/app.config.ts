import {InjectionToken} from "@angular/core";

export const APP_CONFIG = new InjectionToken("APP_CONFIG");

export interface AppConfig {

    appApiUrl: string;

    appBasicAuth: string;

    mapApiUrl: string;

}
