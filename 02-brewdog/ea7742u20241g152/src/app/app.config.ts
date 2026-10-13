import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {routes} from './app.routes';

registerLocaleData(localeEs);

/**
 * Application-wide provider configuration for routing, HTTP, and localization.
 *
 * @author Alexis Calin Torres Huaman
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}),
      fallbackLang: 'en'
    }),
    provideRouter(routes)
  ]
};
