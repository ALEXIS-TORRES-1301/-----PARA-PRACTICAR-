import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoreSummary} from '../domain/model/bookstore-summary';
import {BookstoresApi} from '../infrastructure/bookstores-api';
import {InventoryStore} from '../../inventory/application/inventory.store';
import {Specialty} from '../../shared/domain/model/specialty';

/**
 * Holds bookstore state and exposes inventory summaries per bookstore.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BookstoresStore {
  private readonly bookstoresApi = inject(BookstoresApi);
  private readonly inventoryStore = inject(InventoryStore);

  private readonly bookstoresSignal = signal<Bookstore[]>([]);

  /** Readonly signal for the list of bookstores. */
  readonly bookstores = this.bookstoresSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /** Readonly signal indicating if bookstores or book stocks are loading. */
  readonly loading = computed(() => this.loadingSignal() || this.inventoryStore.loading());

  private readonly errorSignal = signal<string | null>(null);

  /** Readonly signal for the current error message of bookstores or book stocks. */
  readonly error = computed(() => this.errorSignal() ?? this.inventoryStore.error());

  /**
   * Inventory summary per bookstore, recomputed whenever bookstores or book stocks change.
   */
  readonly summaries = computed(() =>
    this.bookstores().map(bookstore => new BookstoreSummary(bookstore, this.inventoryStore.bookStocks())));

  /**
   * Creates an instance of BookstoresStore and loads initial data.
   */
  constructor() {
    this.loadBookstores();
  }

  /**
   * Selects the bookstore that handles a specialty (there is one per specialty).
   * @param specialty - Specialty to search.
   * @returns Reactive selection for the matching bookstore.
   */
  getBookstoreBySpecialty = (specialty: Specialty): Signal<Bookstore | undefined> =>
    computed(() => this.bookstores().find(bookstore => bookstore.specialty === specialty));

  /**
   * Loads all bookstores from the API.
   */
  private loadBookstores = (): void => {
    this.loadingSignal.set(true);
    this.bookstoresApi.getBookstores().pipe(takeUntilDestroyed()).subscribe({
      next: bookstores => {
        this.bookstoresSignal.set(bookstores);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(err instanceof Error ? err.message : 'Failed to load bookstores');
        this.loadingSignal.set(false);
      }
    });
  };
}
