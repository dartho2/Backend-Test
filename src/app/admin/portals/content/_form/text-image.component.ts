import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ConfigForm } from './config'

@Component({
  selector: 'text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['../content-create/content-create.component.css']
})
export class TextImageContentComponent implements OnInit {
  @Input() i: any; 
  @Input('group')
  
    public contentForm: FormGroup;
    constructor(public _fb: FormBuilder) { }
  ngOnInit() {
  }
  public config = ConfigForm
  // get image() {
  //     return <FormArray>this.contentForm.get('image');
  //   }
  addItems(control, index) {
    control.insert(index + 1, this._fb.control(''))

}
removeItems(control, index) {
  if(index !== 0){
      control.removeAt(index)
    }

}
}
