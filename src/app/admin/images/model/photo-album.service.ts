import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-5.x';


@Injectable()
export class PhotoAlbum {
    private portalsUpdated = new Subject<Photo[]>();
    constructor(private http: HttpClient, private cloudinary: Cloudinary) {
    }


}