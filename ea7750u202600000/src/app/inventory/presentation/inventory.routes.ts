import {Routes} from '@angular/router';

const bookReceiptForm = () =>
  import('./views/book-receipt-form/book-receipt-form').then(m => m.BookReceiptForm);

/**
 * Route tree for the inventory bounded context.
 *
 * @author Alexis Torres
 */
export const inventoryRoutes: Routes = [
  {path: 'receipts/new', loadComponent: bookReceiptForm, title: 'Barnes & Noble - Receive Books'}
];
