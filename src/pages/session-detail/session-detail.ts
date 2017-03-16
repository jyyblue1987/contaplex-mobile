import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  cuenta: any;
  movimiento: any;

  constructor(public navParams: NavParams) {
    this.cuenta = navParams.data.cuenta;
    this.movimiento = navParams.data.movimiento;
  }
  
  getImporteConFormato(importe: number): string {
    if (importe < 0) {
      return `$ (${importe.toFixed(2).replace('-', '')})`;
    } else {
      return `$ ${importe.toFixed(2)}`;
    }
  }
    
}
