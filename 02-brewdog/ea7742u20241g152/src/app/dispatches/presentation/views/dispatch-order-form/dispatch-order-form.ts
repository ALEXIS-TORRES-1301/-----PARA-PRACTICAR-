import {Component, computed, inject, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchesStore} from '../../../application/dispatches.store';
import {DispatchOrder} from '../../../domain/model/dispatch-order.entity';
import {BreweriesStore} from '../../../../breweries/application/breweries.store';
import {BREWERY_TYPES, BreweryType} from '../../../../breweries/domain/model/brewery-type';

/**
 * View with the reactive form used to register a new dispatch order.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-order-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    TranslatePipe
  ],
  templateUrl: './dispatch-order-form.html',
  styleUrl: './dispatch-order-form.css'
})
export class DispatchOrderForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dispatchesStore = inject(DispatchesStore);
  private breweriesStore = inject(BreweriesStore);

  /**
   * Form group for the dispatch order form.
   */
  form = this.fb.group({
    breweryType: new FormControl<BreweryType | null>(null, {validators: [Validators.required]}),
    breweryId: new FormControl<string | null>({value: null, disabled: true}, {validators: [Validators.required]}),
    assignedTonnage: new FormControl<number | null>(null, {validators: [Validators.required, Validators.min(0.01)]})
  });

  /**
   * Selectable brewery types.
   */
  protected readonly breweryTypes = BREWERY_TYPES;

  /**
   * Breweries of the selected brewery type.
   */
  protected readonly breweries = this.breweriesStore.breweries;

  /**
   * True while breweries are loading.
   */
  protected readonly loadingBreweries = this.breweriesStore.loading;

  /**
   * Error raised while loading breweries.
   */
  protected readonly breweriesError = this.breweriesStore.error;

  /**
   * True while the dispatch order is being saved.
   */
  protected readonly saving = signal(false);

  /**
   * True when saving the dispatch order failed.
   */
  protected readonly saveFailed = signal(false);

  /**
   * Selected brewery type as a signal.
   */
  private readonly selectedBreweryType = toSignal(this.form.controls.breweryType.valueChanges, {initialValue: null});

  /**
   * Summary of the dispatch hub assigned automatically from the selected brewery type.
   */
  protected readonly dispatchHubSummary = computed(() => {
    const breweryType = this.selectedBreweryType();
    return breweryType ? this.dispatchesStore.getDispatchHubSummaryByBreweryType(breweryType)() : undefined;
  });

  /**
   * Available tonnage capacity of the assigned dispatch hub at this moment.
   */
  protected readonly availableTonnageCapacity = computed(() => this.dispatchHubSummary()?.availableTonnageCapacity ?? null);

  /**
   * Creates an instance of DispatchOrderForm and reacts to brewery type changes.
   */
  constructor() {
    this.form.controls.breweryType.valueChanges.pipe(takeUntilDestroyed()).subscribe(breweryType => {
      this.form.controls.breweryId.reset({value: null, disabled: !breweryType});
      if (breweryType) this.breweriesStore.loadBreweriesByType(breweryType);
      this.updateAssignedTonnageValidators();
    });
  }

  /**
   * Submits the form to create the dispatch order and navigates home once it is persisted.
   */
  submit() {
    const summary = this.dispatchHubSummary();
    const brewery = this.breweriesStore.getBreweryById(this.form.controls.breweryId.value ?? '');
    const assignedTonnage = Number(this.form.controls.assignedTonnage.value);
    if (this.form.invalid || !summary || !brewery || !summary.canDispatch(assignedTonnage)) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.saveFailed.set(false);
    const dispatchOrder = new DispatchOrder({
      id: 0,
      dispatchHubId: summary.dispatchHub.id,
      breweryType: brewery.breweryType,
      breweryId: brewery.id,
      breweryName: brewery.name,
      assignedTonnage,
      dispatchedAt: new Date()
    });
    this.dispatchesStore.addDispatchOrder(dispatchOrder,
      () => this.navigateToHome(),
      () => {
        this.saving.set(false);
        this.saveFailed.set(true);
      });
  }

  /**
   * Discards the form and navigates home.
   */
  cancel() {
    this.navigateToHome();
  }

  /**
   * Replaces the assigned tonnage validators so the maximum follows the assigned hub capacity.
   */
  private updateAssignedTonnageValidators() {
    const assignedTonnage = this.form.controls.assignedTonnage;
    const capacity = this.availableTonnageCapacity();
    assignedTonnage.setValidators([
      Validators.required,
      Validators.min(0.01),
      ...(capacity !== null ? [Validators.max(capacity)] : [])
    ]);
    assignedTonnage.updateValueAndValidity();
  }

  /**
   * Navigates to the home view.
   */
  private navigateToHome() {
    this.router.navigate(['home']).then();
  }
}
