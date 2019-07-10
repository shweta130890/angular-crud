import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String; 
  constructor(private http: HttpClient, private env: EnvironmentService) {
    this.baseUrl = env.getBaseUrl(); 
  }
  getUsers(onlyActive: boolean) {
    return this.http.get(this.baseUrl + 'api/user/all'+(onlyActive? `?isActive=${onlyActive}`:''))
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}api/user/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}api/user/signup`, data);
  } 

  update(urlParam: any, data: any) {
    return this.http.post(`${this.baseUrl}api/user/update`+urlParam, data);
  } 

 isValidMailFormat(value: string): boolean{
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (value != "" && (value.length <= 5 || !EMAIL_REGEXP.test(value))) {
        return false;
    }

    return true;
}
}
