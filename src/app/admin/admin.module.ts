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
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxEditorModule 
  ],
  declarations: [
    AdminComponent,
    ContentListComponent,
    ContentCreateComponent,
    HeaderComponent,
    NavbarComponent,
    TextContentComponent,
    TableContentomponent,
    GalleryContentomponent,
    ScheduleContentomponent
    
    
  ]
})
export class AdminModule {}