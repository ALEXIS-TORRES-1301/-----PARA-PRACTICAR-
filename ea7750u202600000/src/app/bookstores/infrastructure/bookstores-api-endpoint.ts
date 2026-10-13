import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoreResource, BookstoresResponse} from './bookstores-response';
import {BookstoreAssembler} from './bookstore-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for bookstore operations.
 *
 * @author Alexis Torres
 */
export class BookstoresApiEndpoint extends BaseApiEndpoint<Bookstore, BookstoreResource, BookstoresResponse, BookstoreAssembler> {
  /**
   * Creates an instance of BookstoresApiEndpoint.
   * @param http - The HttpClient used for API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookstoresEndpointPath}`,
      new BookstoreAssembler());
  }
}
