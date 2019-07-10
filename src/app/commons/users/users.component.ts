import { Component, OnInit } from '@angular/core';
import { MockApiService } from 'src/app/services/mock-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users=[];
  isMockEnabled: boolean= true;
  constructor(private mockService: MockApiService, private userService: UserService) {
    this.isMockEnabled= true;
   }
  
  ngOnInit() {
    if(this.isMockEnabled){
    this.mockService.loadJSON('users').subscribe(data => {
      console.log("this.mockService.loadJSON users", data);
        this.users=data;
    });
  }else{
    this.userService.getUsers(false).subscribe((data: any) => {
      console.log("this.userService.getUsers users", data);
        this.users=data;
    });
  }


  }
  deactivate(user: any){
    console.log("deactivate user", user);
    user.isActive=false;
    this.userService.update(`?id=${user.id}`, user).subscribe((data: any) => {
      console.log("deactivate this.userService.update users", data);
        this.users=data;
    });
  }
  activate(user: any){ 
    console.log("activate user", user);
    user.isActive=true;
    this.userService.update(`?id=${user.id}`, user).subscribe((data: any) => {
      console.log("activate this.userService.update users", data);
        this.users=data;
    });
  }

}
