import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services';
import { CardDesk, Card, Board } from '../../types';

@Component({
    selector: 'desk-component',
    templateUrl: 'desk.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document:click)': 'onClick($event)',
    },
})

export class DeskComponent {

    @Input() desk: CardDesk;

    private subscription: Subscription;

    private modalInstance: NgbModalRef;
    public modalLoading: boolean = false;
    closeResult: string;

    public addAreaShown = false;
    private focusEl: any;

    public editCard: Card = new Card();

    constructor(private _eref: ElementRef,
        private activateRoute: ActivatedRoute,
        private modalService: NgbModal,
        private _service: CardService) {
        
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.closeAddArea();
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

    public addCard() {
        this.modalLoading = true;
        this.editCard.deskId = this.desk.id;
        this.editCard.order = 0;

        if (this.desk.cards.length > 0) {
            this.editCard.order = this.desk.cards[this.desk.cards.length - 1].order + 1;
        }

        this._service.AddCard(this.editCard)
            .subscribe(
            data => this.desk.cards.push(data),
            error => console.log(error),
            () => {
                this.editCard = new Card();
            }
            );
    }

    public deleteDesk() {

    }

}
