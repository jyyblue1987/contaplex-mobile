import { Component, ViewChild } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { MovimientoData } from '../../providers/movimiento-data';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SessionDetailPage } from '../session-detail/session-detail';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  cuenta: any;
  movimientos: any = [];
  movimientosFiltrados: any = [];
  criterio: string = 'recientes';
  isLoading = false;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public movimientoData: MovimientoData,
    public user: UserData,
    public navParams: NavParams,
  ) {
    this.cuenta = navParams.data;
  }

  ionViewDidLoad() {
    this.app.setTitle('Movimientos');
    this.updateSchedule();
  }

  updateSchedule() {
    this.isLoading = true;  
    this.movimientoData.load(this.cuenta.cuentaId, this.criterio).subscribe((movimientos: any[]) => {
      this.movimientos = movimientos;
      this.queryText = '';
      this.localFilter();
      this.isLoading = false;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, { criterio: this.criterio });
    modal.present();

    modal.onWillDismiss((data: string) => {
      if (data && data != this.criterio) {
        this.criterio = data;
        this.updateSchedule();
      }
    });

  }

  localFilter() {
    if (this.queryText) {
      this.movimientosFiltrados = this.filterItems(this.queryText);
    } else {
      this.movimientosFiltrados = this.movimientos;
    }
  }
  
  filterItems(searchTerm: string) {
    return this.movimientos.filter((item: any) => {
      return item.concepto.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });     
  }
  
  goToSessionDetail(cuenta: any, movimiento: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, { cuenta: cuenta, movimiento: movimiento });
  }

  getDescripcionCriterio(): string {
    switch (this.criterio)
    {
      case "ultimos_7d":
        return "últimos 7 días";
      case "mes_actual":
        return "del mes en curso";
      case "mes_previo":
        return "del mes previo";
      case "fecha":
        return "para XX/XX/XXXX";
      default:
	return this.criterio;
    }
  }
  
  getImporteConFormato(importe: number): string {
    if (importe < 0) {
      return `$ (${importe.toFixed(2).replace('-', '')})`;
    } else {
      return `$ ${importe.toFixed(2)}`;
    }
  }
  
}
