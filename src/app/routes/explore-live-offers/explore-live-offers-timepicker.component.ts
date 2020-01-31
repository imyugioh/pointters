import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

const timeVals = [
  { label: '12.00am', value: 0 },
  { label: '01.00am', value: 1 },
  { label: '02.00am', value: 2 },
  { label: '03.00am', value: 3 },
  { label: '04.00am', value: 4 },
  { label: '05.00am', value: 5 },
  { label: '06.00am', value: 6 },
  { label: '07.00am', value: 7 },
  { label: '08.00am', value: 8 },
  { label: '09.00am', value: 9 },
  { label: '10.00am', value: 10 },
  { label: '11.00am', value: 11 },
  { label: '12.00pm', value: 12 },
  { label: '1.00pm', value: 13 },
  { label: '2.00pm', value: 14 },
  { label: '3.00pm', value: 15 },
  { label: '4.00pm', value: 16 },
  { label: '5.00pm', value: 17 },
  { label: '6.00pm', value: 18 },
  { label: '7.00pm', value: 19 },
  { label: '8.00pm', value: 20 },
  { label: '9.00pm', value: 21 },
  { label: '10.00pm', value: 22 },
  { label: '11.00pm', value: 23 }
];

@Component({
  selector: 'live-offers-timepicker',
  templateUrl: './explore-live-offers-timepicker.component.html',
  styleUrls: ['./explore-live-offers.component.css']
})
export class LiveOffersTimepickerComponent implements OnInit {

  @Input() togglePicker: Function;
  @Input() pickerOpen: boolean = false;

  @Output() onToTimeValueChange: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() onFromTimeValueChange: EventEmitter<{}> = new EventEmitter<{}>();

  private timePickersOpen: boolean = false;
  private preventPickerClose: boolean = false;
  private timeVal: string = "No time selected..."
  private fromTimeVal: object = null;
  private toTimeVal: object = null;
  private timeOptions: Array<any> = timeVals;
  private toTimeOptions: Array<any> = timeVals;

  ngOnInit() {

  }

  formatTimeVal() {

    let val = "";
    if (this.fromTimeVal) {
      val += this.fromTimeVal['label'];
    }
    val += ' - ';

    if (this.toTimeVal) {
      val += this.toTimeVal['label'];
    }

    this.timeVal = val;
    return val;
  }

  getAvailableTime(val) {
    return this.timeOptions.filter(el => {
      if (el.value > val) return true;
    });
  }

  handleFromTimeSelection = (data) => {
    this.preventPickerClose = true;
    if (this.fromTimeVal && data.value !== this.fromTimeVal['value']) {
      this.toTimeOptions = this.getAvailableTime(data.value);
    }

    this.fromTimeVal = data;


    data.allLabel = this.formatTimeVal();
    this.onFromTimeValueChange.emit(data);
  }

  handleToTimeSelection = (data) => {
    this.preventPickerClose = true;
    this.toTimeVal = data;

    data.allLabel = this.formatTimeVal();
    this.onToTimeValueChange.emit(data);

  }

  onClickOutside(e) {
    if (this.preventPickerClose) {
      this.preventPickerClose = false;
      return;
    }
    this.togglePicker(false);
  }

  timePickerOpen() {
    this.timePickersOpen = true;
  }

  timePickerClose() {
    this.timePickersOpen = false;
  }


}
