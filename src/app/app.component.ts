import { Component, ViewEncapsulation } from '@angular/core';

// AoT compilation doesn't support 'require'.
// import './app.component.scss';
// import '../style/app.scss';
// require('../style/app.scss');

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
    // styleUrls: ['./../style/app.scss'],
})

export class AppComponent { }