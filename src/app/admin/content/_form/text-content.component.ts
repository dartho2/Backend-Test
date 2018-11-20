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
public config: Object = {
  end_with_newline: true,
  language: 'pl',
  indent_inner_html: true,
  extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
  brace_style: 'expand',
  indent_char: '\t',
  indent_size: 1,
  wrap_line_length: 0
}
removeItems(control, index) {
  if(index !== 0){
      control.removeAt(index)
    }

}
}
