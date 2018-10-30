import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentListComponent} from './content/content-list/content-list.component'
import { ContentCreateComponent } from "./content/content-create/content-create.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
    { path: '', component: ContentListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'edit/:contentId', component: ContentCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}