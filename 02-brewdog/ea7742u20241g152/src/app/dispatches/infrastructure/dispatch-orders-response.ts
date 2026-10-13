import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a dispatch order exchanged with the platform API.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface DispatchOrderResource extends BaseResource {
  /**
   * Unique identifier of the dispatch order.
   */
  id: number;

  /**
   * Identifier of the dispatch hub that ships the order.
   */
  dispatchHubId: number;

  /**
   * Type of the destination brewery.
   */
  breweryType: string;

  /**
   * Identifier of the destination brewery.
   */
  breweryId: string;

  /**
   * Name of the destination brewery.
   */
  breweryName: string;

  /**
   * Tonnage assigned to the order.
   */
  assignedTonnage: number;

  /**
   * ISO-8601 date and time when the order was dispatched.
   */
  dispatchedAt: string;
}

/**
 * Response envelope for dispatch order collection queries.
 */
export interface DispatchOrdersResponse extends BaseResponse {
  /**
   * Dispatch order resources included in the response.
   */
  dispatchOrders: DispatchOrderResource[];
}
