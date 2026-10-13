import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a book stock exchanged with the platform API.
 *
 * @author Alexis Torres
 */
export interface BookStockResource extends BaseResource {
  /** Unique identifier of the book stock. */
  id: number;
  /** Identifier of the bookstore that received the copies. */
  bookstoreId: number;
  /** Catalog key of the book. */
  bookKey: string;
  /** Title of the book. */
  bookTitle: string;
  /** Name of the first author of the book. */
  authorName: string;
  /** Number of copies received. */
  copies: number;
  /** ISO-8601 date and time when the copies were received. */
  receivedAt: string;
}

/**
 * Response envelope for book stock collection queries.
 */
export interface BookStocksResponse extends BaseResponse {
  /** Book stock resources included in the response. */
  bookStocks: BookStockResource[];
}
