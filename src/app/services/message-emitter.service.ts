import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageEmitterService {
  public messageBroker$: EventEmitter<any>;
  constructor() {
      this.messageBroker$ = new EventEmitter();
   }
    emit(data:any):void {
      console.log("MessageEmitterService.emit data: ", data);
      this.messageBroker$.emit(data)
   }
}
