import {Routes} from '@angular/router';

const dispatchOrderForm = () =>
  import('./views/dispatch-order-form/dispatch-order-form').then(m => m.DispatchOrderForm);

/**
 * Route tree for the dispatches bounded context.
 *
 * @author Alexis Calin Torres Huaman
 */
export const dispatchesRoutes: Routes = [
  {path: 'orders/new', loadComponent: dispatchOrderForm, title: 'BrewDog - New Dispatch Order'}
];
