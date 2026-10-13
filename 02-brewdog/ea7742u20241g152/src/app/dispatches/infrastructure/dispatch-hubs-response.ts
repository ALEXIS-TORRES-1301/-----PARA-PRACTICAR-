import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a dispatch hub exchanged with the platform API.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface DispatchHubResource extends BaseResource {
  /**
   * Unique identifier of the dispatch hub.
   */
  id: number;

  /**
   * Name of the dispatch hub.
   */
  name: string;

  /**
   * Brewery type served by the dispatch hub.
   */
  breweryType: string;

  /**
   * Maximum tonnage the dispatch hub can dispatch.
   */
  maxTonnage: number;
}

/**
 * Response envelope for dispatch hub collection queries.
 */
export interface DispatchHubsResponse extends BaseResponse {
  /**
   * Dispatch hub resources included in the response.
   */
  dispatchHubs: DispatchHubResource[];
}
