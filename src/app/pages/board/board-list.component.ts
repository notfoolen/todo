import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'board-list-component',
    templateUrl: 'board-list.component.html',
    providers: [BoardService]
})

export class BoardListComponent implements OnInit {

    public items: any[];
    closeResult: string;
    private modalInstance: NgbModalRef; 

    constructor(private _service: BoardService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this._service.GetList()
            .subscribe(
            data => this.items = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }

    openModal(content: any) {
        this.modalInstance = this.modalService.open(content);
        this.modalInstance.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    addBoard(event: Event, title: string, description: string) {
        this._service.Add(title, description)
            .subscribe(
            data => this.items.push(data),
            error => console.log(error),
            () => {
                this.modalInstance.close("Ok");
            }
            );
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
}
