import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://127.0.0.1:9090/";

    public CookieSID: string = "gsid";
    public CookieXSRF: string = "_xsrf";
}