import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageEmitterService } from 'src/app/services/message-emitter.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockApiService } from 'src/app/services/mock-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isInvalidEntry: any = {}; 
  isMockEnabled: boolean;
  isSubmitting: boolean;
  invalidCred: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private mockService: MockApiService) {
    this.initForm();
    this.isInvalidEntry['error'] = false;
    this.isMockEnabled=true;
  }
  ngOnInit() {
  }
  get f() { return this.loginForm.controls; }

  initForm() {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(2)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    })
  }


  onSubmit() {
    if ((this.loginForm.dirty && this.loginForm.invalid)) {
      // console.log("validation failed");
      return;
    } else {
      var payload = {};
      // console.log("validation success");
      this.isInvalidEntry['error'] = false;
      this.isSubmitting=true ;
      var type = this.userService.isValidMailFormat(this.loginForm.get('username').value) ? "email" : "username";
      if (type === 'email') {
        payload = {
          email: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value,
        };
      } else if (type === 'username') {
        payload = {
          username: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value,
        };
      }
      console.log("Form data!", JSON.stringify(payload));

     if(this.isMockEnabled){
      this.mockService.loadJSON('users').subscribe(data => {
        console.log("this.mockService.loadJSON('user')", data); 
          data.forEach( (value) => {
          if((value.username===payload['username'] || value.email===payload['username'] ) &&  value.password===payload['password']){
          console.log("loggedin");
          this.router.navigate(['/']); 
          this.invalidCred = false;
          return;
          }else{ 
            this.invalidCred = true;
          }
          console.log(value);
      });
      });
      this.isSubmitting=false ; 
     }else{
      this.userService.login(payload).subscribe(data => { 
          this.isSubmitting=false;
        this.router.navigate(['/']);
        this.invalidCred = false;
      });
    }
    }
  }
}
