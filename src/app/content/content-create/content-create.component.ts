import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {
  private mode = 'create';
  private contentId: string;
  constructor(public contenstService: ContentService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        console.log(this.contentId)
        this.contenstService.getContent(this.contentId).subscribe(postData => {
          // this.post = {
          //   id: postData._id,
          //   title: postData.title,
          //   content: postData.content,
          //   imagePath: postData.imagePath
          // };
          // this.form.setValue({
          //   title: this.post.title,
          //   content: this.post.content,
          //   image: this.post.imagePath
          // });
        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });
  }

}
