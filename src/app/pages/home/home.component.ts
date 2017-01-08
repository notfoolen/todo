import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BaseService } from '../../services';
import { User } from '../../types';
import { Configuration } from '../../app.config';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent {

    public banner: string;
    private profile: User;
    private _subscription: Subscription;
    public baseLink = "";

    constructor(private router: Router,
    private http: Http,
    private _config: Configuration,
    private _service: BaseService) {
        _config.setBgClass(_config.COLORS.BLUE);
        
        this.profile = _service.profile;
        this._subscription = _service.profileChange.subscribe((value) => {
            this.profile = value;
            this.baseLink = value ? '/boards' : '/signin';
        });
    }

}
