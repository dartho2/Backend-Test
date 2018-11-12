import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Portal } from '../portal.model';
import { PortalService } from '../portal.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styleUrls: ['./portal-list.component.css']
})
export class PortalListComponent implements OnInit, OnDestroy {
  modeType;
  title = '';
  portals: Portal[];
  sections;
  contentData;
  sectionID;
  dataId;
  ContentToSection;
  portalName;
  sectionName;
  contents;
  private portalsSub: Subscription;

  constructor(public portalService: PortalService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.portalService.getPortals();
    this.portalsSub = this.portalService.getPortalsUpdatedListener()
      .subscribe((portals: Portal[]) => {
        console.log(portals, "portals")
        this.portals = portals;
        // this.route.paramMap.subscribe((paramMap: ParamMap) => {
          // if (paramMap.has("type")) {
          //   console.log(portals)
          //   this.title = this.modeType = paramMap.get("type")
          // this.contents = contents.filter(type => type.type === this.modeType)
          // this.contents = contents.filter(type => type.tags.includes(this.modeType))
          // console.log(this.contents)
          // console.log(this.contentArray)
          //  this.contents(this.contentArray)    
          // }else{
          // this.contents = contents;
          // }})

        // })
      });

  }

  showSections(portals){
       this.ContentToSection = false;
        this.portalName = portals.name
        this.sectionName = null;
        this.sections = portals.sections
  }
  showContent(sections){
    this.ContentToSection = false;
    this.sectionID = sections._id
    this.sectionName = sections.name
    this.contents = sections.data
    // this.contents.map(x => {
    //   console.log(x._id, ' <=> ', this.sectionID)
    // })
    
  }
  showData(id) {
    this.ContentToSection = false;
    this.dataId = id
  }
  addContentToSection() {
    this.ContentToSection = true
  }
  ngOnDestroy() {
    this.portalsSub.unsubscribe();
  }

}
