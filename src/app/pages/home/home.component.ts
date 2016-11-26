import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
// import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    providers: [
        /*
        AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('id_token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        })
        */
    ]
})

export class HomeComponent {

    public message: string;
    jwt: string;
    decodedJwt: string;
    response: string;
    api: string;
    // jwtHelper: JwtHelper = new JwtHelper();

    constructor(public router: Router, public http: Http/*, public authHttp: AuthHttp*/) {
        this.message = "Hello from HomeComponent constructor";

        // this.jwt = localStorage.getItem('id_token');
        // this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt);
    }

    logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    }

    callAnonymousApi() {
        this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
    }

    callSecuredApi() {
        this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    }

    _callApi(type: string, url: string) {
        this.response = null;
        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(
                    response => this.response = response.text(),
                    error => this.response = error.text()
                );
        }
        /*
        if (type === 'Secured') {
            // For protected routes, use AuthHttp1
            this.authHttp.get(url)
                .subscribe(
                    response => this.response = response.text(),
                    error => this.response = error.text()
                );
        }
        */
    }

}
