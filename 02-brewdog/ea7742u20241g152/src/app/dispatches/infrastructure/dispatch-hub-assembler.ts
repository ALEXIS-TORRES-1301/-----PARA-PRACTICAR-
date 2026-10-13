import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';

/**
 * Maps dispatch hub entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubAssembler implements BaseAssembler<DispatchHub, DispatchHubResource, DispatchHubsResponse> {
  /**
   * Converts a DispatchHubsResponse to an array of DispatchHub entities.
   * @param response - The API response containing dispatch hubs.
   * @returns An array of DispatchHub entities.
   */
  toEntitiesFromResponse = (response: DispatchHubsResponse): DispatchHub[] =>
    response.dispatchHubs.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DispatchHubResource to a DispatchHub entity.
   * @param resource - The resource to convert.
   * @returns The converted DispatchHub entity.
   */
  toEntityFromResource = (resource: DispatchHubResource): DispatchHub =>
    new DispatchHub({
      id: resource.id,
      name: resource.name,
      breweryType: resource.breweryType as BreweryType,
      maxTonnage: resource.maxTonnage
    });

  /**
   * Converts a DispatchHub entity to a DispatchHubResource.
   * @param entity - The entity to convert.
   * @returns The converted DispatchHubResource.
   */
  toResourceFromEntity = (entity: DispatchHub): DispatchHubResource => ({
    id: entity.id,
    name: entity.name,
    breweryType: entity.breweryType,
    maxTonnage: entity.maxTonnage
  });
}
