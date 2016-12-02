import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: '<div class="spinner {{class}}" [hidden]="!loading"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
})

export class SpinnerComponent {
  @Input() loading: boolean;
  @Input() class: string;
}