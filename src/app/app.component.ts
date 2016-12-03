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

    private _bgSubscription: Subscription;

    constructor(private _config: Configuration) {
        this.bgClass = _config.bgClass;
        this._bgSubscription = _config.bgClassChange.subscribe((value) => {
            this.bgClass = value;
        });
    }

    ngOnDestroy() {
        if (this._bgSubscription) {
            this._bgSubscription.unsubscribe();
        }
    }
}