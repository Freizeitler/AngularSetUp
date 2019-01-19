import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./util/auth.guard";

// Define routes here
const routes: Routes = [
    //{ path: ":region/kundenportal", component: ClientPortalPageComponent, canActivate: [AuthGuard]},
    { path: "", component: LandingPageComponent },
    { path: "**", redirectTo: "/" }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes,
        )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
