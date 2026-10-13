import {BreweryType} from './brewery-type';

/**
 * Represents a destination brewery provided by the external breweries API.
 *
 * @author Alexis Calin Torres Huaman
 */
export class Brewery {
  /**
   * Unique identifier of the brewery (UUID).
   */
  #id: string;

  /**
   * Name of the brewery.
   */
  #name: string;

  /**
   * Type of the brewery.
   */
  #breweryType: BreweryType;

  /**
   * Creates a new brewery entity.
   *
   * @param brewery - Initialization values.
   * @param brewery.id - Unique identifier of the brewery.
   * @param brewery.name - Name of the brewery.
   * @param brewery.breweryType - Type of the brewery.
   */
  constructor(brewery: { id: string; name: string; breweryType: BreweryType }) {
    this.#id = brewery.id;
    this.#name = brewery.name;
    this.#breweryType = brewery.breweryType;
  }

  /**
   * Gets the unique identifier of the brewery.
   * @returns The brewery identifier.
   */
  get id(): string {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the brewery.
   * @param value - The brewery identifier.
   */
  set id(value: string) {
    this.#id = value;
  }

  /**
   * Gets the name of the brewery.
   * @returns The brewery name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Sets the name of the brewery.
   * @param value - The brewery name.
   */
  set name(value: string) {
    this.#name = value;
  }

  /**
   * Gets the type of the brewery.
   * @returns The brewery type.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the type of the brewery.
   * @param value - The brewery type.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }
}
