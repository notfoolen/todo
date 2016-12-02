import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CardService, BoardService } from '../../services';
import { CardDesk, Card, Board, CardReorderView } from '../../types';

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

    constructor(private activateRoute: ActivatedRoute,
        private modalService: NgbModal,
        private dragulaService: DragulaService,
        private _service: CardService,
        private _boardService: BoardService) {

        dragulaService.dropModel.subscribe((value) => {
            if (value[0] == 'bag-desk') {
                this.reorderDesks(value);
            } else if (value[0] == 'bag-card') {
                this.reorderCards(value);
            }
        });
    }

    private reorderDesks(args) {
        this._service.ReorderDesks(this.desks.map(function (item) { return item.id }))
            .subscribe(
            data => { },
            error => console.log(error),
            () => console.log('Reorder cards complete')
            );
    }

    private reorderCards(args) {
        let [bagName, el, target, source] = args;

        let targetDeskId = +target.getAttribute('id');
        let sourceDeskId = +source.getAttribute('id');

        let targetDesk = this.desks.find(item => item.id == targetDeskId);
        let desks = [new CardReorderView(targetDeskId, targetDesk.cards.map(function (a) { return a.id; }))];

        if (targetDeskId != sourceDeskId) {
            let sourceDesk = this.desks.find(item => item.id == sourceDeskId);
            desks.push(new CardReorderView(sourceDeskId, sourceDesk.cards.map(function (a) { return a.id; })));
        }

        this._service.ReorderCards(desks)
            .subscribe(
            data => { },
            error => console.log(error),
            () => console.log('Reorder cards complete')
            );
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

            this._service.GetDeskList(this.boardCode)
                .subscribe(
                data => this.desks = data,
                error => console.log(error),
                () => console.log('Get desk list complete')
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
            data => this.desks.push(data),
            error => console.log(error),
            () => {
                this.modalLoading = false;
                this.modalInstance.close("Ok");
            }
            );
    }

}
