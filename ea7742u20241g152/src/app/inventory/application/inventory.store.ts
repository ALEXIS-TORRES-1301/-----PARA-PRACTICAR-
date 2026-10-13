import {inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BookStock} from '../domain/model/book-stock.entity';
import {InventoryApi} from '../infrastructure/inventory-api';

/**
 * Holds inventory state and coordinates book stock application behavior.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class InventoryStore {
  private readonly inventoryApi = inject(InventoryApi);

  private readonly bookStocksSignal = signal<BookStock[]>([]);

  /** Readonly signal for the list of book stocks. */
  readonly bookStocks = this.bookStocksSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /** Readonly signal indicating if data is loading. */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /** Readonly signal for the current error message. */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of InventoryStore and loads initial data.
   */
  constructor() {
    this.loadBookStocks();
  }

  /**
   * Registers a new book stock and adds it to the state once persisted.
   *
   * @param bookStock - The book stock to register.
   * @param onCreated - Callback invoked after the record is persisted.
   * @param onFailed - Callback invoked when the record could not be persisted.
   */
  addBookStock = (bookStock: BookStock, onCreated?: () => void, onFailed?: () => void): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.inventoryApi.createBookStock(bookStock).subscribe({
      next: created => {
        this.bookStocksSignal.update(bookStocks => [...bookStocks, created]);
        this.loadingSignal.set(false);
        onCreated?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to register book stock'));
        this.loadingSignal.set(false);
        onFailed?.();
      }
    });
  };

  /**
   * Loads all book stocks from the API.
   */
  private loadBookStocks = (): void => {
    this.loadingSignal.set(true);
    this.inventoryApi.getBookStocks().pipe(takeUntilDestroyed()).subscribe({
      next: bookStocks => {
        this.bookStocksSignal.set(bookStocks);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load book stocks'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
