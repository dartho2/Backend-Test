import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Section } from '../sections/section.model';
import { PortalService } from '../portal.service';
import { Portal } from '../portal.model';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentComponent implements OnInit, OnDestroy, OnChanges {
  selectedId
  portals: Portal[];
  portal;
  sections;
  portalID;
  contentID;
  ContentToSection = false;
  sectionID;
  content;
  private portalsSub: Subscription;
  constructor(private route: ActivatedRoute, private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.getPortals();
    this.portalsSub = this.portalService.getPortalsUpdatedListener()
      .subscribe((portals: Portal[]) => {
        this.portals = portals;
      });
    this.route.parent.paramMap.subscribe(x => {
      this.portalID = x.get('sectionID')

    })

    this.route.paramMap.subscribe(x => {
      
      this.sectionID = x.get('contentID')
      this.contentID =false
      this.ContentToSection = false
      if (this.portals) {
        this.sections = this.portals.filter(x => x._id === this.portalID)

      }
    })
  }

  ngOnDestroy() {
    this.portalsSub.unsubscribe();
  }
  addContentToSection() {
    this.ContentToSection = true
    this.contentID = false
  }
  showData(id) {
    this.ContentToSection = false
    this.contentID = id
  }
  goDown(id) {
    let a;
    let c: string;
    this.portalService.getSection(this.sectionID).subscribe(x => {
      a = x
      var szukaIDsekcji = a.data.findIndex(x => x === id)
      if (a.data.length > szukaIDsekcji + 1) {
        c = a.data.splice(szukaIDsekcji, 1)
        a.data.splice(szukaIDsekcji + 1, 0, c[0])
        this.portalService.changePositionSections(this.sectionID, a)
      }
    })

  }

  goUp(id) {
    let a;
    let c: string;
    this.portalService.getSection(this.sectionID).subscribe(x => {
      a = x
      var szukaIDsekcji = a.data.findIndex(x => x === id)
      if (0 < szukaIDsekcji) {
        c = a.data.splice(szukaIDsekcji, 1)
        a.data.splice(szukaIDsekcji - 1, 0, c[0])
        this.portalService.changePositionSections(this.sectionID, a)
      }
    })

  }
  contentDelete(id){
    if(confirm("Are you sure to delete "+id)) {
      this.portalService.deleteContent(id)
    }
  }
  ngOnChanges(){
    console.log('zmiana')
  }
}
