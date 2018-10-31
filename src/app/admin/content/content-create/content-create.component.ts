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
  message;
  form: FormGroup;
  private contentId: string;
  constructor(
    public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this._fb.group({
      _id: '',
      type: '',
      styles: {
        float: '',
        text_type: '',
        list_type: ''
      },
      content: this._fb.group({
        title: '',
        text: '',
        image: '',
        lead: '',
        signature: '',
        button: '',
        data: '',
        reference: '',
        decriptions: ''
      }),
      created_at: '',
      updated_at: ''
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe((res: Content) => {
          this.content = res;
          this.form.patchValue(this.content);
        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });

  }
  onAddContent() {
    if (this.mode === "edit") {
      this.contenstService.updateContent(this.form.value).subscribe(response => {
      this.message = response;
    });

      
    
    }
    // this.form.reset();

  }

}
