import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent} from '../layout/header/header.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentCreateComponent } from './content/content-create/content-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { NgxEditorModule } from 'ngx-editor';
import { TextContentComponent } from './content/_form/text-content.component';
import { TableContentomponent } from './content/_form/table-content.component';
import { GalleryContentomponent } from './content/_form/gallery-content.component';
import { ScheduleContentomponent } from './content/_form/schedule-content.component';
import { PortalListComponent } from './portals/portal-list/portal-list.component';
import { SectionListComponent } from './portals/sections/section-list/section-list.component';
import { ContentComponent } from './portals/content/content-list.component';
import { TextImageContentComponent } from './content/_form/text-image.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {FileUploadModule} from 'ng2-file-upload';
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';
import * as Cloudinary from 'cloudinary-core';
import {PhotoListComponent} from './images/photo-list/photo-list.component';
import {PhotoUploadComponent} from './images/photo-album/photo-upload.component';
import {PhotoAlbum} from './images/model/photo-album.service';
// Cloudinary module

// Application modules
// import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxEditorModule ,
    FormsModule ,
    FroalaEditorModule,
    FroalaViewModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: 'duvsjgmt5',
      upload_preset: "tfkqqmpi"
    }),
    // CloudinaryModule.forRoot(cloudinary, {
    //   cloud_name: 'duvsjgmt5',
    //   upload_preset: "tfkqqmpi"
    // }),
        FileUploadModule,
  ],
  declarations: [
    AdminComponent,
    ContentListComponent,
    ContentCreateComponent,
    HeaderComponent,
    NavbarComponent,
    TextContentComponent,
    TextImageContentComponent,
    TableContentomponent,
    GalleryContentomponent,
    ScheduleContentomponent,
    PortalListComponent,
    SectionListComponent,
    ContentComponent,
    PhotoListComponent,
    PhotoUploadComponent
    
    
  ],
  providers: [
    PhotoAlbum,
]
})
export class AdminModule {}