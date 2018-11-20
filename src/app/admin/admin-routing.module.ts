import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentCreateComponent } from './content/content-create/content-create.component';
// import { AuthGuard } from '../_guards/auth.guard';
import { PortalListComponent } from './portals/portal-list/portal-list.component';
import { SectionListComponent } from './portals/sections/section-list/section-list.component';
import { ContentComponent } from './portals/content/content-list.component';
import {PhotoListComponent} from './images/photo-list/photo-list.component';
import {PhotoUploadComponent} from './images/photo-album/photo-upload.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'content', component: ContentListComponent },
          { path: 'content/edit/:contentId', component: ContentCreateComponent },
          { path: 'content/create', component: ContentCreateComponent },
          { path: 'content/:type', component: ContentListComponent },
             {
            path: 'portal', component: PortalListComponent, children: [
              { path: ':sectionID', component: SectionListComponent, children: [
                { path: ':contentID', component: ContentComponent }
              ]}
            ]
          }
        ]
      },
      {
        path: 'photos',
        component: PhotoListComponent
    },
    {
        path: 'photos/new',
        component: PhotoUploadComponent
    },
    {
        path: '',
        redirectTo: '/photos',
        pathMatch: 'full'
    }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/