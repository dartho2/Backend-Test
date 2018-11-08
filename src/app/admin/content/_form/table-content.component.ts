import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ContentCreateComponent} from '../content-create/content-create.component'
import { isObject } from 'util';


@Component({
  selector: 'table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['../content-create/content-create.component.css']
})
export class TableContentomponent implements OnInit {
  @Input() i: any;
  @Input('group')

  public contentForm: FormGroup;
  constructor(public contentCreate: ContentCreateComponent,
  public _fb: FormBuilder){}
  ngOnInit() { }
  
  getDataType(data) {
    if (!data) {
      return 'string';
    } else if (Array.isArray(data)) {
      return 'array'
    } else if (isObject(data)) {
      return 'object'
    } else {
      return 'string'
    }
  }
  addRowTable(control) {
    console.log(control)
    control.push(
      this._fb.array([''])
    )
  }
  removeCellTable(control, indextd, indextr) {
    if (indextd !== 0) {
      control.at(indextr).removeAt(indextd)
    } else {
      this.removeRowTable(control, indextr)
    }
  }
  removeRowTable(control, index) {
    control.removeAt(index)
  }
  addSubCellTable(control, indexX, indexY, value) {
    control.at(indexY).removeAt(indexX)
    control.at(indexY).insert(indexX, this._fb.array([value, ""]))
  }
  addCellTable(control, indextd, indextr) {
    control.at(indextr).insert(indextd + 1,
      this._fb.control(null)
    )
  }
  addRowSchedule(control) {
    console.log(control)
  }
  addHeader(control, index){
    control.insert(index+1,this._fb.control(''))

  }

}


