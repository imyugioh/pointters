import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  searchForm : FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
  	if (this.authService.token) {
  		this.userService.get().subscribe();
    }
    
    $('body').tooltip({
      selector: '[data-toggle=tooltip]'
    });
  }
}
