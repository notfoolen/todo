import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardService, BoardService } from '../../services';
import { CardDesk, Card, Board } from '../../types';

@Component({
    selector: 'board-component',
    templateUrl: 'board.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [CardService, BoardService]
})

export class BoardComponent implements OnInit {

    private modalInstance: NgbModalRef;
    public modalLoading: boolean = false;
    closeResult: string;

    private boardCode: string;
    public desks: CardDesk[];
    public board: Board;

    constructor(private activateRoute: ActivatedRoute, private _service: CardService, private _boardService: BoardService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.boardCode = params['code'];

            this._boardService.Get(this.boardCode)
                .subscribe(
                data => this.board = data,
                error => console.log(error),
                () => console.log('Get board complete')
                );
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    openModal(content: any) {
        this.modalInstance = this.modalService.open(content);
        this.modalInstance.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    addDesk(title: string) {
        this.modalLoading = true;
        this._service.AddCardDesk(title)
            .subscribe(
            data => this.items.push(data),
            error => console.log(error),
            () => {
                this.modalLoading = false;
                this.modalInstance.close("Ok");
            }
            );
    }

}
