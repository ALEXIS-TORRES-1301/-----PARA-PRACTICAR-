/**
 * Resource representation of a brewery returned by the Open Brewery DB API.
 *
 * @remarks
 * Property names follow the provider (snake_case); the assembler maps them to the domain entity.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface BreweryResource {
  /**
   * Unique identifier of the brewery (UUID).
   */
  id: string;

  /**
   * Name of the brewery.
   */
  name: string;

  /**
   * Type of the brewery.
   */
  brewery_type: string;

  /**
   * City where the brewery is located.
   */
  city?: string;

  /**
   * Country where the brewery is located.
   */
  country?: string;
}

/**
 * Response returned by the breweries endpoint: a JSON array of brewery resources.
 */
export type BreweriesResponse = BreweryResource[];
