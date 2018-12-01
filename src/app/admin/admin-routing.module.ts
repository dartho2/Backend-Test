import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ContentCreateComponent } from './portals/content/content-create/content-create.component';
// import { AuthGuard } from '../_guards/auth.guard';
import { PortalListComponent } from './portals/portal-list/portal-list.component';
import { SectionListComponent } from './portals/sections/section-list/section-list.component';
import { ContentComponent } from './portals/content/content-list/content-list.component';
import { PhotoListComponent } from './images/photo-list/photo-list.component';
import { PhotoUploadComponent } from './images/photo-album/photo-upload.component';
import { CarnetsListComponent } from './carnets/carnets-list/carnets-list.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'portal', component: PortalListComponent, children: [
              {
                path: ':sectionID', component: SectionListComponent, children: [
                  { path: ':contentID', component: ContentComponent },
                  { path: ':contentID/create', component: ContentCreateComponent },
                  { path: ':contentID/edit/:content', component: ContentCreateComponent },
                  { path: ':contentID/edit', redirectTo: ':contentID' },
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'carnets',
        component: CarnetsListComponent
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