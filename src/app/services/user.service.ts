import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: Http) {

  }

  public userLogin(user: User): void {
    this.http.get(`${environment.api_url}` + '/user')
  }
}
