import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { AgregarCuentaPage } from '../pages/agregar-cuenta/agregar-cuenta';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { CuentaEmpresaPage } from '../pages/cuenta-empresa/cuenta-empresa';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { MovimientoData } from '../providers/movimiento-data';
import { CuentaData } from '../providers/cuentas-data';
import { UserData } from '../providers/user-data';
import { GlobalData } from '../providers/global-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    AgregarCuentaPage,
    SpeakerDetailPage,
    SpeakerListPage,
    CuentaEmpresaPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
		IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    AgregarCuentaPage,
    SpeakerDetailPage,
    SpeakerListPage,
    CuentaEmpresaPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  providers: [ConferenceData, CuentaData, MovimientoData, UserData, GlobalData]
})
export class AppModule { }
