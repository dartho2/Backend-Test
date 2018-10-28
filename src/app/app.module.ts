import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent} from './layout/header/header.component'
import { AppComponent } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentService } from './content/content.service';
import { ContentCreateComponent } from './content/content-create/content-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentListComponent,
    ContentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
