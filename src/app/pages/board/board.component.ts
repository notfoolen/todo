import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardService, BoardService } from '../../services';
import { CardList, Card, Board } from '../../types';

@Component({
    selector: 'board-component',
    templateUrl: 'board.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [CardService, BoardService]
})

export class BoardComponent implements OnInit {

    private modalInstance: NgbModalRef;
    private subscription: Subscription;

    private boardCode: string;
    public items: Card[];
    public board: Board;

    constructor(private activateRoute: ActivatedRoute, private _service: CardService, private _boardService: BoardService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.subscription = this.activateRoute.params.subscribe(params => {
            this.boardCode = params['code'];

            this._boardService.Get(this.boardCode)
                .subscribe(
                data => this.board = data,
                error => console.log(error),
                () => console.log('Get board complete')
                );
        });

    }

}
