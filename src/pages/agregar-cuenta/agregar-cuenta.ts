import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CuentaData } from '../../providers/cuentas-data';


@Component({
  selector: 'page-user',
  templateUrl: 'agregar-cuenta.html'
})
export class AgregarCuentaPage {
  agregarCuenta: { nombre?: string, razon_social?: string, documento?: string, empresa?: string, mensaje?: string } = {};
  submitted = false;

  constructor(public navCtrl: NavController, public cuentaData: CuentaData, private alertCtrl: AlertController) {}

  onSolicitar(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.cuentaData.solicitar(this.agregarCuenta).subscribe((responseSuccess: boolean) => {
	if (responseSuccess) {
	  this.presentAlert();
	} else {
	  // TODO
	}
      });
    }
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Solicitud de acceso a cuenta',
      subTitle: 'Tu solicitud fue recibida correctamente. La empresa la revisará para procesarla.',
      buttons: [{
	text: 'Continuar',
	handler: () => {
	  alert.dismiss();
	  this.navCtrl.push(TabsPage);
	  return false;
	}
      }]
    });
    alert.present();
  }
  
}
