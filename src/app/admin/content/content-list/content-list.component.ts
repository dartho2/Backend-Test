import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Content } from '../content.model';
import { ContentService } from '../content.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit, OnDestroy {
  modeType;
  contents: Content[];
  private contentsSub: Subscription;
  
  constructor(public contentsService: ContentService,
    public route: ActivatedRoute ) {}

  ngOnInit() {
    this.contentsService.getContents();
    this.contentsSub = this.contentsService.getContentUpdatedListener()
    .subscribe((contents: Content[]) => {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("type")) {
          console.log(contents)
          this.modeType = paramMap.get("type")
          // this.contents = contents.filter(type => type.type === this.modeType)
          this.contents = contents.filter(type => type.tags.includes(this.modeType))
          console.log(this.contents)
          // console.log(this.contentArray)
          //  this.contents(this.contentArray)    
        }else{
          this.contents = contents;
        }})
      
  });
  

  }
  ngOnDestroy() {
    this.contentsSub.unsubscribe();
  }

}
