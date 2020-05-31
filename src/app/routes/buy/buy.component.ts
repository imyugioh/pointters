import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './../../services/auth.service';
import {OfferService} from '../../services/offer.service';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  private tab: string = '';

  constructor(private route: ActivatedRoute,
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
