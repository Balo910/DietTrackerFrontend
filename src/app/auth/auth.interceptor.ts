import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        let clonedReq = req;


        if (req.url.includes('/req/login') || 
            req.url.includes('/req/signup') || 
            req.url.includes('/api/food') || 
            req.url.includes('/api/fluid')) {
            return next.handle(clonedReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        localStorage.removeItem('token');
                        this.router.navigate(['/login']);
                    }
                    return throwError(() => error);
                })
            );
        }


        if (token) {
            clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(clonedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}