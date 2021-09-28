import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;
  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    //subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
    //fetch the logged in user's details
    //user's full name is exposed as a property name
    this.oktaAuthService.getUser().then(
      res => {
        this.userFullName = res.name;
        //retrieve the users email address
        const email = res.email;
        //store in browser storage
        this.storage.setItem('userEmail', JSON.stringify(email));


      }
    );
  }

  logout(){
    //terminates the session
    this.oktaAuthService.signOut();
  }
}
