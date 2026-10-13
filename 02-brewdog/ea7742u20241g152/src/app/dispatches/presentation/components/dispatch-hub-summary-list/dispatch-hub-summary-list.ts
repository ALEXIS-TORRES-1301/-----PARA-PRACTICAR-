import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatError} from '@angular/material/form-field';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchesStore} from '../../../application/dispatches.store';
import {DispatchHubSummary} from '../dispatch-hub-summary/dispatch-hub-summary';

/**
 * Grid list with one dispatch hub summary card per dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-hub-summary-list',
  imports: [MatGridListModule, MatProgressBarModule, MatError, TranslatePipe, DispatchHubSummary],
  templateUrl: './dispatch-hub-summary-list.html',
  styleUrl: './dispatch-hub-summary-list.css'
})
export class DispatchHubSummaryList {
  /**
   * Dispatches store instance.
   */
  readonly store = inject(DispatchesStore);

  /**
   * Breakpoint observer used for the responsive grid.
   */
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * True on extra small screens.
   */
  private readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.XSmall).pipe(map(result => result.matches)),
    {initialValue: false});

  /**
   * Number of grid columns: two summaries per row, one on small screens.
   */
  protected readonly columns = computed(() => this.isHandset() ? 1 : 2);
}
