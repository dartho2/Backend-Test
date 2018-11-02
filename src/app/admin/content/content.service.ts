import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Content } from './content.model';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ContentService {
    private contents;
    private contentsUpdated = new Subject<Content[]>();
    constructor(private _http: HttpClient, private router: Router) { }

    getContents() {
        return this._http.get("https://karmazdrowia.pl:8080/api/content_items")
            .subscribe(contentData => {
                this.contents = contentData;
                this.contentsUpdated.next([...this.contents]);
            });
    }

    getContentUpdatedListener() {
        return this.contentsUpdated.asObservable();
    }
    getContent(id: string) {
        return this._http.get("https://karmazdrowia.pl:8080/api/content_items/" + id);
    }
    updateContent(content: Content) {
        return this._http.post("https://karmazdrowia.pl:8080/api/content_items/" + content._id, content);
       
    
    }
    createContent(content: Content) {
        return this._http.post("https://karmazdrowia.pl:8080/api/content_items/", content);
       
    
    }


}