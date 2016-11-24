import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AccountService } from '../../services';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html'
})

export class SigninComponent {

  constructor(public router: Router, private _service: AccountService) {
  }

  signin(username: string, password: string) {
    this._service.SignIn(username, password)
      .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['boards']);
      },
      error => {
        console.log(error);
      }
      );
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
