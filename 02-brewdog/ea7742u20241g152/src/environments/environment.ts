/**
 * Production environment configuration.
 *
 * @summary Centralizes base URLs and paths so infrastructure classes avoid hard-coded URLs.
 * @author Alexis Calin Torres Huaman
 */
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderDispatchHubsEndpointPath: '/dispatch-hubs',
  platformProviderDispatchOrdersEndpointPath: '/dispatch-orders',
  breweriesProviderApiBaseUrl: 'https://api.openbrewerydb.org/v1',
  breweriesProviderBreweriesEndpointPath: '/breweries',
  breweriesProviderPageSize: 50,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'YOUR_LOGO_DEV_PUBLISHABLE_KEY',
  institutionDomain: 'brewdog.com'
};
