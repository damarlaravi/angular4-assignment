import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {FormHelperService} from '../services/form-helper.service';


describe('Component: Login', () => {

  let component: any;
  let fixture: ComponentFixture<LoginComponent>;

  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      providers: [{provide: Router, useClass: RouterStub}, FormHelperService],
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent]
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('form invalid when empty', () => {
    console.log(' Component is :: ', component);
    expect(component.loginUser.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors: {};
    const username = component.loginUser.controls['username'];
    expect(username.valid).toBeFalsy();

    // username field is required
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set username to something Incorrect
    username.setValue('te');
    errors = username.errors || {};
    expect(Object.keys(errors).length > 0).toBeTruthy();

    // Set username to something correct
    username.setValue('ravi');
    errors = username.errors || {};
    expect(Object.keys(errors).length === 0).toBeTruthy();
  });

  it('password field validity', () => {
    let errors: {};
    const password = component.loginUser.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue('12345');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(Object.keys(errors).length > 0).toBeTruthy();

    // Set password to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(Object.keys(errors).length === 0).toBeTruthy();
  });

  it('submitting a form navigate to home page', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    expect(component.loginUser.valid).toBeFalsy();
    component.loginUser.controls['username'].setValue('ravi');
    component.loginUser.controls['password'].setValue('123456');
    expect(component.loginUser.valid).toBeTruthy();

    // Trigger the login function
    component.login();
    const navArgs = spy.calls.first().args[0];
    // Now we can check to make sure the emitted value is correct, navigate home component
    expect(navArgs).toBe('home');
  }));
});
