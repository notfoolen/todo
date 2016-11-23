import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class AccountService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public SignUp = (login: string, email: string, password: string, repassword: string, ): Observable<Response> => {
        var params = JSON.stringify({ login: login, email: email, password: password, repassword: repassword });

        let actionUrl = this.actionUrl + "signup";
        return this._http.post(actionUrl, params, { headers: this.headers }).map(res => res.json());
    }

    public SignIn = (login: string, password: string): Observable<Response> => {
        var params = JSON.stringify({ login: login, password: password });

        let actionUrl = this.actionUrl + "signin";
        return this._http.post(actionUrl, params, { headers: this.headers }).map(res => res.json());
    }

}