import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApi} from '../infrastructure/breweries-api';

/**
 * Holds breweries application state with the breweries of the selected type.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BreweriesStore {
  private readonly breweriesApi = inject(BreweriesApi);
  private breweriesSubscription: Subscription | null = null;

  private readonly breweriesSignal = signal<Brewery[]>([]);

  /**
   * Readonly signal for the breweries of the last requested type.
   */
  readonly breweries = this.breweriesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if breweries are loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the breweries of a type, cancelling any pending request.
   * @param breweryType - Brewery type to query.
   */
  loadBreweriesByType = (breweryType: BreweryType): void => {
    this.breweriesSubscription?.unsubscribe();
    this.breweriesSignal.set([]);
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.breweriesSubscription = this.breweriesApi.getBreweriesByType(breweryType).subscribe({
      next: breweries => {
        this.breweriesSignal.set(breweries);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load breweries'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Selects a loaded brewery by identifier.
   * @param id - Brewery identifier.
   * @returns The brewery, or undefined when it is not loaded.
   */
  getBreweryById = (id: string): Brewery | undefined =>
    this.breweriesSignal().find(brewery => brewery.id === id);

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
