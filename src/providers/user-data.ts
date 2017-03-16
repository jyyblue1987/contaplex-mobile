import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';


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
    public http: Http
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

  login(username: string): any {
    console.log("SI, DISPARA EL LOGIN");
    //return this.http.get('http://ec2-34-192-160-14.compute-1.amazonaws.com:10081/api/login')
    return this.http.post('http://ec2-34-192-160-14.compute-1.amazonaws.com:10081/api/login', JSON.stringify({user: username, password: 'luis123'}), { headers: this.headers })
        .map(this.processLoginResponse, this);
  };
  
  processLoginResponse(data: any) {
    console.log("processData usuario login llamado");
    this._loginResponse = data.json();
    console.log(data);
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername('Luis Luporini');
    this.setUsuarioId(this._loginResponse.usuarioId);
    this.events.publish('user:login');
    
    return true;
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
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
