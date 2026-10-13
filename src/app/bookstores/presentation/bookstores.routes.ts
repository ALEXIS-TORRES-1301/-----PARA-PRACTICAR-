import {Routes} from '@angular/router';

const bookstoreOverview = () =>
  import('./views/bookstore-overview/bookstore-overview').then(m => m.BookstoreOverview);

/**
 * Route tree for the bookstores bounded context.
 *
 * @author Alexis Torres
 */
export const bookstoresRoutes: Routes = [
  {path: 'overview', loadComponent: bookstoreOverview, title: 'Barnes & Noble - Bookstore Overview'},
  {path: '', redirectTo: 'overview', pathMatch: 'full'}
];
