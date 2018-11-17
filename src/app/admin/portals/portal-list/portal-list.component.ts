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
  portalId;
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
        this.portals = portals;
      });

  }

  showSections(portals, id){
       this.ContentToSection = false;
        this.portalName = portals.name
        this.portalId = id;
        this.sectionName = null;
        this.sections = portals.sections
  }
  showContent(sections){
    this.ContentToSection = false;
    this.sectionID = sections._id
    this.sectionName = sections.name
    this.contents = sections.data
    
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

  // goUp(id){
  //   console.log('id',id)
  //   let a;
  //   var arrID = this.sections.findIndex(x => x._id === id)
  //       let c: string;  
  //  this.portalService.getPortal(this.portalId).subscribe(x=> {

  //     a = x
  //     console.log('beffore', a)
  //     c = a.sections.splice(arrID, 1)
  //     a.sections.splice(arrID+1, 0, c[0])
  //     console.log('after', a)
  //     this.portalService.changePosition(this.portalId, a)
  //  })
  //  this.portalsSub = this.portalService.getPortalsUpdatedListener()
  //  .subscribe((portals: Portal[]) => {
  //    let c  = portals;
  //    console.log('c',c)
  //  });
    //    a = x
    //   var c: string;    
    //    var arrID = a.sections.findIndex(x => x === id)
    //    c = a.sections.splice(arrID, 1)
    //    a.sections.splice(arrID+1, 0, c[0])
    //   this.portalService.changePosition(this.selectedId, a)
   
  
    //   console.log('arr',a)
    //   console.log(this.portals)
    //   console.log(this.selectedId)
    // }

}
