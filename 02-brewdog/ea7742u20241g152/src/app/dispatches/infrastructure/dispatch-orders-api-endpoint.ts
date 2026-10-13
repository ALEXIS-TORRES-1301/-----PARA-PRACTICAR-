import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';
import {DispatchOrderAssembler} from './dispatch-order-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for dispatch order operations.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrdersApiEndpoint extends BaseApiEndpoint<DispatchOrder, DispatchOrderResource, DispatchOrdersResponse, DispatchOrderAssembler> {
  /**
   * Creates an instance of DispatchOrdersApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchOrdersEndpointPath}`,
      new DispatchOrderAssembler());
  }
}
