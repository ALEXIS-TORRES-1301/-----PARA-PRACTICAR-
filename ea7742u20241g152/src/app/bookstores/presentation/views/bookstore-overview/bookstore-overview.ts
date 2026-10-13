import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {BookstoresStore} from '../../../application/bookstores.store';
import {BookstoreSummary} from '../../components/bookstore-summary/bookstore-summary';

/**
 * View that monitors book availability across bookstores.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-bookstore-overview',
  imports: [MatGridListModule, MatProgressBarModule, TranslatePipe, BookstoreSummary],
  templateUrl: './bookstore-overview.html',
  styleUrl: './bookstore-overview.css'
})
export class BookstoreOverview {
  private readonly store = inject(BookstoresStore);
  private readonly breakpointObserver = inject(BreakpointObserver);

  /** Inventory summary per bookstore. */
  protected readonly summaries = this.store.summaries;

  /** True while bookstores or book stocks are loading. */
  protected readonly loading = this.store.loading;

  /** Current loading error, if any. */
  protected readonly error = this.store.error;

  private readonly isHandset = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches)),
    {initialValue: false});

  /** Two summaries per row, one on small screens. */
  protected readonly columns = computed(() => this.isHandset() ? 1 : 2);
}
