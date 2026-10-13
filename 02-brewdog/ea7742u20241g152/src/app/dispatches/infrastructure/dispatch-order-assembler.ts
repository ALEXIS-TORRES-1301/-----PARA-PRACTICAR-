import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';

/**
 * Maps dispatch order entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrderAssembler implements BaseAssembler<DispatchOrder, DispatchOrderResource, DispatchOrdersResponse> {
  /**
   * Converts a DispatchOrdersResponse to an array of DispatchOrder entities.
   * @param response - The API response containing dispatch orders.
   * @returns An array of DispatchOrder entities.
   */
  toEntitiesFromResponse = (response: DispatchOrdersResponse): DispatchOrder[] =>
    response.dispatchOrders.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DispatchOrderResource to a DispatchOrder entity.
   * @param resource - The resource to convert.
   * @returns The converted DispatchOrder entity.
   */
  toEntityFromResource = (resource: DispatchOrderResource): DispatchOrder =>
    new DispatchOrder({
      id: resource.id,
      dispatchHubId: resource.dispatchHubId,
      breweryType: resource.breweryType as BreweryType,
      breweryId: resource.breweryId,
      breweryName: resource.breweryName,
      assignedTonnage: resource.assignedTonnage,
      dispatchedAt: new Date(resource.dispatchedAt)
    });

  /**
   * Converts a DispatchOrder entity to a DispatchOrderResource.
   * @param entity - The entity to convert.
   * @returns The converted DispatchOrderResource.
   */
  toResourceFromEntity = (entity: DispatchOrder): DispatchOrderResource => ({
    id: entity.id,
    dispatchHubId: entity.dispatchHubId,
    breweryType: entity.breweryType,
    breweryId: entity.breweryId,
    breweryName: entity.breweryName,
    assignedTonnage: entity.assignedTonnage,
    dispatchedAt: entity.dispatchedAt.toISOString()
  });
}
