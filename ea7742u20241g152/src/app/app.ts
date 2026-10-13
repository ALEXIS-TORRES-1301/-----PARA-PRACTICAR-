import {Component, inject} from '@angular/core';
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
  private readonly translate = inject(TranslateService);

  /**
   * Creates the root component and sets English as the default language.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
