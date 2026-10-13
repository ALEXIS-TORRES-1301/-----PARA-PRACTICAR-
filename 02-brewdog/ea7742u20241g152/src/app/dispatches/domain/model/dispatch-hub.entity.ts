import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

/**
 * Represents a BrewDog dispatch hub that ships orders to breweries of a single type.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHub implements BaseEntity {
  /**
   * Unique identifier of the dispatch hub.
   */
  #id: number;

  /**
   * Name of the dispatch hub.
   */
  #name: string;

  /**
   * Brewery type served by the dispatch hub.
   */
  #breweryType: BreweryType;

  /**
   * Maximum tonnage the dispatch hub can dispatch.
   */
  #maxTonnage: number;

  /**
   * Creates a new DispatchHub entity.
   *
   * @param dispatchHub - Initialization values.
   * @param dispatchHub.id - Unique identifier of the dispatch hub.
   * @param dispatchHub.name - Name of the dispatch hub.
   * @param dispatchHub.breweryType - Brewery type served by the dispatch hub.
   * @param dispatchHub.maxTonnage - Maximum tonnage the dispatch hub can dispatch.
   */
  constructor(dispatchHub: { id: number; name: string; breweryType: BreweryType; maxTonnage: number }) {
    this.#id = dispatchHub.id;
    this.#name = dispatchHub.name;
    this.#breweryType = dispatchHub.breweryType;
    this.#maxTonnage = dispatchHub.maxTonnage;
  }

  /**
   * Gets the unique identifier of the dispatch hub.
   * @returns The unique identifier of the dispatch hub.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the dispatch hub.
   * @param value - The unique identifier of the dispatch hub.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the name of the dispatch hub.
   * @returns The name of the dispatch hub.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Sets the name of the dispatch hub.
   * @param value - The name of the dispatch hub.
   */
  set name(value: string) {
    this.#name = value;
  }

  /**
   * Gets the brewery type served by the dispatch hub.
   * @returns The brewery type served by the dispatch hub.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the brewery type served by the dispatch hub.
   * @param value - The brewery type served by the dispatch hub.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  /**
   * Gets the maximum tonnage the dispatch hub can dispatch.
   * @returns The maximum tonnage the dispatch hub can dispatch.
   */
  get maxTonnage(): number {
    return this.#maxTonnage;
  }

  /**
   * Sets the maximum tonnage the dispatch hub can dispatch.
   * @param value - The maximum tonnage the dispatch hub can dispatch.
   */
  set maxTonnage(value: number) {
    this.#maxTonnage = value;
  }
}
