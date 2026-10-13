import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents one reception of copies of a book in a bookstore.
 *
 * @remarks
 * A same book (identified by `bookKey`) may have several book stock records.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookStock implements BaseEntity {
  /**
   * Unique identifier of the book stock.
   */
  #id: number;

  /**
   * Identifier of the bookstore that received the copies.
   */
  #bookstoreId: number;

  /**
   * Catalog key of the book.
   */
  #bookKey: string;

  /**
   * Title of the book.
   */
  #bookTitle: string;

  /**
   * Name of the first author of the book.
   */
  #authorName: string;

  /**
   * Number of copies received.
   */
  #copies: number;

  /**
   * Date and time when the copies were received.
   */
  #receivedAt: Date;

  /**
   * Creates a new book stock entity.
   *
   * @param bookStock - Initialization values.
   * @param bookStock.id - Unique identifier, 0 when not yet persisted.
   * @param bookStock.bookstoreId - Identifier of the bookstore that received the copies.
   * @param bookStock.bookKey - Catalog key of the book.
   * @param bookStock.bookTitle - Title of the book.
   * @param bookStock.authorName - Name of the first author of the book.
   * @param bookStock.copies - Number of copies received.
   * @param bookStock.receivedAt - Date and time when the copies were received.
   */
  constructor(bookStock: {
    id: number; bookstoreId: number; bookKey: string; bookTitle: string;
    authorName: string; copies: number; receivedAt: Date;
  }) {
    this.#id = bookStock.id;
    this.#bookstoreId = bookStock.bookstoreId;
    this.#bookKey = bookStock.bookKey;
    this.#bookTitle = bookStock.bookTitle;
    this.#authorName = bookStock.authorName;
    this.#copies = bookStock.copies;
    this.#receivedAt = bookStock.receivedAt;
  }

  /**
   * Gets the unique identifier of the book stock.
   * @returns The unique identifier of the book stock.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the book stock.
   * @param value - The unique identifier of the book stock.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the identifier of the bookstore that received the copies.
   * @returns The identifier of the bookstore that received the copies.
   */
  get bookstoreId(): number {
    return this.#bookstoreId;
  }

  /**
   * Sets the identifier of the bookstore that received the copies.
   * @param value - The identifier of the bookstore that received the copies.
   */
  set bookstoreId(value: number) {
    this.#bookstoreId = value;
  }

  /**
   * Gets the catalog key of the book.
   * @returns The catalog key of the book.
   */
  get bookKey(): string {
    return this.#bookKey;
  }

  /**
   * Sets the catalog key of the book.
   * @param value - The catalog key of the book.
   */
  set bookKey(value: string) {
    this.#bookKey = value;
  }

  /**
   * Gets the title of the book.
   * @returns The title of the book.
   */
  get bookTitle(): string {
    return this.#bookTitle;
  }

  /**
   * Sets the title of the book.
   * @param value - The title of the book.
   */
  set bookTitle(value: string) {
    this.#bookTitle = value;
  }

  /**
   * Gets the name of the first author of the book.
   * @returns The name of the first author of the book.
   */
  get authorName(): string {
    return this.#authorName;
  }

  /**
   * Sets the name of the first author of the book.
   * @param value - The name of the first author of the book.
   */
  set authorName(value: string) {
    this.#authorName = value;
  }

  /**
   * Gets the number of copies received.
   * @returns The number of copies received.
   */
  get copies(): number {
    return this.#copies;
  }

  /**
   * Sets the number of copies received.
   * @param value - The number of copies received.
   */
  set copies(value: number) {
    this.#copies = value;
  }

  /**
   * Gets the date and time when the copies were received.
   * @returns The date and time when the copies were received.
   */
  get receivedAt(): Date {
    return this.#receivedAt;
  }

  /**
   * Sets the date and time when the copies were received.
   * @param value - The date and time when the copies were received.
   */
  set receivedAt(value: Date) {
    this.#receivedAt = value;
  }
}
