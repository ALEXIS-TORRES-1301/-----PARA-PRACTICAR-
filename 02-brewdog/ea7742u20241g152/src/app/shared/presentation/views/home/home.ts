import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchHubSummaryList} from '../../../../dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list';

/**
 * Home view with the platform introduction and the "My Dispatch Hubs" section.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, DispatchHubSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
