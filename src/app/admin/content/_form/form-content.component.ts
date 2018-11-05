import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';

@Component({
  selector: 'form-content',
  templateUrl: './form-content.component.html'
})
export class FormContentComponent implements OnInit {
  @Input() i: any; 
  @Input('group')
  
  // @Input('group1')
    public contentForm: FormGroup;
  ngOnInit() {
  }
  get image() {
      return <FormArray>this.contentForm.get('image');
    }
}
