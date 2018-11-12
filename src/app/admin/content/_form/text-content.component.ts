import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['../content-create/content-create.component.css']
})
export class TextContentComponent implements OnInit {
  @Input() i: any; 
  @Input('group')
  
    public contentForm: FormGroup;
    constructor(public _fb: FormBuilder) { }
  ngOnInit() {
  }
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
