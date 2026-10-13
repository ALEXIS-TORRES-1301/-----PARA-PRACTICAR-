/**
 * Represents a book offered by the external catalog provider.
 *
 * @author Alexis Calin Torres Huaman
 */
export class Book {
  /**
   * Author name used when the provider does not include author information.
   */
  static readonly UNKNOWN_AUTHOR = 'Unknown Author';

  /**
   * Catalog key of the book.
   */
  #key: string;

  /**
   * Title of the book.
   */
  #title: string;

  /**
   * Name of the first author of the book.
   */
  #authorName: string;

  /**
   * Creates a new book entity.
   *
   * @param props - Initialization values.
   * @param props.key - Catalog key of the book.
   * @param props.title - Title of the book.
   * @param props.authorName - Name of the first author; {@link Book.UNKNOWN_AUTHOR} when missing.
   */
  constructor(props: { key: string; title: string; authorName?: string | null }) {
    this.#key = props.key;
    this.#title = props.title;
    this.#authorName = props.authorName?.trim() || Book.UNKNOWN_AUTHOR;
  }

  /**
   * Gets the catalog key of the book.
   * @returns The catalog key.
   */
  get key(): string {
    return this.#key;
  }

  /**
   * Sets the catalog key of the book.
   * @param value - The catalog key.
   */
  set key(value: string) {
    this.#key = value;
  }

  /**
   * Gets the title of the book.
   * @returns The title.
   */
  get title(): string {
    return this.#title;
  }

  /**
   * Sets the title of the book.
   * @param value - The title.
   */
  set title(value: string) {
    this.#title = value;
  }

  /**
   * Gets the name of the first author of the book.
   * @returns The author name.
   */
  get authorName(): string {
    return this.#authorName;
  }

  /**
   * Sets the name of the first author of the book.
   * @param value - The author name.
   */
  set authorName(value: string) {
    this.#authorName = value;
  }
}
