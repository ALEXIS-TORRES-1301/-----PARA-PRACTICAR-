import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Specialty} from '../../shared/domain/model/specialty';
import {Book} from '../domain/model/book.entity';
import {BooksApiEndpoint} from './books-api-endpoint';
import {BookAssembler} from './book-assembler';

/**
 * Infrastructure facade for catalog endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class CatalogApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly booksEndpoint = new BooksApiEndpoint(this.http, new BookAssembler());

  /**
   * Retrieves the books of a specialty.
   * @param specialty - Specialty to query.
   * @returns Stream with the book collection.
   */
  getBooksBySpecialty = (specialty: Specialty): Observable<Book[]> =>
    this.booksEndpoint.getBySpecialty(specialty);
}
