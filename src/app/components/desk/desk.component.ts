import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardDesk, Card, Board } from '../../types';

@Component({
    selector: 'desk-component',
    templateUrl: 'desk.component.html',
    encapsulation: ViewEncapsulation.None
})

export class DeskComponent implements OnInit {

    @Input() desk: CardDesk;

    private modalInstance: NgbModalRef;
    public modalLoading: boolean = false;
    closeResult: string;
    private subscription: Subscription;

    private boardCode: string;
    public items: Card[];
    public board: Board;

    constructor(private activateRoute: ActivatedRoute, private modalService: NgbModal) {
    }

    ngOnInit() {
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

}
