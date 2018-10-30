import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(user: string, password: string) {
        return this.http.post<any>(`https://karmazdrowia.pl:8080/api/auth/login`, { user, password })
            .pipe(map(token => {
                console.log(token)
                // add user && user.token
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify(token));
                }
                return token;
            }));
    }

    logout() {
        console.log("logout")
        localStorage.removeItem('currentUser');
    }
}