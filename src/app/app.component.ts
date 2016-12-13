import '../style/init.scss';
import '../style/app.scss';

import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ImageLoader, Preloader, Spinner } from './services';
import { Configuration } from "./app.config"

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
    public bgClass = "";
    public bgColor = "";

    private _bgSubscription: Subscription;
    private _bgColorSubscription: Subscription;

    constructor(private _config: Configuration, 
              private _imageLoader: ImageLoader,
              private _spinner: Spinner) {
        this.bgClass = _config.bgClass;
        this._bgSubscription = _config.bgClassChange.subscribe((value) => {
            this.bgClass = value;
        });
        this.bgColor = _config.bgColor;
        this._bgColorSubscription = _config.bgColorChange.subscribe((value) => {
            this.bgColor = value;
        });

        console.log('3124567');
    }

    public ngAfterViewInit(): void {
        Preloader.load().then((values) => {
            this._spinner.hide();
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