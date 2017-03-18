import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';

import { GlobalData } from './global-data';

@Injectable()
export class UserData {
  private headers: Headers;
  
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  _loginResponse: any;
  
  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http,
    private global: GlobalData
  ) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string, password: string): any {
    return this.http.post(`${this.global.getApiBaseUrl()}/login`, JSON.stringify({user: username, password: password}), { headers: this.headers })
        .map(this.processLoginResponse, this);
  };
  
  processLoginResponse(data: any) {
    this._loginResponse = data.json();
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername('Luis Luporini');
    this.setUsuarioId(this._loginResponse.usuarioId);
    this.events.publish('user:login');
    
    return true;
  };

  signup(data: any): any {
    /*this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');*/
    
    return this.http.post(`${this.global.getApiBaseUrl()}/signup`, JSON.stringify({user: data.email, password: data.password, name: data.name}), { headers: this.headers })
        .map(this.processLoginResponse, this);    
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  setUsuarioId(usuarioId: string): void {
    this.storage.set('usuarioId', usuarioId);
  };

  getUsuarioId(): Promise<string> {
    return this.storage.get('usuarioId').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
