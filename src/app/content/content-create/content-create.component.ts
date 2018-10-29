import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {
  private mode = 'create';
  content: Content;
  form: FormGroup;
  private contentId: string;
  constructor(
    public contenstService: ContentService, 
    private _fb: FormBuilder,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this._fb.group({
      id: '',
      type: '',
      styles: {},
      content: {}
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe(content => {
          // console.log(postData)
          // this.content = res
          this.content= {
            id: content._id,
            type: content.type,
            styles: {},
            content: {}
          };
          this.form.setValue({
            id: content._id,
            type: content.type,
            styles: {}
          });
        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });
    
  }
onAddContent() {
  if (this.mode === "edit") {
    this.contenstService.updateContent(
      this.contentId,
      this.content.type
    );
  }
  this.form.reset();

}

}
