import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home-page.html'
})

export class HomeComponent implements OnInit {
  public loginMessage = '';
  ngOnInit() {
    console.log('in Home Component');
    this.loginMessage = 'Login successfully';
  }
}
