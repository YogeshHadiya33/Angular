import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInRequest, SignInResponse } from '../models/signin.model';
import { SignUpRequest, SignUpResponse } from '../models/signup.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseUrl = 'https://localhost:7009';

  constructor(private http: HttpClient) { }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGN_IN_URL, request).pipe(
      catchError(this.handleError)
    );
  }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SIGN_UP_URL, request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.log(error);
    console.log(typeof(error.error));
    let errorMessage = 'An unknown error occurred!';
    if (typeof(error.error)==="string") {
      errorMessage = error.error;
    } 
    // else if (error.error instanceof ErrorEvent) {
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    return throwError(() => new Error(errorMessage));
  }
}