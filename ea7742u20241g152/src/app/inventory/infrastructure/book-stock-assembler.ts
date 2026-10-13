import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BookStock} from '../domain/model/book-stock.entity';
import {BookStockResource, BookStocksResponse} from './book-stocks-response';

/**
 * Maps book stock entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookStockAssembler implements BaseAssembler<BookStock, BookStockResource, BookStocksResponse> {
  /**
   * Converts a response envelope into book stock entities.
   * @param response - The API response containing book stocks.
   * @returns An array of BookStock entities.
   */
  toEntitiesFromResponse = (response: BookStocksResponse): BookStock[] =>
    response.bookStocks.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BookStockResource to a BookStock entity.
   * @param resource - The resource to convert.
   * @returns The converted BookStock entity.
   */
  toEntityFromResource = (resource: BookStockResource): BookStock =>
    new BookStock({
      id: resource.id,
      bookstoreId: resource.bookstoreId,
      bookKey: resource.bookKey,
      bookTitle: resource.bookTitle,
      authorName: resource.authorName,
      copies: resource.copies,
      receivedAt: new Date(resource.receivedAt)
    });

  /**
   * Converts a BookStock entity to a BookStockResource.
   * @param entity - The entity to convert.
   * @returns The converted BookStockResource.
   */
  toResourceFromEntity = (entity: BookStock): BookStockResource => ({
    id: entity.id,
    bookstoreId: entity.bookstoreId,
    bookKey: entity.bookKey,
    bookTitle: entity.bookTitle,
    authorName: entity.authorName,
    copies: entity.copies,
    receivedAt: entity.receivedAt.toISOString()
  });
}
