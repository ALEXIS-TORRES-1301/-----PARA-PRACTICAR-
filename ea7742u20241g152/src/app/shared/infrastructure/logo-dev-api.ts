import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure gateway that builds logo URLs using the Logo.dev Logo API.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class LogoDevApi {
  /** Base URL for the logo provider API. */
  private readonly baseUrl = environment.logoProviderApiBaseUrl;

  /** Publishable API key required by the logo provider. */
  private readonly apiKey = environment.logoProviderPublishableKey;

  /**
   * Builds the logo URL for a company domain.
   *
   * @param domain - Company domain, for example `barnesandnoble.com`.
   * @returns Absolute URL of the logo image.
   */
  getUrlToLogo = (domain: string): string =>
    `${this.baseUrl}${domain}?token=${this.apiKey}`;
}
