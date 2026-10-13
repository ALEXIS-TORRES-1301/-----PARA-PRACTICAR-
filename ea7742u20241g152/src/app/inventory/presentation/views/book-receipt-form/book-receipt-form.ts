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
import {SPECIALTIES, Specialty, specialtyTranslationKey} from '../../../../shared/domain/model/specialty';
import {BookstoresStore} from '../../../../bookstores/application/bookstores.store';
import {CatalogStore} from '../../../../catalog/application/catalog.store';
import {InventoryStore} from '../../../application/inventory.store';
import {BookStock} from '../../../domain/model/book-stock.entity';

/**
 * View with the reactive form used to register received books in a bookstore.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-book-receipt-form',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    MatButtonModule, MatCardModule, MatProgressBarModule, TranslatePipe
  ],
  templateUrl: './book-receipt-form.html',
  styleUrl: './book-receipt-form.css'
})
export class BookReceiptForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookstoresStore = inject(BookstoresStore);
  private readonly catalogStore = inject(CatalogStore);
  private readonly inventoryStore = inject(InventoryStore);

  /** Reactive form for the book receipt. */
  form = this.fb.group({
    specialty: new FormControl<Specialty | null>(null, {validators: [Validators.required]}),
    bookKey: new FormControl<string | null>({value: null, disabled: true}, {validators: [Validators.required]}),
    copies: new FormControl<number | null>(null,
      {validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]})
  });

  /** Selectable specialties. */
  protected readonly specialties = SPECIALTIES;

  /** Translation key builder for specialties. */
  protected readonly specialtyKey = specialtyTranslationKey;

  /** Books of the selected specialty. */
  protected readonly books = this.catalogStore.books;

  /** True while books are loading. */
  protected readonly loadingBooks = this.catalogStore.loading;

  /** Error raised while loading books. */
  protected readonly booksError = this.catalogStore.error;

  /** True while the book stock is being saved. */
  protected readonly saving = signal(false);

  /** True when saving the book stock failed. */
  protected readonly saveFailed = signal(false);

  private readonly selectedSpecialty = toSignal(this.form.controls.specialty.valueChanges, {initialValue: null});

  /** Bookstore automatically assigned from the selected specialty. */
  protected readonly bookstore = computed(() => {
    const specialty = this.selectedSpecialty();
    return specialty ? this.bookstoresStore.getBookstoreBySpecialty(specialty)() : undefined;
  });

  /**
   * Creates the form and reacts to specialty changes.
   */
  constructor() {
    this.form.controls.specialty.valueChanges.pipe(takeUntilDestroyed()).subscribe(specialty => {
      this.form.controls.bookKey.reset({value: null, disabled: !specialty});
      if (specialty) this.catalogStore.loadBooksBySpecialty(specialty);
      this.updateCopiesMaximum();
    });
  }

  /**
   * Submits the form to register the book stock and navigates to the overview once persisted.
   */
  submit() {
    const bookstore = this.bookstore();
    const book = this.catalogStore.getBookByKey(this.form.controls.bookKey.value ?? '');
    const copies = Number(this.form.controls.copies.value);
    if (this.form.invalid || !bookstore || !book || !bookstore.canReceive(copies)) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.saveFailed.set(false);
    const bookStock = new BookStock({
      id: 0,
      bookstoreId: bookstore.id,
      bookKey: book.key,
      bookTitle: book.title,
      authorName: book.authorName,
      copies,
      receivedAt: new Date()
    });
    this.inventoryStore.addBookStock(bookStock,
      () => this.navigateToOverview(),
      () => {
        this.saving.set(false);
        this.saveFailed.set(true);
      });
  }

  /** Discards the form and returns to the overview. */
  protected cancel = (): void => this.navigateToOverview();

  /**
   * Maximum copies accepted for the assigned bookstore.
   * @returns Twice the minimum copies, or null when no bookstore is selected.
   */
  protected maximumCopies = (): number | null => this.bookstore()?.maximumReceivableCopies ?? null;

  /**
   * Replaces the copies validators so the maximum follows the assigned bookstore.
   */
  private updateCopiesMaximum = (): void => {
    const copies = this.form.controls.copies;
    const maximum = this.maximumCopies();
    copies.setValidators([
      Validators.required, Validators.min(1), Validators.pattern(/^\d+$/),
      ...(maximum ? [Validators.max(maximum)] : [])
    ]);
    copies.updateValueAndValidity();
  };

  private navigateToOverview = (): void => {
    this.router.navigate(['/bookstores/overview']).then();
  };
}
