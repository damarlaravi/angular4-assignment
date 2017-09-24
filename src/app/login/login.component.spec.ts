import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {User} from '../models/user.model';
import {Router, RouterModule} from '@angular/router';


describe('Component: Login', () => {

  let component: any;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      providers: [{provide: Router, useValue: mockRouter}],
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

    // Set username to something
    username.setValue('te');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set username to something correct
    username.setValue('ravi');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: {};
    const password = component.loginUser.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue('123456');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set email to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.loginUser.valid).toBeFalsy();
    component.loginUser.controls['username'].setValue('ravi');
    component.loginUser.controls['password'].setValue('123456');
    expect(component.loginUser.valid).toBeTruthy();

    const user: User = new User();

    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    expect(user.username).toBe('ravi');
    expect(user.password).toBe('123456');
  });
});
