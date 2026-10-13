import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoresApiEndpoint} from './bookstores-api-endpoint';

/**
 * Infrastructure facade for bookstore endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BookstoresApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly bookstoresEndpoint = new BookstoresApiEndpoint(this.http);

  /**
   * Retrieves all bookstores.
   * @returns Stream with the bookstore collection.
   */
  getBookstores = (): Observable<Bookstore[]> =>
    this.bookstoresEndpoint.getAll();
}
