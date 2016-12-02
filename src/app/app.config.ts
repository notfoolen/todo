import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Injectable()
export class Configuration {
    public Server: string = "http://127.0.0.1:9090/";

    public CookieSID: string = "gsid";
    public CookieXSRF: string = "_xsrf";


    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('bag-desk', {
            direction: 'horizontal',
            ignoreInputTextSelection: false,
            moves: function (el, container, handle) {
                return handle.classList.contains('card-header');
            }
        });
    }
}