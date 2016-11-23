import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'board-component',
    templateUrl: 'board.component.html',
    providers: []
})

export class BoardComponent implements OnInit {

    public message: string;
    public values: any[];

    constructor() {
        this.message = "Hello from HomeComponent constructor";
    }

    ngOnInit() {
    }
}
