import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {name?: string, email?: string, email2?: string, password?: string, password2?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup).subscribe((signupSuccess: boolean) => {
	if (signupSuccess) {
	  this.navCtrl.push(TabsPage);
	} else {
	  // TODO
	}
      });
    }
  }
}
