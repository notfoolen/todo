import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { BaseService } from '../../services';
import { Error } from '../../types';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html'
})

export class SigninComponent {

  public error: Error;

  constructor(public router: Router, private _service: BaseService) {
  }

  signin(username: string, password: string) {
    this._service.SignIn(username, password)
      .subscribe(
      response => {
        this.router.navigate(['/boards']);
      },
      error => {
        this.error = new Error(error.status, error._body);
        console.log(error);
      }
      );
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
