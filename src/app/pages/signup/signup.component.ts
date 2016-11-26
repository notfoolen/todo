import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AccountService } from '../../services';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})

export class SignupComponent {

  constructor(public router: Router, private _service: AccountService) {
  }

  signup(username: string, email: string, password: string, repassword: string) {
    this._service.SignUp(username, email, password, repassword)
      .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
      );
  }

  login() {
    this.router.navigate(['signin']);
  }

}
