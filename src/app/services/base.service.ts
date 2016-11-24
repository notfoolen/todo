import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class BaseService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.Server + 'api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-Xsrftoken', this.getXSRF());
    }

    public Get = (url: string, params?: any[]): Observable<Response> => {
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
        let xsrf = this.getCookie('_xsrf');
        /*
        if (!xsrf) {
            xsrf = document.querySelector('meta[property="xsrf"]')['content'];
            if (!xsrf) {
                return null;
            }
        }
        */
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

}