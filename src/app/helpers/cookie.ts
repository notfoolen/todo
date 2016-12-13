import { Injectable } from '@angular/core';

@Injectable()
export class Cookie {

  constructor() { }

  public get(name: string) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }

  public set(name: string, value: string, expireDays: number, path: string = "") {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }

  public delete(name) {
    this.set(name, "", -1);
  }

}