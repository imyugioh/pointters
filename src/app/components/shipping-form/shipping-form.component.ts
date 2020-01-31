import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { createNumberMask } from 'text-mask-addons';
import { states } from '../../interfaces/states';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Input() handleSelectClose: Function;
  @Input() validateInput: Function;
  @Input() address;
  @Input() parcel;
  @Input() useSelect: boolean;
  @Input() noPadding: boolean = false;

  private numMask = createNumberMask({
    thousandsSeparatorSymbol: ".",
    prefix: '',
    suffix: '',
    allowDecimal: true
  })

  private stateOptions = states;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.address) {
      if (changes.address.currentValue.state === '') {
        this.address.state = undefined;
      }
    }
  }

  selectClose() {
    this.handleSelectClose();
  }
}
