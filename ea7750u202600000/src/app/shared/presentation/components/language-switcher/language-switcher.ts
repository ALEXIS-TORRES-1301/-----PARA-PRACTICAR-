import {Component, inject, signal} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * Switches the active locale used by the translation service.
 *
 * @author Alexis Torres
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  /** Currently selected language code. */
  protected readonly currentLang = signal(this.translate.getCurrentLang() ?? 'en');

  /** Available language codes. */
  protected readonly languages = [...this.translate.getLangs()];

  /**
   * Changes the application's current language.
   * @param language - The language code to switch to (e.g., 'en', 'es').
   */
  protected useLanguage = (language: string): void => {
    this.translate.use(language);
    this.currentLang.set(language);
  };
}
