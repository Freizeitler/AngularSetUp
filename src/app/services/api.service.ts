import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "../config/app.config";

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private appConfig: AppConfig
    ) { }

    public executeGet<T = any>(endpoint: string, params?: HttpParams, baseUrl?: string): Observable<T> {
        const url = baseUrl ? baseUrl + endpoint : this.appConfig.appApiUrl + endpoint;
        const httpParams = params ? params : new HttpParams();
        return this.http.get<T>(url, {params: httpParams});
    }

    public executeGetBlob(endpoint: string, params?: HttpParams, baseUrl?: string): Observable<Blob> {
        const url = baseUrl ? baseUrl + endpoint : this.appConfig.appApiUrl + endpoint;
        const httpParams = params ? params : new HttpParams();
        return this.http.get(url, {params: httpParams, responseType: "blob"});
    }

    public executePut<T = any>(endpoint: string, body: any, params?: HttpParams, baseUrl?: string): Observable<T> {
        const url = baseUrl ? baseUrl + endpoint : this.appConfig.appApiUrl + endpoint;
        return this.http.put<T>(url, body, params ? {params: params} : {});
    }

    public executePatch<T = any>(endpoint: string, body: any, params?: HttpParams, baseUrl?: string): Observable<T> {
        const url = baseUrl ? baseUrl + endpoint : this.appConfig.appApiUrl + endpoint;
        return this.http.patch<T>(url, body, params ? {params: params} : {});
    }

    public executePost(endpoint: string, body: any, params?: HttpParams, baseUrl?: string): Observable<any> {
        const url = baseUrl ? baseUrl + endpoint : this.appConfig.appApiUrl + endpoint;
        return this.http.post(url, body, {
            params: params ? params : null,
            headers: { "Content-Type": "application/json", "Authorization": this.appConfig.appBasicAuth },
            withCredentials: true
        });
    }
}
