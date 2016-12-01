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

    @Input() card: Card;

    private modalInstance: NgbModalRef;
    private subscription: Subscription;

    private boardCode: string;
    public items: Card[];
    public board: Board;

    constructor(private activateRoute: ActivatedRoute, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

}
