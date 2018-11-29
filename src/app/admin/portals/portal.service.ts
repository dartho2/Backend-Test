import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Portal, Section } from './portal.model';
import { Router } from "@angular/router";
declare var $: any;
declare var jQuery: any;

@Injectable({ providedIn: 'root' })
export class PortalService {
    private portals: Portal[] = [];
    private sections: Section[] = [];
    private portalsUpdated = new Subject<Portal[]>();
    constructor(private _http: HttpClient, private router: Router) { }

    getPortals() {
        return this._http.get<Portal[]>("https://karmazdrowia.pl:8080/api/portals")
            .subscribe(portalData => {
                this.portals = portalData;
                this.portalsUpdated.next([...this.portals]);
            });
    }
    getPortal(id) {
        return this._http.get("https://karmazdrowia.pl:8080/api/portals/" + id)
    }
    changePosition(id, content) {
        return this._http.post("https://karmazdrowia.pl:8080/api/portals/" + id, content).subscribe(portalData => {
            // this.portals = content;
            // this.portals.push(content);
            // console.log(portalData)
            // this.portalsUpdated.next([...this.portals]);
        });
    }
    getPortalsUpdatedListener() {
        return this.portalsUpdated.asObservable();
    }

    getSection(id) {
        return this._http.get("https://karmazdrowia.pl:8080/api/sections/" + id)
    }
    changePositionSections(id, content) {
        return this._http.post<Section[]>("https://karmazdrowia.pl:8080/api/sections/" + id, content).subscribe(portalData => {
            this.sections = portalData;
            // this.getPortals()
        });
    }
    deleteContent(id) {
        return this._http.delete<Portal[]>("https://karmazdrowia.pl:8080/api/content_items/" + id)
    }

}