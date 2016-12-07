import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BaseService } from '../../services';
import { User } from '../../types';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    providers: []
})

export class HeaderComponent {

    private profile: User;
    private _subscription: Subscription;
    public baseLink = "";

    constructor(private _router: Router, private _service: BaseService) {
        this.profile = _service.profile;
        this._subscription = _service.profileChange.subscribe((value) => {
            this.profile = value;
            this.baseLink = value ? '/boards' : '';
        });
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    public logout() {
        this._service.Logout()
            .subscribe(
            response => {
                this._router.navigate(['/signin']);
            },
            error => {
                console.log(error);
            }
            );
    }

}
