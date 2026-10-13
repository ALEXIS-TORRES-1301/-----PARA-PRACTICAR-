import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Book} from '../domain/model/book.entity';
import {CatalogApi} from '../infrastructure/catalog-api';
import {Specialty} from '../../shared/domain/model/specialty';

/**
 * Holds the books offered by the external catalog for the selected specialty.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class CatalogStore {
  private readonly catalogApi = inject(CatalogApi);
  private currentRequest?: Subscription;

  private readonly booksSignal = signal<Book[]>([]);

  /** Readonly signal for the books of the last requested specialty. */
  readonly books = this.booksSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /** Readonly signal indicating if books are loading. */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /** Readonly signal for the current error message. */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the books of a specialty, cancelling any pending request.
   * @param specialty - Specialty to query.
   */
  loadBooksBySpecialty = (specialty: Specialty): void => {
    this.currentRequest?.unsubscribe();
    this.booksSignal.set([]);
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.currentRequest = this.catalogApi.getBooksBySpecialty(specialty).subscribe({
      next: books => {
        this.booksSignal.set(books);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('Failed to load books');
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Finds a loaded book by its catalog key.
   * @param key - Catalog key of the book.
   * @returns The book, or undefined when not loaded.
   */
  getBookByKey = (key: string): Book | undefined =>
    this.booksSignal().find(book => book.key === key);
}
