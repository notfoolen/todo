import { Component } from '@angular/core';
import { BaseService } from '../../services';
import { User } from '../../types';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    providers: []
})

export class HeaderComponent {

    private profile: User;
    private _subscription: Subscription;

    constructor(private _service: BaseService) {
        this.profile = _service.profile;
        this._subscription = _service.profileChange.subscribe((value) => {
            this.profile = value;
        });
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    public logout() {
        this._service.logout();
    }

}
