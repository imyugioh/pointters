import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  tab : string = "";
  constructor(private route: ActivatedRoute, 
      private authService: AuthService,
      private router: Router) { 
    this.tab = route.snapshot.params['tab'];
    
  }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      this.tab = this.route.snapshot.params['tab'];

    });
  }

}
