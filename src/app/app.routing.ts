import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent}

];
