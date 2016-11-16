import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { Board } from './board';
import { BoardService } from './board/board.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    Board,
    Dashboard
  ],
  providers: [
    BoardService,
  ]
})
export default class DashboardModule {}
