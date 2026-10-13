import {Component, inject, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Root component that bootstraps localization and the application shell.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Signal for the application title.
   */
  protected readonly title = signal('ea7742u20241g152');

  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Creates an instance of App and sets up translation with English as default.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
