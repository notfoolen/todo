import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Injectable()
export class Configuration {
    // public Server: string = "http://127.0.0.1:9090/";
    public Server: string = "/";

    public CookieSID: string = "gsid";
    public CookieXSRF: string = "_xsrf";

    public bgClass: string = "simple";
    public bgClassChange: Subject<string> = new Subject<string>();

    public bgColor: string = "";
    public bgColorChange: Subject<string> = new Subject<string>();

    public COLORS = {
        BLUE: 'blue',
        ORANGE: 'orange',
        GREEN: 'green',
        RED: 'red',
        PURPLE: 'purple',
        PINK: 'pink',
        SALAD: 'salad',
        TURQ: 'turq',
        GRAY: 'gray',
        LIGHT: 'light',
    };

    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('bag-desk', {
            direction: 'horizontal',
            ignoreInputTextSelection: false,
            moves: function (el, container, handle) {
                return handle.classList.contains('card-header');
            }
        });
    }

    public setBgClass = (_class: string) => {
        this.bgClass = _class;
        this.bgClassChange.next(_class);
    }

    public setBgColor = (_color: string) => {
        this.bgColor = _color;
        this.bgColorChange.next(_color);
    }
}