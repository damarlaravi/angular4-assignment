import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormHelperService} from '../services/form-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login-page.html',
  styleUrls: ['../../styles/login.less']
})
export class LoginComponent implements OnInit {
  public loginUser: FormGroup;
  public errorMessage = '';
  public formSubmitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              public fh: FormHelperService) {

  }

  ngOnInit() {
    this.loginUser = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public login(): void {
    this.formSubmitted = true;
    this.errorMessage = '';
    if (this.loginUser.valid && this.loginUser.value.password === '123456') {
      this.router.navigateByUrl('home')
    } else if (this.loginUser.valid) {
      this.errorMessage = 'login failed'
    }
    // console.log('Login Button clicked', this.loginUser.value);
  }
}
