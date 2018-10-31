import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentListComponent} from './content/content-list/content-list.component'
import { ContentCreateComponent } from "./content/content-create/content-create.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './_guards/auth.guard';
// import { HomeComponent } from "./home/home.component";
const routes: Routes = [

    
    { path: '', loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard] },
    // { path: ':content', component: ContentListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent},
    // { path: 'edit/:contentId', component: ContentCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}