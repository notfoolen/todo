import { Injectable } from '@angular/core';

@Injectable()
export class Spinner {

  private _selector: string = 'preloader';
  private _element: HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  public show(): void {
    this._element.style['display'] = 'block';
    this._element.style['opacity'] = '1';
  }

  public hide(delay: number = 0, animateDelay: number = 0): void {
    setTimeout(() => {
      this._element.style['opacity'] = '0';
      setTimeout(() => {
        this._element.style['display'] = 'none';
      }, animateDelay);
    }, delay);
  }
}
