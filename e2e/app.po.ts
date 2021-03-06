import { browser, by, element, promise } from "protractor";

export class AppPage {
  navigateTo(): promise.Promise<any> {
    return browser.get("/");
  }

  getParagraphText(): promise.Promise<any> {
    return element(by.css("app-root h1")).getText();
  }
}
