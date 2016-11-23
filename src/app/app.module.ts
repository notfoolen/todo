import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { BoardListComponent, BoardComponent, HomeComponent, SigninComponent, SignupComponent, PageNotFoundComponent } from './pages';
// import { BoardComponent } from './board/board.component';

import { AccountService, BoardService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        BoardListComponent,
        BoardComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        PageNotFoundComponent
    ],
    providers: [
        AccountService,
        BoardService,
        Configuration
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }