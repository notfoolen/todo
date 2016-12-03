import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Configuration } from '../../app.config';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent {

    public banner: string;

    constructor(public router: Router, public http: Http, private _config: Configuration) {
        _config.setBgClass(_config.COLORS.BLUE);

        let banners = [
            '/assets/img/home-todo-1.jpg',
            '/assets/img/home-todo-2.jpg',
            '/assets/img/home-todo-3.jpg',
            '/assets/img/home-todo-4.jpg',
            '/assets/img/home-todo-5.jpg',
        ];

        let rnd = Math.floor(Math.random() * 5);  
        this.banner = banners[rnd];
    }

}
