import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {BookStock} from '../domain/model/book-stock.entity';
import {BookStocksApiEndpoint} from './book-stocks-api-endpoint';

/**
 * Infrastructure facade for inventory endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class InventoryApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly bookStocksEndpoint = new BookStocksApiEndpoint(this.http);

  /**
   * Retrieves all book stocks.
   * @returns Stream with the book stock collection.
   */
  getBookStocks = (): Observable<BookStock[]> =>
    this.bookStocksEndpoint.getAll();

  /**
   * Registers a new book stock.
   * @param bookStock - The book stock to create.
   * @returns Stream with the created book stock.
   */
  createBookStock = (bookStock: BookStock): Observable<BookStock> =>
    this.bookStocksEndpoint.create(bookStock);
}
