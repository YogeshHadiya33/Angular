import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { LocalStorageService } from "./localstorage.service";
import { TOKEN_LOCAL_STORAGE_KEY, USER_DETAILS_LOCAL_STORAGE_KEY } from "../../shared/constants";

@Injectable({ providedIn: 'root' })

export class CommonService {

    constructor(private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    // Handle errors
    public handleError(error: any): Observable<never> {
        let errorMessage = 'An unknown error occurred!'; 
        if (typeof (error.error) === "string") {
            errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
    }

   public logout():void {
        this.localStorageService.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        this.localStorageService.removeItem(USER_DETAILS_LOCAL_STORAGE_KEY);
        this.router.navigate(['/auth/sign-in']);
    }

}