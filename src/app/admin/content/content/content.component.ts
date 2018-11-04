import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
 mode;
 contentId;
 contentForm;
 bodyForm: FormGroup;
  constructor(public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) {
      this.initComp()
      // this.buildForm()
     }

    
  ngOnInit() {
    console.log(this.contentForm)
    this.buildForm()
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("contentId")) {
    //     this.mode = "edit";
    //     this.contentId = paramMap.get("contentId");
    //     this.contenstService.getContent(this.contentId).subscribe(res => {
    //       this.contentForm = res;
    //       console.log(this.contentForm)
          
    //       this.bodyForm.patchValue(this.contentForm);
    //     });
    //   } else {
    //   }
    // });

}
initComp(){
  console.log('init',this.contentForm)
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has("contentId")) {
      this.mode = "edit";
      this.contentId = paramMap.get("contentId");
      this.contenstService.getContent(this.contentId).subscribe(res => {
        this.contentForm = res;
        console.log(this.contentForm)
        
        this.bodyForm.patchValue(this.contentForm);
      });
    } else {
    }
  });
}
buildForm(){
this.bodyForm = this._fb.group({
  type: '',
  styles: this._fb.group({
    text_type: ''
  })
})
}
}
