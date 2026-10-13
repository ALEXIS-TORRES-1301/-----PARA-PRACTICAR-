/**
 * Production environment configuration.
 *
 * @summary Centralizes base URLs and paths so services avoid hard-coded URLs.
 * @author Alexis Calin Torres Huaman
 */
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderBookstoresEndpointPath: '/bookstores',
  platformProviderBookStocksEndpointPath: '/book-stocks',
  catalogProviderApiBaseUrl: 'https://openlibrary.org',
  catalogProviderSubjectsEndpointPath: '/subjects',
  catalogProviderSubjectsLimit: 50,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_H1j_uA9GRFizL2ikMw4qwQ',
  institutionDomain: 'barnesandnoble.com'
};
