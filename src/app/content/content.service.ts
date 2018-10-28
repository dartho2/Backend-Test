import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { ContentModel } from './content.model';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ContentService {
    private contents;
    private contentsUpdated = new Subject<ContentModel[]>();
    constructor(private _http: HttpClient, private router: Router) { }

    getContents() {
        return this._http.get("https://yoga-server.herokuapp.com/api/content_items")
            .subscribe(contentData => {
                this.contents = contentData;
                this.contentsUpdated.next([...this.contents]);
            });
    }

    getContentUpdatedListener() {
        return this.contentsUpdated.asObservable();
    }
    getContent(id: string) {
        return this._http.get<{_id: string; text:string;}>("https://yoga-server.herokuapp.com/api/content_items/" + id);
    }
    updateContent(id: string, title: string, text: string, lead: string) {
        let contentData: ContentModel | FormData;
        if (id) {
            contentData = new FormData();
            contentData.append("id", id);
            contentData.append("title", title);       
            contentData.append("text", text);
            contentData.append("lead", lead);
        } else {
            const contentData = { id: id, title: title, text: text, lead: lead}
        }
        
        this._http.post("https://yoga-server.herokuapp.com/api/content_items/"+ id, contentData)
        .subscribe(response => {
            this.router.navigate(["/"]);

        });
    }
   
 
}