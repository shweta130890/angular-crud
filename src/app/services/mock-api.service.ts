import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  constructor(private http: HttpClient){
  }
  
  
  public loadJSON(name: String): Observable<any> {
    return this.http.get("./assets/data/" + name + ".json");
  }
  public validate(name: String):any{
    return {};
  }
  
}
