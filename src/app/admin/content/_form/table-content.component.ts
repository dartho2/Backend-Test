import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';


@Component({
  selector: 'table-content',
  templateUrl: './table-content.component.html'
})
export class TableContentomponent implements OnInit {
  @Input() i: any;
  @Input('group')

  public contentForm: FormGroup;
  ngOnInit() { }

}

