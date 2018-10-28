import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentListComponent} from './content/content-list/content-list.component'
import { ContentCreateComponent } from "./content/content-create/content-create.component";
const routes: Routes = [
    {path: '', component: ContentListComponent},
    { path: 'edit/:contentId', component: ContentCreateComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}