import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Para las rutas
import {Routing,AppRoutingProviders} from './app.routing';
// Para los formularios
import {FormsModule} from '@angular/forms';
// Para peticiones al Backend
import {HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
// Import Angular Froala Editor.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// Para seguridad en las rutas
import {IdentityGuard} from './services/identity.guard';
import {UserService} from './services/user.service';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostShowComponent } from './components/post-show/post-show.component';
import { CategoryShowComponent } from './components/category-show/category-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    ProfileComponent,
    CategoryNewComponent,
    CategoryListComponent,
    PostNewComponent,
    PostListComponent,
    PostEditComponent,
    PostShowComponent,
    CategoryShowComponent
  ],
  imports: [
    BrowserModule,
    Routing, // Para las rutas
    FormsModule, // Para los formularios
    HttpClientModule, // Para peticiones al Backend
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), // Angular Froala Editor
    AngularFileUploaderModule,
  ],
  providers: [
    AppRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
