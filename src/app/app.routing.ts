import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
// Para seguridad en las rutas
import {IdentityGuard} from './services/identity.guard';


// Componentes 
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryShowComponent} from './components/category-show/category-show.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostShowComponent } from './components/post-show/post-show.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

// Definir las rutas 
const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent, canActivate: [IdentityGuard]},
    {path: 'home', component: HomeComponent, canActivate: [IdentityGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [IdentityGuard]},
    {path: 'category_create', component: CategoryNewComponent, canActivate: [IdentityGuard]},
    {path: 'category_show/:id', component: CategoryShowComponent, canActivate: [IdentityGuard]},
    {path: 'categories', component: CategoryListComponent, canActivate: [IdentityGuard]},
    {path: 'post_create', component: PostNewComponent, canActivate: [IdentityGuard]},
    {path: 'post_show/:id', component: PostShowComponent, canActivate: [IdentityGuard]},
    {path: 'post_edit/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
    {path: 'posts', component: PostListComponent, canActivate: [IdentityGuard]},
    {path: '**', component: ErrorComponent},
];
// Exportar configuracion 
export const AppRoutingProviders: any [] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);