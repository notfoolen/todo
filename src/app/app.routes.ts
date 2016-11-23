import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent, BoardComponent, HomeComponent, SigninComponent, SignupComponent, PageNotFoundComponent } from './pages';
import { AuthGuard } from './common/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'boards', component: BoardListComponent, canActivate: [AuthGuard] },
    { path: 'signin',  component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**',       component: PageNotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);