import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PhotoAlbum} from '../model/photo-album.service';
import {Photo} from '../model/photo';

@Component({
    selector: 'photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    private photos: Observable<Photo[]>;
    private publicId: string = 'angular_sample/iakcidxsofuizrox83u4';

    constructor(private _http: HttpClient,
        private photoAlbum: PhotoAlbum
    ) { }

    ngOnInit() {

    }

   
   

}