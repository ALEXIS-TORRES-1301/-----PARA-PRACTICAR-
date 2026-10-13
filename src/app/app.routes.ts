import {Routes} from '@angular/router';

const bookstoresRoutes = () => import('./bookstores/presentation/bookstores.routes').then(m => m.bookstoresRoutes);
const inventoryRoutes = () => import('./inventory/presentation/inventory.routes').then(m => m.inventoryRoutes);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);

/**
 * Root route configuration that composes bounded-context routes.
 *
 * @author Alexis Torres
 */
export const routes: Routes = [
  {path: 'bookstores', loadChildren: bookstoresRoutes},
  {path: 'inventory', loadChildren: inventoryRoutes},
  {path: '', redirectTo: '/bookstores/overview', pathMatch: 'full'},
  {path: '**', loadComponent: pageNotFound, title: 'Barnes & Noble - Page Not Found'}
];
