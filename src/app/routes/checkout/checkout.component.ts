import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute } from '@angular/router';
var dropin = require('braintree-web-drop-in');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private braintreeToken: string;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.checkoutService.getBraintreeToken()
      .subscribe(res => {
        if (res['success']) {

          dropin.create({
            authorization: res['clientToken'],
            container: '#dropin-container',
            paypal: {
              flow: 'vault'
            }

          }, function (createErr, instance) {
            // button.addEventListener('click', function () {
            //   instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
            //     // Submit payload.nonce to your server
            //   });
            // });
          });
        }
      })
  }

}
