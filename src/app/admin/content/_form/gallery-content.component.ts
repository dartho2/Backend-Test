import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';


@Component({
  selector: 'gallery-content',
  templateUrl: './gallery-content.component.html'
})
export class GalleryContentomponent implements OnInit {
  @Input() i: any;
  @Input('group')

  public contentForm: FormGroup;
  ngOnInit() { }

}

