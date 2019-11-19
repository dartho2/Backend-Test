import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Injectable({ providedIn: 'root' })
export class PhotoAlbum {
    private photo: Photo[]= [];
    private photoUpdated = new Subject<Photo[]>();
    constructor(private _http: HttpClient, private cloudinary: Cloudinary) {
    }
   
    getPhotos() {
            return this._http.get<Photo[]>("https://karmazdrowia.pl:8080/api/images").subscribe(data => {
                this.photo = data;
console.log(data);
                this.photoUpdated.next(this.photo);
            })
        }
        getPhotoUpdatedListener() {
            return this.photoUpdated.asObservable();
        }
        // return this.http.get("https://karmazdrowia.pl:8080/api/images")
        //     .pipe(map((data: any) => data.resources));
    // }
}
