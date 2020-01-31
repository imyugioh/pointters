import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { currentId } from 'async_hooks';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit, OnDestroy {

  private rsub: Subscription;
  public id: string;

  constructor(private offerService: OfferService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.rsub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.rsub.unsubscribe();
  }



}
