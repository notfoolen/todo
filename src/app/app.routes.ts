import { Routes, RouterModule } from '@angular/router';
import { BoardComponent, BoardListComponent, SigninComponent, SignupComponent, PageNotFoundComponent } from './pages';
import { AuthGuard } from './common/auth.guard';

const appRoutes: Routes = [
    { path: '', component: BoardListComponent, canActivate: [AuthGuard] },
    { path: 'signin',  component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'board/:code', component: BoardComponent },
    { path: '**',       component: PageNotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);