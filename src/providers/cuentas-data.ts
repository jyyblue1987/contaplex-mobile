import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';
import { GlobalData } from './global-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class CuentaData {
  
  data: any;
  lastUsuarioId: string;
  dataType: any;

  constructor(public http: Http, public user: UserData, private global: GlobalData) { }
  
  loadMiEmpresa(usuarioId: string, queryText = '', reload: boolean = false): any {
    return reload ? this.getMiEmpresa(usuarioId, queryText) : this.load(usuarioId, queryText);
  }
  
  load(usuarioId: string, dataType = "mis-cuentas"): any {
    if (this.data && this.lastUsuarioId == usuarioId && this.dataType == dataType) {
      return Observable.of(this.data);
    } else {
      if (dataType == 'mis-cuentas') {
	return this.getMisCuentas(usuarioId);
      } else {
	return this.getMiEmpresa(usuarioId, dataType);
      }
    }
  }

  getMiEmpresa(usuarioId: string, queryText: string): any {
      this.lastUsuarioId = usuarioId;
      this.dataType = 'mi-empresa';
      return this.http.get(`${this.global.getApiBaseUrl()}/empresa/listarCuentas?usuarioId=${usuarioId}&term=${queryText}`)
        .map(this.processData, this);
  }
  
  getMisCuentas(usuarioId: string): any {
      this.lastUsuarioId = usuarioId;
      this.dataType = 'mis-cuentas';
      return this.http.get(`${this.global.getApiBaseUrl()}/cuenta/listar?usuarioId=${usuarioId}`)
        .map(this.processData, this);
  }

  processData(data: any) {
    this.data = data.json();
    return this.data;
  }

  solicitar(data: any): any {
    /*
    return this.http.post(`${this.global.getApiBaseUrl()/signup`, JSON.stringify(data), { headers: this.headers })
        .map(this.processSolicitarResponse, this);
    */
    return Observable.of(this);
  }

  processSolicitarResponse(data: any) {
    this.data = data.json();
    return this.data;
  }
  
  /*
  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  */
}
