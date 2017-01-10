import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Configuration } from '../../app.config';
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
    public desks: CardDesk[] = [];
    public board: Board;

    public addDeskShown = false;

    public eDesk: CardDesk = new CardDesk();

    constructor(private _eref: ElementRef,
        private _router: Router,
        private activateRoute: ActivatedRoute,
        private modalService: NgbModal,
        private _dragulaService: DragulaService,
        private _config: Configuration,
        private _service: CardService,
        private _boardService: BoardService) {

        _config.setBgClass(_config.COLORS.LIGHT);
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.boardCode = params['code'];

            this._boardService.Get(this.boardCode)
                .subscribe(
                data => {
                    this.board = data;
                    this._config.setBgColor(this.board.color);
                },
                error => console.log(error),
                () => console.log('Get board complete')
                );

            this._service.GetDeskList(this.boardCode)
                .subscribe(
                data => {
                    this.desks = data;
                    this._dragulaService.dropModel.subscribe((value) => {
                        if (value[0] == 'bag-desk') {
                            this.reorderDesks(value);
                        } else if (value[0] == 'bag-card') {
                            this.reorderCards(value);
                        }
                    });
                    console.log(this.desks);
                },
                error => console.log(error),
                () => console.log('Get desk list complete')
                );

        });
    }

    ngOnDestroy() {
        this._config.setBgColor("");
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

    public closeAddDeskArea(): void {
        this.addDeskShown = false;
    }

    public showAddDeskArea(el?: any): void {
        this.addDeskShown = true;
        if (el) {
            setTimeout(_ =>
                el.focus()
            );
        }
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

    addDesk() {
        if (!this.eDesk.title) {
            return;
        }
        this.eDesk.order = 0;

        if (this.desks.length > 0) {
            this.eDesk.order = this.desks[this.desks.length - 1].order + 1;
        }
        this._service.AddDesk(this.eDesk, this.boardCode)
            .subscribe(
            data => this.desks.push(data),
            error => console.log(error),
            () => {
                this.modalLoading = false;
                // this.modalInstance.close("Ok");
                this.eDesk = new CardDesk();
            },
        );
    }

    deleteDesk(id: number) {
        let deleteDesk = this.desks.find(item => item.id == id);
        this.modalLoading = true;
        this._service.DeleteDesk(id)
            .subscribe(
            data => {
                var index = this.desks.indexOf(deleteDesk, 0);
                if (index > -1) {
                    this.desks.splice(index, 1);
                }
            },
            error => console.log(error),
            () => {
                this.modalLoading = false;
                // this.modalInstance.close("Ok");
            }
            );
    }

    deleteBoard() {
        this._boardService.DeleteBoard(this.boardCode)
            .subscribe(
            data => {
                this.board = null;
                this._router.navigate(['/boards']);
            },
            error => console.log(error),
            () => {
                this.modalLoading = false;
            }
            );
    }

}
