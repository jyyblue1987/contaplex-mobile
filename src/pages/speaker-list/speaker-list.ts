import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { ConferenceData } from '../../providers/conference-data';
import { CuentaData } from '../../providers/cuentas-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { AgregarCuentaPage } from '../agregar-cuenta/agregar-cuenta';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { UserData } from '../../providers/user-data';

import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];
  cuentas: any[] = [];
  hasLoaded: boolean = false;
  loading: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public confData: ConferenceData,
    public cuentasData: CuentaData,
    public user: UserData,
    public config: Config
  ) { }

  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
    
   this.user.hasLoggedIn().then((hasLoggedIn) => {
      if (hasLoggedIn) {
      
	this.user.getUsuarioId().then((usuarioId) => {
	    this.presentLoadingDefault();
	    this.cuentasData.load(usuarioId).subscribe((cuentas: any[]) => {
	      this.cuentas = cuentas;
	      this.hasLoaded = true;
	      this.loading.dismiss();
	    });
	});

      }
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });
    this.loading.present();
  }

  buscar() {
    this.user.getUsuarioId().then((usuarioId) => {
	this.presentLoadingDefault();
	this.cuentasData.getMisCuentas(usuarioId).subscribe((cuentas: any[]) => {
	    this.cuentas = cuentas;
	    this.hasLoaded = true;
	    this.loading.dismiss();
	});
    });
  }
  
  goToSchedule(cuenta: any) {
    this.navCtrl.push(SchedulePage, cuenta);
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(SpeakerDetailPage, speakerName);
  }

  goToAgregarCuenta() {
    this.navCtrl.parent.parent.setRoot(AgregarCuentaPage);
  }

  goToSpeakerTwitter(speaker: any) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event: Event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
  
  getImporteConFormato(importe: number): string {
    if (importe < 0) {
      return `$ (${importe.toFixed(2).replace('-', '')})`;
    } else {
      return `$ ${importe.toFixed(2)}`;
    }
  }
    
}
