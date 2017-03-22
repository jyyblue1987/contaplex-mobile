import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {

  public apiBaseUrl: string = "http://ec2-34-192-160-14.compute-1.amazonaws.com:10081/api";
  
  constructor() {
  }

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

}
