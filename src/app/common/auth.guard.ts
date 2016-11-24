import { Injectable } from '@angular/core';
import { AccountService } from '../services';
import { Router, CanActivate } from '@angular/router';

import { Subscription }    from 'rxjs/Subscription';


@Injectable()
export class AuthGuard implements CanActivate {

  private flag: boolean = false;
  private _subscription: Subscription;

  constructor(private router: Router, private _service: AccountService) {
    this._service.GetProfile()
      .subscribe(
      user => {
        this.flag = true;
      },
      error => {
        this.flag = false;
      }
      );

    this._subscription = _service.profileChange.subscribe((value) => {
      this.flag = value ? true : false;
    });
  }

  canActivate() {
    if (this.flag) {
      return true;
    }

    return true;
    // this.router.navigate(['/signin']);
  }

}
