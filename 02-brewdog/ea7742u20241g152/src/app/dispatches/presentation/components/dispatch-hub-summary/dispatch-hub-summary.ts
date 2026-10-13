import {Component, inject, input} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {DispatchHubSummary as DispatchHubSummaryModel} from '../../../domain/model/dispatch-hub-summary';

/**
 * Card that presents the dispatch orders and tonnage indicators of one dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-hub-summary',
  imports: [MatCardModule, MatListModule, MatIconModule, DatePipe, DecimalPipe, TranslatePipe],
  templateUrl: './dispatch-hub-summary.html',
  styleUrl: './dispatch-hub-summary.css'
})
export class DispatchHubSummary {
  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Summary displayed by the card.
   */
  readonly summary = input.required<DispatchHubSummaryModel>();

  /**
   * Active language, used to localize dates and numbers.
   */
  protected readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(event => event.lang)),
    {initialValue: this.translate.getCurrentLang() ?? 'en'});
}
