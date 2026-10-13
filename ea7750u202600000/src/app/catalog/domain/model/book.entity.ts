/**
 * Represents a book offered by the external catalog provider.
 *
 * @author Alexis Torres
 */
export class Book {
  /** Author name used when the provider does not include author information. */
  static readonly UNKNOWN_AUTHOR = 'Unknown Author';

  #key: string;
  #title: string;
  #authorName: string;

  /**
   * Creates a new book entity.
   *
   * @param props - Initialization values.
   * @param props.key - Catalog key of the book.
   * @param props.title - Title of the book.
   * @param props.authorName - Name of the first author, {@link UNKNOWN_AUTHOR} when missing.
   */
  constructor(props: { key: string; title: string; authorName?: string | null }) {
    this.#key = props.key;
    this.#title = props.title;
    this.#authorName = props.authorName?.trim() || Book.UNKNOWN_AUTHOR;
  }

  /** Catalog key of the book. */
  get key(): string { return this.#key; }

  /** Title of the book. */
  get title(): string { return this.#title; }

  /** Name of the first author of the book. */
  get authorName(): string { return this.#authorName; }
}
