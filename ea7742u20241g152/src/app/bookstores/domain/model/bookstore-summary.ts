import {Bookstore} from './bookstore.entity';
import {BookInventoryItem} from './book-inventory-item';
import {BookStock} from '../../../inventory/domain/model/book-stock.entity';

/**
 * Read model that summarizes the inventory of a bookstore.
 *
 * @remarks
 * Book stocks of the same book (same `bookKey`) are grouped into a single
 * {@link BookInventoryItem}, so each book is counted only once in the indicators.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookstoreSummary {
  /** Books in the bookstore with their total copies. */
  readonly items: BookInventoryItem[];

  /**
   * Creates a summary for a bookstore.
   *
   * @param bookstore - The summarized bookstore.
   * @param bookStocks - Book stocks; only the ones of this bookstore are considered.
   */
  constructor(readonly bookstore: Bookstore, bookStocks: BookStock[]) {
    this.items = BookstoreSummary.groupByBook(
      bookStocks.filter(bookStock => bookStock.bookstoreId === bookstore.id));
  }

  /** True when no book stocks were registered for the bookstore. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Number of distinct books registered in the bookstore. */
  get availableTitles(): number {
    return this.items.length;
  }

  /** Number of distinct books whose total copies are below the bookstore minimum. */
  get replenishmentRequired(): number {
    return this.items.filter(item => this.bookstore.requiresReplenishment(item.totalCopies)).length;
  }

  /**
   * Groups book stocks by book key, adding copies and keeping the latest reception date.
   *
   * @param bookStocks - Book stocks of a single bookstore.
   * @returns One inventory item per distinct book, sorted by title.
   */
  private static groupByBook(bookStocks: BookStock[]): BookInventoryItem[] {
    const itemsByKey = new Map<string, BookInventoryItem>();
    for (const bookStock of bookStocks) {
      const current = itemsByKey.get(bookStock.bookKey);
      itemsByKey.set(bookStock.bookKey, new BookInventoryItem(
        bookStock.bookKey,
        bookStock.bookTitle,
        (current?.totalCopies ?? 0) + bookStock.copies,
        current && current.lastReceivedAt > bookStock.receivedAt ? current.lastReceivedAt : bookStock.receivedAt
      ));
    }
    return [...itemsByKey.values()].sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
  }
}
