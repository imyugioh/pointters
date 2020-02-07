import { Component, OnInit, NgZone, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import turf from '@turf/distance';
import * as $ from 'jquery';

import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../interfaces/order';
import { User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';



interface RootDoc {
  order: Order;
  seller: User;
}

@Component({
  selector: 'app-buy-orders',
  templateUrl: './buy-orders.component.html',
  styleUrls: ['./buy-orders.component.css']
})
export class BuyOrdersComponent implements OnInit {

  public models: RootDoc[];
  public user: User;

  private lastDocId: Number;
  public page: Number;
  public maxPage: Number;

  public DateTime = DateTime;
  public turf = turf;

  // scroll handler
  @ViewChild('scroll', { read: ElementRef })
  private scrollEl: ElementRef;
  public fetching = false;


  constructor(private orderService: OrderService,
    private userService: UserService, ) { 

    }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });


    this.fetchOrders().subscribe();
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {

    if ((this.page >= this.maxPage) || this.fetching) {
      return;
    }

    const element = this.scrollEl.nativeElement;

    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      this.fetchOrders().subscribe();
    }

  }

  fetchOrders() {
    if ((this.page >= this.maxPage) || this.fetching) {
      return Observable.empty();
    }

    this.fetching = true;

    const filter = this.lastDocId && {
      lt_id: this.lastDocId,
    };

    return this.orderService.getBuy(filter)
      .map(res => {

        this.lastDocId = res['lastDocId'];
        this.page = res['page'];
        this.maxPage = res['pages'];

        res['docs'].forEach((doc: RootDoc) => {
          doc.order.paymentDate = DateTime.fromISO(doc.order.paymentDate).toFormat('EEEE E');
        });

        if(!this.models) {
          this.models = res['docs'];
        }
        else {
          this.models = this.models.concat(res['docs']);
        }
        this.fetching = false;
      }).catch(err => {
        this.page = 1;
        this.maxPage = 1;
        this.models = [];
        this.fetching = false;
        return Observable.empty();
      });
  }



}
