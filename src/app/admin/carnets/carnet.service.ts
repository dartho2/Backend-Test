import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { Carnet } from "./carnet.model";


@Injectable({ providedIn: 'root' })
export class CarnetService {
    carnets: Carnet[] = [];
    constructor(private _http: HttpClient, private router: Router) { }

    getCarnet(): Observable<Carnet[]> {
        return this._http.get<Carnet[]>("https://karmazdrowia.pl:8080/api/carnets");
      }
      createCarnet(bodyCarnet) {
        return this._http.post<Carnet[]>("https://karmazdrowia.pl:8080/api/carnets", bodyCarnet);
      }
}