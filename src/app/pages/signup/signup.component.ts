import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Configuration } from '../../app.config';
import { contentHeaders } from '../../common/headers';
import { BaseService } from '../../services';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})

export class SignupComponent {

  constructor(public router: Router, private _config: Configuration, private _service: BaseService) {
    _config.setBgClass("simple");
  }

  signup(username: string, email: string, password: string, repassword: string) {
    this._service.SignUp(username, email, password, repassword)
      .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/boards']);
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
