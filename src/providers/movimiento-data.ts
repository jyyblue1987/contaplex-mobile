import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';
import { GlobalData } from './global-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class MovimientoData {
  data: any;

  constructor(public http: Http, public user: UserData, private global: GlobalData) { }

  load(cuentaId: number, filtro: string): any {
    if (this.data) {
      return this.http.get(`${this.global.getApiBaseUrl()}/movimiento/buscar?cuentaId=${cuentaId}&filtro=${filtro}`)
        .map(this.processData, this);
    
      //return Observable.of(this.data);
    } else {
      return this.http.get(`${this.global.getApiBaseUrl()}/movimiento/buscar?cuentaId=${cuentaId}&filtro=${filtro}`)
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    let datos = data.json();
    this.data = [];
    datos.forEach((movimiento: any) => {
      this.data.push(movimiento);
    });
    
    return this.data;
  }

}
