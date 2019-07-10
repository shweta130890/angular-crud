import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './commons/login/login.component';
import { SignupComponent } from './commons/signup/signup.component';
import { UsersComponent } from './commons/users/users.component';
 
const routes: Routes = [
  { path: '', component: WelcomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent }, 
  { path: 'users', component: UsersComponent }, 
  // { path: 'consumer', component: ConsumerDashboardComponent, canActivate:[AuthGuard] },  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
