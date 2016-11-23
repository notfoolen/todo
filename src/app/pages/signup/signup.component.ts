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
        // localStorage.setItem('id_token', response.json().id_token);
        // this.router.navigate(['home']);
        this.router.navigate(['home']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
    /*
  let body = JSON.stringify({ username, password });
  this.http.post('http://localhost:3001/users', body, { headers: contentHeaders })
    .subscribe(
      response => {
        localStorage.setItem('id_token', response.json().id_token);
        this.router.navigate(['home']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
    */
  }

  login() {
    this.router.navigate(['signin']);
  }

}
