import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CommonService {

    // Handle errors
    public handleError(error: any): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (typeof (error.error) === "string") {
            errorMessage = error.error;
        }
        return throwError(() => new Error(errorMessage));
    }

}