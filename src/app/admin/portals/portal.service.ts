import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Portal } from './portal.model';
import { Router } from "@angular/router";
declare var $: any;
declare var jQuery: any;

@Injectable({ providedIn: 'root' })
export class PortalService {
    private portals;
    private portalsUpdated = new Subject<Portal[]>();
    constructor(private _http: HttpClient, private router: Router) { }

    getPortals() {
        return this._http.get("https://karmazdrowia.pl:8080/api/portals")
            .subscribe(portalData => {
                this.portals = portalData;
                this.portalsUpdated.next([...this.portals]);
            });
    }

    getPortalsUpdatedListener() {
        return this.portalsUpdated.asObservable();
    }
    // getContent(id: string) {
    //     return this._http.get("https://karmazdrowia.pl:8080/api/portals/" + id);
    // }
    // updateContent(content: Portal) {
    //     return this._http.post("https://karmazdrowia.pl:8080/api/portals/" + content._id, content);
       
    
    // }
    // createContent(content: Portal) {
    //     return this._http.post("https://karmazdrowia.pl:8080/api/portals/", content);
       
    
    // }



}