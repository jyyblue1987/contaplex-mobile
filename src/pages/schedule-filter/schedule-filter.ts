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
    this.dismiss(this.criterioMovimientos);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
