import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-component",
    templateUrl: "./app.component.html"
})

export class AppComponent implements OnInit, OnDestroy {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private router: Router,
    ) { }

}
