import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContentModel } from '../content.model';

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {
  private mode = 'create';
  content: any[] = [];
  form: FormGroup;
  private contentId: string;
  constructor(public contenstService: ContentService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(),
      text: new FormControl(), 
      lead: new FormControl(),
      title: new FormControl(),
      image: new FormControl(),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe((res: any) => {
          // console.log(postData)
          this.content = res
          // this.content= {
          //   id: postData._id,
          //   text: postData.content.text
          // };
          this.form.setValue({
            id: res._id,
            text: res.content.text,
            lead: res.content.lead,
            title: res.content.title,
            image: res.content.image
          });
        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });
    
  }
onAddPost() {}

}
