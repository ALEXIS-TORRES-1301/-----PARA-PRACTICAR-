import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {BookStock} from '../domain/model/book-stock.entity';
import {BookStockResource, BookStocksResponse} from './book-stocks-response';
import {BookStockAssembler} from './book-stock-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for book stock operations.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BookStocksApiEndpoint extends BaseApiEndpoint<BookStock, BookStockResource, BookStocksResponse, BookStockAssembler> {
  /**
   * Creates an instance of BookStocksApiEndpoint.
   * @param http - The HttpClient used for API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookStocksEndpointPath}`,
      new BookStockAssembler());
  }
}
