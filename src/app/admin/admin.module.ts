import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent} from '../layout/header/header.component';
import { ContentCreateComponent } from './portals/content/content-create/content-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { NgxEditorModule } from 'ngx-editor';
import { TextContentComponent } from './portals/content/_form/text-content.component';
import { TableContentomponent } from './portals/content/_form/table-content.component';
import { GalleryContentomponent } from './portals/content/_form/gallery-content.component';
import { ScheduleContentomponent } from './portals/content/_form/schedule-content.component';
import { PortalListComponent } from './portals/portal-list/portal-list.component';
import { SectionListComponent } from './portals/sections/section-list/section-list.component';
import { ContentComponent } from './portals/content/content-list/content-list.component';
import { TextImageContentComponent } from './portals/content/_form/text-image.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {FileUploadModule} from 'ng2-file-upload';
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import {PhotoListComponent} from './images/photo-list/photo-list.component';
import {PhotoUploadComponent} from './images/photo-album/photo-upload.component';
import {PhotoAlbum} from './images/model/photo-album.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { CarnetsListComponent } from './carnets/carnets-list/carnets-list.component';
import { CarnetCreateComponent } from './carnets/carnets-create/carnet-create.component';
export const cloudinary = {
  Cloudinary: CloudinaryCore
};

@NgModule({
  imports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxEditorModule ,
    FormsModule ,
    FroalaEditorModule,
    FroalaViewModule,
    CloudinaryModule.forRoot(cloudinary, {
      cloud_name: 'duvsjgmt5',
      upload_preset: "tfkqqmpi"
    }),
        FileUploadModule,
  ],
  declarations: [
    AdminComponent,
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
    PhotoUploadComponent,
    CarnetsListComponent,
    CarnetCreateComponent
  ],
  providers: [
    PhotoAlbum,
]
})
export class AdminModule {}