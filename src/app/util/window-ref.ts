import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class WindowRef {
    private isBrowser;

    constructor(@Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    get nativeWindow(): any {
        return this._window();
    }

    _window(): any {
        // return the global native browser window object
        return this.isBrowser ? window : undefined;
    }
}
