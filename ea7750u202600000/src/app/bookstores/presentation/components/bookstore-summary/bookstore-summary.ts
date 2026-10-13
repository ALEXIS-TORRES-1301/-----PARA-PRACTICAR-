import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {BookstoreSummary as BookstoreSummaryModel} from '../../../domain/model/bookstore-summary';
import {specialtyTranslationKey} from '../../../../shared/domain/model/specialty';

/**
 * Card that presents the inventory summary of one bookstore.
 *
 * @author Alexis Torres
 */
@Component({
  selector: 'app-bookstore-summary',
  imports: [MatCardModule, MatListModule, MatIconModule, DatePipe, TranslatePipe],
  templateUrl: './bookstore-summary.html',
  styleUrl: './bookstore-summary.css'
})
export class BookstoreSummary {
  private readonly translate = inject(TranslateService);

  /** Summary displayed by the card. */
  readonly summary = input.required<BookstoreSummaryModel>();

  /** Active language, used to localize dates. */
  protected readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(event => event.lang)),
    {initialValue: this.translate.getCurrentLang() ?? 'en'});

  /** Translation key builder for specialties. */
  protected readonly specialtyKey = specialtyTranslationKey;
}
