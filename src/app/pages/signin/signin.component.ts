import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

@Component({
  selector: 'signin',
  templateUrl: 'signin.component.html',
})

export class SigninComponent {
  constructor(public router: Router, public http: Http) {
  }

  login(event : any, username : string, password: string) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
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
  }

  signup(event : any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
