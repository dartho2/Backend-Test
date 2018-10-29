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
        return this._http.get<{_id: string; type:string; styles:{}, content:{}}>("https://karmazdrowia.pl:8080/api/content_items/" + id);
    }
    updateContent(id: string, type: string) {
        console.log('id',id)
        let contentData: Content | FormData;
        if (id === '0') {
            contentData = new FormData();
            contentData.append("id", id);
        } else {
             contentData = { id: id, type: type, styles:{},content:{}}
        }
        // let x = {
        //     "_id": "5bb7858c5aece30013308102",
        //     "type": "text_and_image",
        //     "styles": {
        //     "float": "unset",
        //     "text_type": "block_box",
        //     "list_type": "normal"
        //     },
        //     "content": [
        //     {
        //     "title": "P-DTR",
        //     "lead": "",
        //     "text": "Uwalnianie od bólu, regulacja pracy mięśni i stawów, wygaszanie napięć fizycznych i psychosomatycznych w przestymulowanym układzie nerwowym za pomocą proprioceptywnej terapii odruchowej – innowacyjne metody pracy z układem nerwowym. Dla dorosłych i dzieci.",
        //     "reference": "/pdtr/method",
        //     "decriptions": "czytaj więcej..."
        //     }
        //     ],
        //     "created_at": "2018-10-05T15:38:52.669Z",
        //     "updated_at": "2018-10-29T23:04:42.734Z"
        //     }
        console.log('c', id)
        this._http.post("https://karmazdrowia.pl:8080/api/content_items/"+ id, contentData)
        
        .subscribe(response => {
            this.router.navigate(["/"]);

        });
    }
   
 
}