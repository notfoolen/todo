import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent, BoardListComponent, HomeComponent, SigninComponent, SignupComponent, PageNotFoundComponent } from './pages';

import { BaseService, AccountService, BoardService } from './services';
import { AuthGuard } from './common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
        HttpModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        BoardListComponent,
        HomeComponent,
        SigninComponent,
        SignupComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthGuard,
        BaseService,
        AccountService,
        BoardService,
        Configuration
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }