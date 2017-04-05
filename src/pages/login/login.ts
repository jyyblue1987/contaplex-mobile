import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password).subscribe((loginSuccess: boolean) => {
      	if (loginSuccess) {
      	  this.navCtrl.push(TabsPage);
      	} else {
      	  // TODO
      	}
      }, (err: any) => {
            console.log(err);
            this.showAlert(err.status);
        });  
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  showAlert(status: number) {
      var text = "En este momento no es posible establecer comunicación con ContaPlex. Por favor, intente nuevamente mas tarde";

      if( status == 403 )
        text = "El usuario y/o contraseña ingresados no son correctos. Verifique la información e intente nuevamente";

      let alert = this.alertCtrl.create({
        title: 'Login',
        subTitle: text,
        buttons: [            
            {
                text: 'OK',
                handler: (data: any) => {
                  this.login.password = '';
                }
            }
          ]
      });

      alert.present();
  }
}
