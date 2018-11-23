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

  portals: Portal[];

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

  ngOnDestroy() {
    this.portalsSub.unsubscribe();
  }
}
