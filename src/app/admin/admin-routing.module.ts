import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin/admin.component';
import { ContentListComponent }  from './content/content-list/content-list.component';
import { ContentCreateComponent }  from './content/content-create/content-create.component';
import { AuthGuard }                from '../_guards/auth.guard';
import { ContentComponent } from './content/content/content.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: 'content', component: ContentListComponent },
          { path: 'content/edit/:contentId', component: ContentCreateComponent },
          { path: 'content/create', component: ContentCreateComponent },
          { path: 'contents/edit/:contentId', component:  ContentComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/