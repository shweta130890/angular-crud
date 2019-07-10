import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageEmitterService } from 'src/app/services/message-emitter.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockApiService } from 'src/app/services/mock-api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isInvalidEntry: any = {};  
  isSubmitting: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService ) {
    this.initForm();
    this.isInvalidEntry['error'] = false;
   }
  ngOnInit() {
  }
  get f() { return this.signupForm.controls; }

  initForm() {
    this.signupForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(2)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  onSubmit() {
    if ((this.signupForm.dirty && this.signupForm.invalid) || (this.signupForm.get('username').value.length<2) || (this.signupForm.get('email').value.length<2) || (this.signupForm.get('password').value.length<2)) {
      // console.log("validation failed");
          this.isSubmitting=false;
      return;
    } else { 
      // console.log("validation success");
      this.isInvalidEntry['error'] = false;
      this.isSubmitting=true ; 
      var  payload = {
          username: this.signupForm.get('username').value,
          email: this.signupForm.get('email').value,
          password: this.signupForm.get('password').value,
        };
      
      console.log("Form data!", JSON.stringify(payload));
      this.userService.signup(payload).subscribe(data => { 
          this.isSubmitting=false;
          this.router.navigate(['/']);
      }); 
    }
  }
}
