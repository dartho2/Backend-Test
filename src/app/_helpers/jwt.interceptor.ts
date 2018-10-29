import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('curent', currentUser)
        if (currentUser) {
            console.log('a')
            request = request.clone({
                setHeaders: { 
                    'Content-Type': 'application/json',
                    token: `${currentUser}`
                }
            });
        }

        return next.handle(request);
    }
}