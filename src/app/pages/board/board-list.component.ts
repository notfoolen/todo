import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'board-list-component',
    templateUrl: 'board-list.component.html',
    providers: [BoardService]
})

export class BoardListComponent implements OnInit {

    public message: string;
    public values: any[];

    constructor(private _dataService: BoardService) {
        this.message = "Hello from board-list component constructor";
    }

    ngOnInit() {
        this._dataService
            .GetList()
            .subscribe(
            data => this.values = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}
