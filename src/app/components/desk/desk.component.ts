import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services';
import { CardDesk, Card, Board } from '../../types';

@Component({
    selector: 'desk-component',
    templateUrl: 'desk.component.html',
    encapsulation: ViewEncapsulation.None
})

export class DeskComponent {

    @Input() desk: CardDesk;
    @Output() deleteDesk = new EventEmitter<number>();

    private subscription: Subscription;

    private modalInstance: NgbModalRef;
    public loading: boolean = false;
    closeResult: string;

    public addAreaShown = false;
    private focusEl: any;

    public eCard: Card = new Card();

    constructor(private _eref: ElementRef,
        private activateRoute: ActivatedRoute,
        private modalService: NgbModal,
        private _service: CardService) {

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


    public closeAddArea(): void {
        this.addAreaShown = false;
    }

    public showAddArea(el?: any): void {
        this.addAreaShown = true;
        if (el) {
            setTimeout(_ =>
                el.focus()
            );
        }
    }

    public openModal(content: any) {
        this.modalInstance = this.modalService.open(content);
        this.modalInstance.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    public _deleteDesk() {
        this.deleteDesk.emit(this.desk.id);
    }

    public addCard() {
        if (!this.eCard.title) {
            return;
        }
        this.loading = true;
        this.eCard.deskId = this.desk.id;
        this.eCard.order = 0;

        if (this.desk.cards.length > 0) {
            this.eCard.order = this.desk.cards[this.desk.cards.length - 1].order + 1;
        }

        this._service.AddCard(this.eCard)
            .subscribe(
            data => this.desk.cards.push(data),
            error => console.log(error),
            () => {
                this.eCard = new Card();
            }
            );
    }

    public editCard() {
    }

    public deleteCard(id: number) {
        let deleteCard = this.desk.cards.find(item => item.id == id);
        this._service.DeleteCard(id)
            .subscribe(
            data => {
                var index = this.desk.cards.indexOf(deleteCard, 0);
                if (index > -1) {
                    this.desk.cards.splice(index, 1);
                }
            },
            error => console.log(error),
            () => {
            }
            );
    }

}
