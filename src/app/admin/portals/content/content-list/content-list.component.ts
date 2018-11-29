import { Component, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Section } from '../../sections/section.model';
import { PortalService } from '../../portal.service';
import { Portal } from '../../portal.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentComponent implements OnInit {
  
  selectedId
  portals: Portal[];
  portal;
  sections;
  portalID;
  contentID;
  dragAndDrop;
  ContentToSection = false;
  sectionID;
  content;
 
  cdkDrag;
  contentChangePosition = null;
  private portalsSub: Subscription;
  constructor(private route: ActivatedRoute, private portalService: PortalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.contentChangePosition = null;
      this.sectionID = param.get('contentID')
      this.portalService.getSection(this.sectionID).subscribe(response => {
        this.content = response
        this.dragAndDrop = this.content
      })
    })

  }
  drop(event: CdkDragDrop<any[]>) {
      moveItemInArray(this.dragAndDrop.data, event.previousIndex, event.currentIndex);
    this.contentChangePosition = this.dragAndDrop.data
  }
 
  addContentToSection() {
    this.ContentToSection = true
    this.contentID = false
  }
  showData(id) {
    this.ContentToSection = false
    this.contentID = id
  }
  saveContentPosition(){
    this.portalService.changePositionSections(this.sectionID, this.dragAndDrop)
    this.contentChangePosition = null;
  }
 
  contentDelete(id){
    if(confirm("Are you sure to delete "+id)) {
      this.portalService.deleteContent(id).subscribe(() => {
        this.portalService.getSection(this.sectionID).subscribe(response => {
          this.content = response
        })
    })
    }
  }
}
