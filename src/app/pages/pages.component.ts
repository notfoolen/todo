import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: "<router-outlet></router-outlet>"
})

export class Pages {

  constructor() {
  }

  ngOnInit() {
  }
}
