import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { Cookie } from '../helpers';
import { Configuration } from '../app.constants';
import { User } from '../types';

@Injectable()
export class BaseService {

    private actionUrl: string;
    private headers: Headers;

    public profile: User;
    public profileChange: Subject<User> = new Subject<User>();

    public setProfile = (profile: User) => {
        this.profile = profile;
        this.profileChange.next(this.profile);
    }

    constructor(public router: Router,
        private _http: Http,
        private _configuration: Configuration,
        private _cookie: Cookie) {

        this.actionUrl = _configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-Xsrftoken', this.getXSRF());

        this.GetProfile()
            .subscribe(
            user => {
                this.setProfile(user);
            },
            error => {
                this.setProfile(null);
            }
            );
    }

    public Get = (url: string, params?: any): Observable<Response> => {
        let searchParams: URLSearchParams = new URLSearchParams();
        for (var key in params) {
            searchParams.set(key, params[key]);
        }

        let actionUrl = this.actionUrl + url;
        return this._http.get(actionUrl, { search: searchParams, headers: this.headers });//.map(res => res.json());
    }

    public Post = (url: string, params?: any): Observable<Response> => {
        var jsonParams = JSON.stringify(params);

        let actionUrl = this.actionUrl + url;
        return this._http.post(actionUrl, jsonParams, { headers: this.headers });// .map(res => res.json());
    }

    public Put = (url: string, params: any): Observable<Response> => {
        var jsonParams = JSON.stringify(params);

        let actionUrl = this.actionUrl + url;
        return this._http.put(actionUrl, jsonParams, { headers: this.headers });// .map(res => res.json());
    }

    public Delete = (url: string, params: any[]): Observable<Response> => {
        let searchParams: URLSearchParams = new URLSearchParams();
        for (var key in params) {
            searchParams.set(key, params[key]);
        }

        let actionUrl = this.actionUrl + url;
        return this._http.delete(actionUrl, { search: searchParams, headers: this.headers });// .map(res => res.json());
    }

    private getXSRF(): string {
        let xsrf = this._cookie.get(this._configuration.CookieXSRF);
        if (!xsrf) {
            return null;
        }
        let xsrflist = xsrf.split("|");
        return window.atob(xsrflist[0]);
    }

    private getCookie(name: string) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }

    public GetProfile = (): Observable<User> => {
        if (!this.profile) {
            return this.Get("account")
                .map((resp: Response) => {
                    let data = resp.json();
                    this.setProfile(new User(data.login, data.email));
                    return this.profile;
                });
        }
        return Observable.create((observer: Observer<User>) => {
            observer.next(this.profile);
        });
    }

    public IsLogged = (): Observable<boolean> => {
        return this.GetProfile().map((user: User) => {
            return user ? true : false;
        });
    }

    public SignUp = (login: string, email: string, password: string, repassword: string, ): Observable<Boolean> => {
        let params = {
            login: login,
            email: email,
            password: password,
            repassword: repassword
        };
        return this.Post("signup", params)
            .map((resp: Response) => {
                let data = resp.json().data;
                this.setProfile(new User(data.login, data.email));
                return true;
            });
    }

    public SignIn = (login: string, password: string): Observable<Boolean> => {
        let params = {
            login: login,
            password: password,
        };

        return this.Post("signin", params)
            .map((resp: Response) => {
                let data = resp.json();
                this.setProfile(new User(data.login, data.email));
                return true;
            });
    }

    public Logout() {
        // this._cookie.delete(this._configuration.CookieSID);
        // this._cookie.delete(this._configuration.CookieXSRF);

        return this.Get("logout")
            .map((resp: Response) => {
                // this.router.navigate(['/logout']);
                this.setProfile(null);;
                return true;
            });
    }

}