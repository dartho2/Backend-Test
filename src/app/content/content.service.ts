import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { ContentModel } from './content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
    private contents;
    private contentsUpdated = new Subject<ContentModel[]>();
    constructor(private _http: HttpClient) { }

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
 
}