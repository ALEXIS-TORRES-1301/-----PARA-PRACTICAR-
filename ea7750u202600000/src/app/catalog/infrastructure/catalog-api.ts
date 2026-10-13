import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Specialty} from '../../shared/domain/model/specialty';
import {Book} from '../domain/model/book.entity';
import {BookAssembler} from './book-assembler';
import {SubjectResponse} from './subject-response';

/**
 * Infrastructure gateway to the Open Library API.
 *
 * @author Alexis Torres
 */
@Injectable({providedIn: 'root'})
export class CatalogApi {
  private readonly baseUrl = environment.catalogProviderApiBaseUrl;
  private readonly subjectsEndpoint = environment.catalogProviderSubjectsEndpointPath;
  private readonly limit = environment.catalogProviderSubjectsLimit;
  private readonly http = inject(HttpClient);
  private readonly bookAssembler = inject(BookAssembler);

  /**
   * Fetches the books of a specialty.
   * @param specialty - Specialty used as Open Library subject.
   * @returns Stream with the book collection.
   */
  getBooksBySpecialty = (specialty: Specialty): Observable<Book[]> =>
    this.http.get<SubjectResponse>(`${this.baseUrl}${this.subjectsEndpoint}/${specialty}.json`, {
      params: {limit: this.limit}
    }).pipe(map(response => this.bookAssembler.toEntitiesFromResponse(response)));
}
