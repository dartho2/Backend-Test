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
        return this._http.get<{_id: string; type: string; styles: {float:string ,list_type: string, text_type:string}, content:{title:string; text: string; image: string;lead: string,signature: string;button: string;data: string}}>("https://karmazdrowia.pl:8080/api/content_items/" + id);
    }
    // updateContent(id: string, type: string,  title:string, text: string, image: string, lead: string,float:string ,list_type: string, text_type:string, signature: string,button: string,data: string) {
        // console.log('id',id)
        // let contentData: Content | FormData;
        // if (id === '0') {
        //     contentData = new FormData();
        //     contentData.append("id", id);
        // } else {
        //      contentData = { id: id, type: type, styles: {float: float, list_type: list_type, text_type: text_type},content:{ title: title, text: text, image: image, lead: lead ,signature: signature,button:button,data:data}}
        // }
        // console.log(contentData)
        // this._http.post("https://karmazdrowia.pl:8080/api/content_items/"+ id, contentData)
        
        // .subscribe(response => {
        //     this.router.navigate(["/"]);

        // });
        updateContent(content: Content) {
            console.log('update=>',content)
            console.log('update=>',content._id)
            this._http.post("https://karmazdrowia.pl:8080/api/content_items/"+ content._id, content).subscribe(response => {
                    this.router.navigate(["/"]);
                });
                }
   
 
}