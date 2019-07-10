import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  onLocal: boolean;
  constructor() {
    this.onLocal=false;
   }
  getBaseUrl():string {
    return this.onLocal? 'http://localhost:8080/':'http://192.168.0.102:8080/'
  }

}
