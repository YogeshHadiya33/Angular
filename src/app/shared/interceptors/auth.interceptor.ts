import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { TOKEN_LOCAL_STORAGE_KEY } from '../constants';
import { CommonService } from '../../business_logic/services/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private commonService: CommonService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Exclude AuthService requests
        if (req.url.includes('/auth')) {
            return next.handle(req);
        }

        const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return this.handleApiCall(cloned, next);
        } else {
            return this.handleApiCall(req, next);
        }
    }

    private handleApiCall(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(catchError((error) => {
            //add 401 status code check
            if (!request.url.includes('/auth') && error.status === 401) {
                this.commonService.logout();
            }

            return this.commonService.handleError(error);
        }));
    }
}