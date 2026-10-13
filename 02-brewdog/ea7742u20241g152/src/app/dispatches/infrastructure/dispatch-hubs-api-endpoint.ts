import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';
import {DispatchHubAssembler} from './dispatch-hub-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for dispatch hub operations.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubsApiEndpoint extends BaseApiEndpoint<DispatchHub, DispatchHubResource, DispatchHubsResponse, DispatchHubAssembler> {
  /**
   * Creates an instance of DispatchHubsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchHubsEndpointPath}`,
      new DispatchHubAssembler());
  }
}
