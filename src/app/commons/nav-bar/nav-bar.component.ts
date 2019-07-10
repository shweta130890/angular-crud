import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  activatedRoute: string;
  constructor(public router: Router, private activateRoute: ActivatedRoute) {
    this.isLoggedIn = false;
    router.events.subscribe((val: any) => {
      if (val instanceof NavigationStart) {
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = val.url.slice(1).split(urlDelimitators)[0];
        if (currentUrlPath.indexOf('login') > -1) {
          this.activatedRoute = 'LOGIN';
        }
        if (currentUrlPath.indexOf('signup') > -1) {
          this.activatedRoute = 'SIGNUP';
        }
        if (currentUrlPath.indexOf('users') > -1) {
          this.activatedRoute = 'SHOWUSER';
          this.isLoggedIn = true;
        }else if (!(currentUrlPath.indexOf('login') > -1) && !(currentUrlPath.indexOf('signup') > -1)) {
          this.isLoggedIn = true;

        }
      }
    });
  }

  ngOnInit() {
  }

  showLogin() {
    console.log("showLogin called");
    this.activatedRoute = 'LOGIN';
    this.router.navigate(['login']);
  }

  showSignup() {
    console.log("showSignup called");
    this.activatedRoute = 'SIGNUP';
    this.router.navigate(['signup']);
  }

  showUsers() {
    console.log("showUsers called");
    this.activatedRoute = 'SHOWUSER';
    this.router.navigate(['users']);
  }
}
