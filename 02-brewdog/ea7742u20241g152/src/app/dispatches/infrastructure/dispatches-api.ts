import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchHubsApiEndpoint} from './dispatch-hubs-api-endpoint';
import {DispatchOrdersApiEndpoint} from './dispatch-orders-api-endpoint';

/**
 * Infrastructure facade for dispatch hub and dispatch order endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class DispatchesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly dispatchHubsEndpoint = new DispatchHubsApiEndpoint(this.http);
  private readonly dispatchOrdersEndpoint = new DispatchOrdersApiEndpoint(this.http);

  /**
   * Retrieves all dispatch hubs.
   * @returns Stream with the dispatch hub collection.
   */
  getDispatchHubs = (): Observable<DispatchHub[]> =>
    this.dispatchHubsEndpoint.getAll();

  /**
   * Retrieves all dispatch orders.
   * @returns Stream with the dispatch order collection.
   */
  getDispatchOrders = (): Observable<DispatchOrder[]> =>
    this.dispatchOrdersEndpoint.getAll();

  /**
   * Creates a new dispatch order.
   * @param dispatchOrder - The dispatch order to create.
   * @returns Stream with the created dispatch order.
   */
  createDispatchOrder = (dispatchOrder: DispatchOrder): Observable<DispatchOrder> =>
    this.dispatchOrdersEndpoint.create(dispatchOrder);
}
