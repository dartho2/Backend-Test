import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class CarnetService {
    constructor(private _http: HttpClient, private router: Router) { }

   

}