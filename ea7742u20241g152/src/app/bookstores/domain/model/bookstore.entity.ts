import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {Specialty} from '../../../shared/domain/model/specialty';

/**
 * Represents a Barnes & Noble bookstore specialized in one literary specialty.
 *
 * @author Alexis Calin Torres Huaman
 */
export class Bookstore implements BaseEntity {
  /**
   * Unique identifier of the bookstore.
   */
  #id: number;

  /**
   * Display name of the bookstore.
   */
  #name: string;

  /**
   * Specialty of the books sold by the bookstore.
   */
  #specialty: Specialty;

  /**
   * Minimum copies each book should have before replenishment.
   */
  #minimumCopies: number;

  /**
   * Creates a new bookstore entity.
   *
   * @param bookstore - Initialization values.
   * @param bookstore.id - Unique identifier.
   * @param bookstore.name - Display name of the bookstore.
   * @param bookstore.specialty - Specialty of the books sold by the bookstore.
   * @param bookstore.minimumCopies - Minimum copies each book should have before replenishment.
   */
  constructor(bookstore: { id: number; name: string; specialty: Specialty; minimumCopies: number }) {
    this.#id = bookstore.id;
    this.#name = bookstore.name;
    this.#specialty = bookstore.specialty;
    this.#minimumCopies = bookstore.minimumCopies;
  }

  /**
   * Gets the unique identifier of the bookstore.
   * @returns The unique identifier of the bookstore.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the bookstore.
   * @param value - The unique identifier of the bookstore.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the display name of the bookstore.
   * @returns The display name of the bookstore.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Sets the display name of the bookstore.
   * @param value - The display name of the bookstore.
   */
  set name(value: string) {
    this.#name = value;
  }

  /**
   * Gets the specialty of the books sold by the bookstore.
   * @returns The specialty of the books sold by the bookstore.
   */
  get specialty(): Specialty {
    return this.#specialty;
  }

  /**
   * Sets the specialty of the books sold by the bookstore.
   * @param value - The specialty of the books sold by the bookstore.
   */
  set specialty(value: Specialty) {
    this.#specialty = value;
  }

  /**
   * Gets the minimum copies each book should have before replenishment.
   * @returns The minimum copies each book should have before replenishment.
   */
  get minimumCopies(): number {
    return this.#minimumCopies;
  }

  /**
   * Sets the minimum copies each book should have before replenishment.
   * @param value - The minimum copies each book should have before replenishment.
   */
  set minimumCopies(value: number) {
    this.#minimumCopies = value;
  }

  /**
   * Gets the maximum number of copies accepted in a single reception (twice the minimum).
   * @returns The maximum receivable copies.
   */
  get maximumReceivableCopies(): number {
    return this.#minimumCopies * 2;
  }

  /**
   * Checks whether a quantity of copies can be received in a single book stock.
   * @param copies - Quantity to validate.
   * @returns True when it is an integer greater than zero and not above {@link maximumReceivableCopies}.
   */
  canReceive(copies: number): boolean {
    return Number.isInteger(copies) && copies > 0 && copies <= this.maximumReceivableCopies;
  }

  /**
   * Checks whether a total of copies is below the minimum required.
   * @param totalCopies - Total copies of a book in this bookstore.
   * @returns True when the book requires replenishment.
   */
  requiresReplenishment(totalCopies: number): boolean {
    return totalCopies < this.#minimumCopies;
  }
}
