import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
image
    constructor(
        private photoAlbum: PhotoAlbum
    ) { }

    ngOnInit(): void {
        this.photos = this.photoAlbum.getPhotos();
        this.image = this.photoAlbum.getImage();
    }

    // return https://915629246747733:EMNYQ5vwrLxDNVHBPAUe3Vh3cF8@api.cloudinary.com/v1_1/duvsjgmt5/resources/image
    changePublicId() {
        this.publicId = (this.publicId === 'angular_sample/iakcidxsofuizrox83u4') ? 'billclinton' : 'angular_sample/iakcidxsofuizrox83u4';
    }

    onLoadImage(success) {
        console.log('On load', success);
    }
    onErrorImage(err) {
        console.log('On error!!', err);
    }
}