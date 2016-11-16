import {Component, ViewEncapsulation} from '@angular/core';

import {BoardService} from './board.service';

@Component({
  selector: 'board',
  encapsulation: ViewEncapsulation.None,
  // styles: [require('./board.scss')],
  template: './board.html'
})
export class Board {

  public boardConfiguration:any;
  private _board:Object;

  constructor(private _boardService:BoardService) {
    this.boardConfiguration = this._boardService.getData();
  }

  public onCalendarReady(calendar):void {
    this._board = calendar;
  }

}
