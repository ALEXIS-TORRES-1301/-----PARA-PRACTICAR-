import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {Specialty} from '../../../shared/domain/model/specialty';

/**
 * Represents a Barnes & Noble bookstore specialized in one literary specialty.
 *
 * @author Alexis Torres
 */
export class Bookstore implements BaseEntity {
  #id: number;
  #name: string;
  #specialty: Specialty;
  #minimumCopies: number;

  /**
   * Creates a new bookstore entity.
   *
   * @param props - Initialization values.
   * @param props.id - Unique identifier.
   * @param props.name - Display name of the bookstore.
   * @param props.specialty - Specialty of the books sold by the bookstore.
   * @param props.minimumCopies - Minimum copies each book should have before replenishment.
   */
  constructor(props: { id: number; name: string; specialty: Specialty; minimumCopies: number }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#specialty = props.specialty;
    this.#minimumCopies = props.minimumCopies;
  }

  /** Unique identifier of the bookstore. */
  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  /** Display name of the bookstore. */
  get name(): string { return this.#name; }

  /** Specialty of the books sold by the bookstore. */
  get specialty(): Specialty { return this.#specialty; }

  /** Minimum copies each book should have before replenishment. */
  get minimumCopies(): number { return this.#minimumCopies; }

  /**
   * Maximum number of copies accepted in a single reception (twice the minimum).
   */
  get maximumReceivableCopies(): number { return this.#minimumCopies * 2; }

  /**
   * Checks whether a quantity of copies can be received in a single book stock.
   *
   * @param copies - Quantity to validate.
   * @returns True when it is an integer greater than zero and not above {@link maximumReceivableCopies}.
   */
  canReceive(copies: number): boolean {
    return Number.isInteger(copies) && copies > 0 && copies <= this.maximumReceivableCopies;
  }

  /**
   * Checks whether a total of copies is below the minimum required.
   *
   * @param totalCopies - Total copies of a book in this bookstore.
   * @returns True when the book requires replenishment.
   */
  requiresReplenishment(totalCopies: number): boolean {
    return totalCopies < this.#minimumCopies;
  }
}
