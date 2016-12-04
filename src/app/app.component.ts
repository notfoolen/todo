import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Configuration } from "./app.config"

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
    public bgClass = "";
    public bgColor = "";

    private _bgSubscription: Subscription;
    private _bgColorSubscription: Subscription;

    constructor(private _config: Configuration) {
        this.bgClass = _config.bgClass;
        this._bgSubscription = _config.bgClassChange.subscribe((value) => {
            this.bgClass = value;
        });
        this.bgColor = _config.bgColor;
        this._bgColorSubscription = _config.bgColorChange.subscribe((value) => {
            this.bgColor = value;
        });
    }

    ngOnDestroy() {
        if (this._bgSubscription) {
            this._bgSubscription.unsubscribe();
        }
        if (this._bgColorSubscription) {
            this._bgColorSubscription.unsubscribe();
        }
    }
}