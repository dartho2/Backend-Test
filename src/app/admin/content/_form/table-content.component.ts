import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ContentCreateComponent} from '../content-create/content-create.component'


@Component({
  selector: 'table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['../content-create/content-create.component.css']
})
export class TableContentomponent implements OnInit {
  @Input() i: any;
  @Input('group')

  public contentForm: FormGroup;
  constructor(public contentCreate: ContentCreateComponent){}
  ngOnInit() { }
  
  getDataType(data) {
    if (!data) {
      return 'string';
    } else if (Array.isArray(data)) {
      return 'array'
    } else if (!Array.isArray(data)) {
      return 'string'
    } else {
      return 'string'
    }
  }
}


