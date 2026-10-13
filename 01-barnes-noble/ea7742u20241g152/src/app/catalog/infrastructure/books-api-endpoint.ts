import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {Specialty} from '../../shared/domain/model/specialty';
import {Book} from '../domain/model/book.entity';
import {BookAssembler} from './book-assembler';
import {BooksResponse} from './books-response';

const booksApiEndpointUrl = `${environment.catalogProviderApiBaseUrl}${environment.catalogProviderSubjectsEndpointPath}`;

/**
 * Encapsulates the catalog provider HTTP operations for books.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BooksApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates an instance of BooksApiEndpoint.
   * @param http - The HttpClient for making HTTP requests.
   * @param assembler - The assembler for converting resources into entities.
   */
  constructor(private http: HttpClient, private assembler: BookAssembler) {
    super();
  }

  /**
   * Fetches the books of a specialty.
   * @param specialty - Specialty used as catalog subject.
   * @returns Stream with the book collection.
   */
  getBySpecialty = (specialty: Specialty): Observable<Book[]> =>
    this.http.get<BooksResponse>(`${booksApiEndpointUrl}/${specialty}.json`, {
      params: {limit: environment.catalogProviderSubjectsLimit}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch books'))
    );
}
