import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _service: BaseService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._service.IsLogged();
  }

}
