import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { LocalStorageService } from "../../business_logic/services/localstorage.service";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../shared/constants";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private localStorageService: LocalStorageService,
        private router: Router) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuth();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuth();
    }

    private checkAuth(): boolean {
        if (this.isAuthenticated()) {
            return true;
        } else {
            // Redirect to the login page if the user is not authenticated
            this.router.navigate(['auth/sign-in']);
            return false;
        }
    }

    private isAuthenticated(): boolean {
        return this.localStorageService.getItem(TOKEN_LOCAL_STORAGE_KEY) !== null;
    }
}