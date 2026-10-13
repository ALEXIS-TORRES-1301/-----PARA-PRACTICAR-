import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

/**
 * Represents a freight dispatch order from a dispatch hub to a destination brewery.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrder implements BaseEntity {
  /**
   * Unique identifier of the dispatch order.
   */
  #id: number;

  /**
   * Identifier of the dispatch hub that ships the order.
   */
  #dispatchHubId: number;

  /**
   * Type of the destination brewery.
   */
  #breweryType: BreweryType;

  /**
   * Identifier of the destination brewery.
   */
  #breweryId: string;

  /**
   * Name of the destination brewery.
   */
  #breweryName: string;

  /**
   * Tonnage assigned to the order.
   */
  #assignedTonnage: number;

  /**
   * Date and time when the order was dispatched.
   */
  #dispatchedAt: Date;

  /**
   * Creates a new DispatchOrder entity.
   *
   * @param dispatchOrder - Initialization values.
   * @param dispatchOrder.id - Unique identifier of the dispatch order.
   * @param dispatchOrder.dispatchHubId - Identifier of the dispatch hub that ships the order.
   * @param dispatchOrder.breweryType - Type of the destination brewery.
   * @param dispatchOrder.breweryId - Identifier of the destination brewery.
   * @param dispatchOrder.breweryName - Name of the destination brewery.
   * @param dispatchOrder.assignedTonnage - Tonnage assigned to the order.
   * @param dispatchOrder.dispatchedAt - Date and time when the order was dispatched.
   */
  constructor(dispatchOrder: { id: number; dispatchHubId: number; breweryType: BreweryType; breweryId: string; breweryName: string; assignedTonnage: number; dispatchedAt: Date }) {
    this.#id = dispatchOrder.id;
    this.#dispatchHubId = dispatchOrder.dispatchHubId;
    this.#breweryType = dispatchOrder.breweryType;
    this.#breweryId = dispatchOrder.breweryId;
    this.#breweryName = dispatchOrder.breweryName;
    this.#assignedTonnage = dispatchOrder.assignedTonnage;
    this.#dispatchedAt = dispatchOrder.dispatchedAt;
  }

  /**
   * Gets the unique identifier of the dispatch order.
   * @returns The unique identifier of the dispatch order.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the dispatch order.
   * @param value - The unique identifier of the dispatch order.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the identifier of the dispatch hub that ships the order.
   * @returns The identifier of the dispatch hub that ships the order.
   */
  get dispatchHubId(): number {
    return this.#dispatchHubId;
  }

  /**
   * Sets the identifier of the dispatch hub that ships the order.
   * @param value - The identifier of the dispatch hub that ships the order.
   */
  set dispatchHubId(value: number) {
    this.#dispatchHubId = value;
  }

  /**
   * Gets the type of the destination brewery.
   * @returns The type of the destination brewery.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the type of the destination brewery.
   * @param value - The type of the destination brewery.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  /**
   * Gets the identifier of the destination brewery.
   * @returns The identifier of the destination brewery.
   */
  get breweryId(): string {
    return this.#breweryId;
  }

  /**
   * Sets the identifier of the destination brewery.
   * @param value - The identifier of the destination brewery.
   */
  set breweryId(value: string) {
    this.#breweryId = value;
  }

  /**
   * Gets the name of the destination brewery.
   * @returns The name of the destination brewery.
   */
  get breweryName(): string {
    return this.#breweryName;
  }

  /**
   * Sets the name of the destination brewery.
   * @param value - The name of the destination brewery.
   */
  set breweryName(value: string) {
    this.#breweryName = value;
  }

  /**
   * Gets the tonnage assigned to the order.
   * @returns The tonnage assigned to the order.
   */
  get assignedTonnage(): number {
    return this.#assignedTonnage;
  }

  /**
   * Sets the tonnage assigned to the order.
   * @param value - The tonnage assigned to the order.
   */
  set assignedTonnage(value: number) {
    this.#assignedTonnage = value;
  }

  /**
   * Gets the date and time when the order was dispatched.
   * @returns The date and time when the order was dispatched.
   */
  get dispatchedAt(): Date {
    return this.#dispatchedAt;
  }

  /**
   * Sets the date and time when the order was dispatched.
   * @param value - The date and time when the order was dispatched.
   */
  set dispatchedAt(value: Date) {
    this.#dispatchedAt = value;
  }
}
