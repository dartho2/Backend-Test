import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PhotoAlbum} from '../model/photo-album.service';
import {Photo} from '../model/photo';

@Component({
    selector: 'photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    photo: Photo[];
    private photoSub: Subscription;
    constructor(
        private photoAlbum: PhotoAlbum
    ) { }

    ngOnInit() {
        this.photoAlbum.getPhotos()
        this.photoSub = this.photoAlbum.getPhotoUpdatedListener()
      .subscribe((photos: Photo[]) => {
        this.photo = photos;
      });
    }

    copyInputMessage(inputElement){
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
      }

    onLoadImage(success) {
        console.log('On load', success);
    }
    onErrorImage(err) {
        console.log('On error!!', err);
    }
    ngOnDestroy() {
        this.photoSub.unsubscribe();
      }
}