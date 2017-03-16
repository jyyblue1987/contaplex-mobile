import { Component, ViewChild } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

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
    this.app.setTitle('Schedule');
    console.log("Cuenta: " + this.cuenta.empresa);
    this.updateSchedule();
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
    
    this.movimientoData.load(this.cuenta.cuentaId).subscribe((movimientos: any[]) => {
      this.movimientos = movimientos;
      this.queryText = '';
      this.localFilter();
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

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }
  
  getDescripcionCriterio(): string {
    switch (this.criterio)
    {
      case "esta_semana":
        return "de esta semana";
      case "mes_actual":
        return "mes en curso";
      case "mes_previo":
        return "mes previo";
      case "fecha":
        return "del XX/XX/XXXX";
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
