import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

import { PortalService } from '../../portal.service';
import { Portal } from '../../portal.model';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit, OnDestroy {

  portals: Portal[];
  portal;
  private portalsSub: Subscription;
  constructor(private route: ActivatedRoute, private portalService: PortalService) { }

  ngOnInit() {
    this.portalService.getPortals();
    this.portalsSub = this.portalService.getPortalsUpdatedListener()
      .subscribe((portals: Portal[]) => {
        this.portals = portals;
      });
    this.route.paramMap.subscribe(params => {
      this.portal = params.get('sectionID')
    
    })
  }
 
  ngOnDestroy() {
    this.portalsSub.unsubscribe();
  }
  goUp(id) {
    let a;
    let c: string;
    this.portalService.getPortal(this.portal).subscribe(x => {
      a = x
      var szukaIDsekcji = a.sections.findIndex(x => x === id)
      if(a.sections.length > szukaIDsekcji+1){
      c = a.sections.splice(szukaIDsekcji, 1)
      a.sections.splice(szukaIDsekcji + 1, 0, c[0])
      this.portalService.changePosition(this.portal, a)}
    })

  }
  goDown(id) {
    let a;
    let c: string;
    this.portalService.getPortal(this.portal).subscribe(x => {
      a = x     
      var szukaIDsekcji = a.sections.findIndex(x => x === id)
      if(0 < szukaIDsekcji){
      c = a.sections.splice(szukaIDsekcji, 1)
      a.sections.splice(szukaIDsekcji - 1, 0, c[0])
      this.portalService.changePosition(this.portal, a)}
    })
  }
}
