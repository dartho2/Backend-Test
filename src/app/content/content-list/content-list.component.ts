import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContentModel } from '../content.model';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit, OnDestroy {
  contents: ContentModel[];
  private contentsSub: Subscription;
  
  constructor(public contentsService: ContentService ) {}

  ngOnInit() {
    this.contentsService.getContents();
    this.contentsSub = this.contentsService.getContentUpdatedListener()
    .subscribe((contents: ContentModel[]) => {
      this.contents = contents;

  });
  }
  ngOnDestroy() {
    this.contentsSub.unsubscribe();
  }

}
