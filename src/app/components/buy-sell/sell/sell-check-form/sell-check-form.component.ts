import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../../services/checkout.service';
import { UserService } from '../../../../services/user.service';
import { states } from '../../../../interfaces/states';
import { User } from '../../../../interfaces/User';

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


var dropin = require('braintree-web-drop-in');
var moment = require('moment');
var currentYear = moment().year();

let years = new Array(100).fill(false).map((el, i) => {
  let val = currentYear - i;
  return { value: val, label: val };
});
let all_days = new Array(31).fill(true).map((el, i) => {
  return { value: i, label: i };
});


@Component({
  selector: 'app-sell-check-form',
  templateUrl: './sell-check-form.component.html',
  styleUrls: ['./sell-check-form.component.css']
})
export class SellCheckFormComponent implements OnInit {

  private braintreeToken: string;
  private user: User;
  private moment: any = moment;
  private btnDisabled = true;
  private invalidFields = {};
  private model = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bd_month: undefined,
    bd_day: undefined,
    bd_year: undefined,
    ssn: '',
    zip: '',
    license: '',
    licenseState: undefined
  }

  private monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
  ];
  private dateOptions = [];
  private yearOptions = years;
  private stateOptions = states;
  private currentDayOptions = [];
  private selectDateDisabled = true;


  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService
  ) { }

  handleSelectMonth = (val) => {
    let days = moment(`${currentYear}-${ val >= 10 ? val : '0' + val }`).daysInMonth();

    this.currentDayOptions = all_days.slice(1, days + 1)

    this.validateForm();
  }

  validateForm = () => {
    Object.keys(this.model).map(key => {
      if (!this.model[key]) this['invalidFields'][key] = true;
      else if (key === 'email' && !emailRegex.test(this.model.email)) this['invalidFields'][key] = true;
      else if (this.model[key] && this['invalidFields'][key]) delete this['invalidFields'][key];
    })
    if (Object.keys(this.invalidFields).length === 0) {
      this.btnDisabled = false
    } else {
      this.btnDisabled = true;
    }
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    });
    this.checkoutService.getBraintreeToken()
      .subscribe(res => {
        if (res['success']) {

          dropin.create({
            authorization: res['clientToken'],
            container: '#dropin-container',
            paypal: {
              flow: 'vault'
            },

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
