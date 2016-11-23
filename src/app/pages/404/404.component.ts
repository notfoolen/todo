import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

@Component({
  selector: 'page-not-found',
  templateUrl: '404.component.html'
})

export class PageNotFoundComponent {

  constructor(public router: Router, public http: Http) {
  }

}
