import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ContentCreateComponent } from '../content-create/content-create.component';


@Component({
  selector: 'gallery-content',
  templateUrl: './gallery-content.component.html'
})
export class GalleryContentomponent implements OnInit {
  @Input() i: any;
  @Input('group')

  public contentForm: FormGroup;
  constructor(public contentCreate: ContentCreateComponent,
    public _fb: FormBuilder) { }
    
  ngOnInit() { }
  
  addVideo(index) {
    console.log(index);
    let formControl = (<FormArray>this.contentCreate.bodyForm.controls['content']).at(index);
    console.log("at ", formControl);
    ( < FormArray > formControl.get('videos')).push(this._fb.group({
      url: '',
      title: '',
      description: ''
    }));
  }
    removeVideo(index:number, indexGroup: number ) {
      if( indexGroup !== 0 ){
      let formControl = (<FormArray>this.contentCreate.bodyForm.controls['content']).at(index);
      ( < FormArray > formControl.get('videos')).removeAt(indexGroup)}
  }
  addImage(index) {
    console.log(index);
    let formControl = (<FormArray>this.contentCreate.bodyForm.controls['content']).at(index);
    console.log("at ", formControl);
    ( < FormArray > formControl.get('image')).push(this._fb.group({
      url: '',
      title: '',
      description: ''
    }));
  }
    removeImage(index:number, indexGroup: number ) {
      if( indexGroup !== 0 ){
      let formControl = (<FormArray>this.contentCreate.bodyForm.controls['content']).at(index);
      ( < FormArray > formControl.get('image')).removeAt(indexGroup)}
  }
}

