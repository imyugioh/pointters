import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { FacebookModule }      from 'ngx-facebook';

import { HeaderComponent } from './header.component';
import { SearchDropdownComponent }       from './../search-dropdown/search-dropdown.component';
import { MessageDropdownComponent }      from './../message-dropdown/message-dropdown.component';
import { NotificationDropdownComponent } from './../notification-dropdown/notification-dropdown.component';
import { MenuDropdownComponent }         from './../menu-dropdown/menu-dropdown.component';
import { SigninComponent }          from './../signin/signin.component';
import { SignupComponent }          from './../signup/signup.component';
import { ForgotPasswordComponent }  from './../forgot-password/forgot-password.component';

import { AuthService }         from './../../services/auth.service';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent, 
        SearchDropdownComponent,
        MessageDropdownComponent,
        NotificationDropdownComponent,
        MenuDropdownComponent,
        SigninComponent,
        SignupComponent,
        ForgotPasswordComponent
       ],
      imports: [ 
        ReactiveFormsModule,
        HttpClientModule,
        FacebookModule.forRoot() ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
