import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesResponse, BreweryResource} from './breweries-response';

/**
 * Maps brewery resources from the external API into brewery entities.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BreweryAssembler {
  /**
   * Converts a BreweriesResponse to an array of Brewery entities.
   * @param response - The API response containing breweries.
   * @returns An array of Brewery entities.
   */
  toEntitiesFromResponse = (response: BreweriesResponse): Brewery[] =>
    (response ?? []).map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BreweryResource to a Brewery entity, mapping `brewery_type` to `breweryType`.
   * @param resource - The resource to convert.
   * @returns The converted Brewery entity.
   */
  toEntityFromResource = (resource: BreweryResource): Brewery =>
    new Brewery({
      id: resource.id,
      name: resource.name,
      breweryType: resource.brewery_type as BreweryType
    });
}
