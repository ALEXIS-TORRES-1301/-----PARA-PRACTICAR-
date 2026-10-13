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
  #id: number;
  #bookstoreId: number;
  #bookKey: string;
  #bookTitle: string;
  #authorName: string;
  #copies: number;
  #receivedAt: Date;

  /**
   * Creates a new book stock entity.
   *
   * @param props - Initialization values.
   * @param props.id - Unique identifier, 0 when not yet persisted.
   * @param props.bookstoreId - Identifier of the bookstore that received the copies.
   * @param props.bookKey - Catalog key of the book.
   * @param props.bookTitle - Title of the book.
   * @param props.authorName - Name of the first author of the book.
   * @param props.copies - Number of copies received.
   * @param props.receivedAt - Date and time when the copies were received.
   */
  constructor(props: {
    id: number; bookstoreId: number; bookKey: string; bookTitle: string;
    authorName: string; copies: number; receivedAt: Date;
  }) {
    this.#id = props.id;
    this.#bookstoreId = props.bookstoreId;
    this.#bookKey = props.bookKey;
    this.#bookTitle = props.bookTitle;
    this.#authorName = props.authorName;
    this.#copies = props.copies;
    this.#receivedAt = props.receivedAt;
  }

  /** Unique identifier of the book stock. */
  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  /** Identifier of the bookstore that received the copies. */
  get bookstoreId(): number { return this.#bookstoreId; }

  /** Catalog key of the book. */
  get bookKey(): string { return this.#bookKey; }

  /** Title of the book. */
  get bookTitle(): string { return this.#bookTitle; }

  /** Name of the first author of the book. */
  get authorName(): string { return this.#authorName; }

  /** Number of copies received. */
  get copies(): number { return this.#copies; }

  /** Date and time when the copies were received. */
  get receivedAt(): Date { return this.#receivedAt; }
}
