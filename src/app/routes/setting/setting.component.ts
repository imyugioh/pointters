import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  tab : string = "";
  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) { 
    this.tab = route.snapshot.params['tab'];
    console.log(this.tab+" selected");
    
  }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      this.tab = this.route.snapshot.params['tab'];

    });
  }
  
}
