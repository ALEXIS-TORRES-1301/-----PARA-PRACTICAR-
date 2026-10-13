/**
 * Development environment configuration.
 *
 * @summary Centralizes base URLs and paths so services avoid hard-coded URLs.
 * @author Alexis Calin Torres Huaman
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderBookstoresEndpointPath: '/bookstores',
  platformProviderBookStocksEndpointPath: '/book-stocks',
  catalogProviderApiBaseUrl: 'https://openlibrary.org',
  catalogProviderSubjectsEndpointPath: '/subjects',
  catalogProviderSubjectsLimit: 50,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'YOUR_LOGO_DEV_PUBLISHABLE_KEY',
  institutionDomain: 'barnesandnoble.com'
};
