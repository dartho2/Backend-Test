import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['../content-create/content-create.component.css']
})
export class TextContentComponent implements OnInit {
  @Input() i: any; 
  @Input('group')
  
    public contentForm: FormGroup;
  ngOnInit() {
  }
  // get image() {
  //     return <FormArray>this.contentForm.get('image');
  //   }

}
