import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchHubSummary} from '../domain/model/dispatch-hub-summary';
import {DispatchesApi} from '../infrastructure/dispatches-api';
import {BreweryType} from '../../breweries/domain/model/brewery-type';

/**
 * Holds dispatch application state and coordinates dispatch hub and order behavior.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class DispatchesStore {
  private readonly dispatchesApi = inject(DispatchesApi);

  private readonly dispatchHubsSignal = signal<DispatchHub[]>([]);

  /**
   * Readonly signal for the list of dispatch hubs.
   */
  readonly dispatchHubs = this.dispatchHubsSignal.asReadonly();

  private readonly dispatchOrdersSignal = signal<DispatchOrder[]>([]);

  /**
   * Readonly signal for the list of dispatch orders.
   */
  readonly dispatchOrders = this.dispatchOrdersSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Computed summary per dispatch hub, recomputed when hubs or orders change.
   */
  readonly dispatchHubSummaries = computed(() =>
    this.dispatchHubs().map(hub => new DispatchHubSummary(hub, this.dispatchOrders())));

  /**
   * Creates an instance of DispatchesStore and loads initial data.
   */
  constructor() {
    this.loadDispatchHubs();
    this.loadDispatchOrders();
  }

  /**
   * Selects the summary of the dispatch hub that serves a brewery type (one hub per type).
   * @param breweryType - Brewery type to search.
   * @returns Reactive selection for the matching dispatch hub summary.
   */
  getDispatchHubSummaryByBreweryType = (breweryType: BreweryType): Signal<DispatchHubSummary | undefined> =>
    computed(() => this.dispatchHubSummaries().find(summary => summary.dispatchHub.breweryType === breweryType));

  /**
   * Adds a new dispatch order once it is persisted.
   * @param dispatchOrder - The dispatch order to add.
   * @param onCreated - Callback invoked after the order is persisted.
   * @param onFailed - Callback invoked when the order could not be persisted.
   */
  addDispatchOrder = (dispatchOrder: DispatchOrder, onCreated?: () => void, onFailed?: () => void): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.dispatchesApi.createDispatchOrder(dispatchOrder).subscribe({
      next: createdOrder => {
        this.dispatchOrdersSignal.update(orders => [...orders, createdOrder]);
        this.loadingSignal.set(false);
        onCreated?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create dispatch order'));
        this.loadingSignal.set(false);
        onFailed?.();
      }
    });
  };

  /**
   * Loads all dispatch hubs from the API.
   */
  private loadDispatchHubs = (): void => {
    this.loadingSignal.set(true);
    this.dispatchesApi.getDispatchHubs().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchHubs => {
        this.dispatchHubsSignal.set(dispatchHubs);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch hubs'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all dispatch orders from the API.
   */
  private loadDispatchOrders = (): void => {
    this.loadingSignal.set(true);
    this.dispatchesApi.getDispatchOrders().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchOrders => {
        this.dispatchOrdersSignal.set(dispatchOrders);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch orders'));
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
