import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer  } from 'rxjs/Observer';
import { Subject }    from 'rxjs/Subject';
import { BaseService } from './base.service';
import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
import { User } from '../types';

@Injectable()
export class AccountService {

    public profile: User;
    public profileChange: Subject<User> = new Subject<User>();

    constructor(private _baseService: BaseService) {
    }

    public GetProfile = (): Observable<User> => {
        if (!this.profile) {
            return this._baseService.Get("account")
                .map((resp: Response) => {
                    let data = resp.json();
                    this.profile = new User(data.login, data.email);
                    this.profileChange.next(this.profile);
                    return this.profile;
                });
        }
        return Observable.create((observer: Observer<User>) =>  {
            observer.next(this.profile);
        });
    }

    public SignUp = (login: string, email: string, password: string, repassword: string, ): Observable<Boolean> => {
        let params = {
            login: login,
            email: email,
            password: password,
            repassword: repassword
        };
        return this._baseService.Post("signup", params)
            .map((resp: Response) => {
                let data = resp.json().data;
                this.profile = new User(data.login, data.email);
                this.profileChange.next(this.profile);
                return true;
            });
    }

    public SignIn = (login: string, password: string): Observable<Boolean> => {
        let params = {
            login: login,
            password: password,
        };

        return this._baseService.Post("signin", params)
            .map((resp: Response) => {
                let data = resp.json();
                this.profile = new User(data.login, data.email);
                this.profileChange.next(this.profile);
                return true;
            });
    }

}