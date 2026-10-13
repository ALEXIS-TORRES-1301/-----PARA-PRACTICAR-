# BrewDog Dispatch Logistics Platform (`ea7742u20241g152`)

## Overview
`ea7742u20241g152` is an Angular 22 client application that helps BrewDog keep strict control of its dispatch hubs,
outgoing freight dispatch orders and the maximum tonnage capacity of each hub. Destination breweries come from the
[Open Brewery DB API](https://www.openbrewerydb.org/).

In development mode, the application consumes a local fake API exposed through `json-server` at `http://localhost:3000`.

## Authorship
- **Author:** Alexis Calin Torres Huaman
- **Student code:** u20241g152
- **Section (NRC):** 7742
- **Repository:** https://github.com/alexis-torres-1301/-----para-practicar-

## Features
- Toolbar with the BrewDog logo (Logo.dev Logo API, `brewdog.com`) and the text "BrewDog Dispatch Logistics Platform"
- Sidenav with *Home* and *New Dispatch Order* options and an EN / ES language switcher at the bottom
- Home view with the *My Dispatch Hubs* grid of two Dispatch Hub Summary cards per row: each card lists the orders
  (brewery name and assigned tonnage) and shows the *Total Dispatched Tonnage* and *Available Tonnage Capacity*
  indicators, or "Empty" when the hub has no dispatch orders
- New Dispatch Order reactive form with brewery type, destination brewery (from Open Brewery DB) and assigned tonnage,
  automatic dispatch hub assignment by brewery type, automatic `dispatchedAt`, and validation of the assigned tonnage
  against the available tonnage capacity of the hub
- Footer with BrewDog institutional information, copyright and distribution network status
- Page not found view for unsupported routes
- Signal-based state management (`signal`, `computed`)
- Internationalization with English (default) and Spanish resources using `@ngx-translate`
- HTTP communication through Angular `HttpClient` and the REST Assembler pattern

## Routes
- `/home`: Home
- `/dispatch/orders/new`: New Dispatch Order
- `/` redirects to `/home`
- Any other path shows the page not found view

## Architecture Overview
The application follows Domain-Driven Design (DDD) bounded contexts:

- **`shared`**: Base contracts (`BaseEntity`, `BaseAssembler`, `BaseApiEndpoint`, `BaseApi`, `ErrorHandlingEnabledBaseType`),
  layout, footer, language switcher, home and page not found views.
- **`dispatches`**: Dispatch hubs and dispatch orders (`DispatchHub`, `DispatchOrder`, `DispatchHubSummary`).
- **`breweries`**: Integration with the external Open Brewery DB API (`Brewery`, `BreweryType`).

Each bounded context is structured into layers:
- **`domain`**: Entities with native ECMAScript `#` private fields and domain logic.
- **`application`**: Signal-based state management stores.
- **`infrastructure`**: API endpoints, resources/responses, assemblers and API facades.
- **`presentation`**: Routed views (`views`), reusable components (`components`) and route definitions.

## Project Structure

```text
ea7742u20241g152/
├── public/i18n/                        # en.json, es.json
├── server/db.json                      # Fake API data (json-server)
├── src/
│   ├── environments/                   # environment.ts, environment.development.ts
│   ├── material-theme.scss             # Material 3 theme (BrewDog black and cyan)
│   └── app/
│       ├── app.config.ts / app.routes.ts / app.ts
│       ├── shared/                     # domain, infrastructure, presentation
│       ├── dispatches/                 # domain, infrastructure, application, presentation
│       └── breweries/                  # domain, infrastructure, application
└── README.md
```

## Technologies
- **Framework**: Angular 22.2.2 (Standalone Components, Signals, `inject()`)
- **Language**: TypeScript
- **UI & Theming**: Angular Material 22 (Material 3)
- **Routing**: `@angular/router` with lazy-loaded child routes per bounded context
- **Internationalization**: `@ngx-translate/core` & `@ngx-translate/http-loader`
- **Mock API**: `json-server` 0.17.4
- **External APIs**: Open Brewery DB API, Logo.dev Logo API

## Configuration
Endpoints are defined in `src/environments/environment.ts` and `environment.development.ts`.
Set `logoProviderPublishableKey` with your own publishable key from [Logo.dev](https://logo.dev/).

## Installation

```bash
npm install
```

## Starting the Fake API

```bash
cd server
json-server --watch db.json
```

## Running the Application

```bash
ng serve
```

Open `http://localhost:4200/`.

## Building

```bash
ng build
```
