import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {AuthGuard} from './services/auth-guard.service';

import {ROUTES} from './app.routing';
import {LoginComponent} from './login/login.component';
import {FormHelperService} from './services/form-helper.service';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthGuard,
    FormHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
