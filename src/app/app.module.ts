import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import {
  HeaderComponent,
  BoardListComponent,
  BoardComponent,
  HomeComponent,
  SigninComponent,
  SignupComponent,
  PageNotFoundComponent
} from './pages';
import {
  SpinnerComponent
} from './directives';

import {
  DeskComponent
} from './components';

import {
  ImageLoader,
  Preloader,
  Spinner,
  BaseService,
  BoardService
} from './services';

import { AuthGuard } from './common';
import { Cookie } from './helpers';
import { Configuration } from './app.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { ClickOutsideModule } from 'ng2-click-outside';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  Cookie,
  Configuration,
  ImageLoader,
  Preloader,
  Spinner,
  BaseService,
  BoardService,
  AuthGuard,
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    DragulaModule,
    ClickOutsideModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardListComponent,
    BoardComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    PageNotFoundComponent,

    DeskComponent
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent],
})


export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}