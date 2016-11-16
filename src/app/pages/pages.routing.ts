import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { Dashboard } from './dashboard';
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', loadChildren: () => System.import('./static/js/pages/dashboard/dashboard.module.js') }
      { path: 'dashboard', component: Dashboard }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
