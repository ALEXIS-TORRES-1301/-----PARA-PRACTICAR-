/**
 * Type of brewery, as classified by the Open Brewery DB API.
 *
 * @remarks
 * Each value matches the `by_type` filter of the breweries endpoint and identifies a single dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
export type BreweryType = 'micro' | 'nano' | 'regional' | 'brewpub' | 'large' | 'contract';

/**
 * Every supported brewery type, in display order.
 */
export const BREWERY_TYPES: readonly BreweryType[] = ['micro', 'nano', 'regional', 'brewpub', 'large', 'contract'];
