import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PortalService } from '../../portal.service';
import { Portal } from '../../portal.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Section } from '../../section.model';
@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit, OnDestroy {

  portals: Portal[];
  portal;
  sections;
  private portalsSub: Subscription;
  constructor(private route: ActivatedRoute, private portalService: PortalService) { }

  ngOnInit() {
    // Do Usuniecia
    // this.portalService.getPortals();
    // this.portalsSub = this.portalService.getPortalsUpdatedListener()
    //   .subscribe((portals: Portal[]) => {
    //     this.portals = portals;
    //   });
    // koniec

    this.route.paramMap.subscribe(params => {
      this.portal = params.get('sectionID')
      this.sections = this.portalService.getPortal(this.portal).subscribe(responsive => {
        this.sections = responsive
      })

    })
  }
  drop(event: CdkDragDrop<Portal[]>) {
    moveItemInArray(this.sections.sections, event.previousIndex, event.currentIndex);
    // console.log(this.sections, this.portal)
    // this.portalService.changePosition(this.portal, this.sections)
  }

  ngOnDestroy() {
    console.log('dd')
    // this.portalsSub.unsubscribe();
  }
}
