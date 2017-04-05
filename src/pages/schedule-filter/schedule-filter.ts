import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];
  criterioMovimientos: string;
  selectedDate: any;
  
  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.criterioMovimientos = this.navParams.data.criterio;
  }

  resetFilters() {
  }

  applyFilters() {
    var value = this.criterioMovimientos;
    if( this.criterioMovimientos == 'fecha' )
      value += '-' + this.selectedDate;
    this.dismiss(value);
  }

  onChangedRadio() {

  }

  onSelectDate() {
    this.criterioMovimientos = 'fecha';
  }

  onCancelDate() {
    this.criterioMovimientos = 'recientes';
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    console.log(data);
    this.viewCtrl.dismiss(data);
  }
}
