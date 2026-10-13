/**
 * Value object that aggregates every book stock of the same book within a bookstore.
 *
 * @author Alexis Torres
 */
export class BookInventoryItem {
  /**
   * Creates a new book inventory item.
   *
   * @param bookKey - Catalog key identifying the book.
   * @param bookTitle - Title of the book.
   * @param totalCopies - Sum of copies across all book stock records of the book.
   * @param lastReceivedAt - Most recent reception date of the book.
   */
  constructor(
    readonly bookKey: string,
    readonly bookTitle: string,
    readonly totalCopies: number,
    readonly lastReceivedAt: Date
  ) {}
}
