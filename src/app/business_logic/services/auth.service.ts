import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInRequest, SignInResponse } from '../models/signin.model';
import { SignUpRequest, SignUpResponse } from '../models/signup.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../shared/constants';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
    private commonService: CommonService
  ) { }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGN_IN_URL, request).pipe(
      catchError(this.commonService.handleError)
    );
  }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SIGN_UP_URL, request).pipe(
      catchError(this.commonService.handleError)
    );
  }
}