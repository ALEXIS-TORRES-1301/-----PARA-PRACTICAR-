# Barnes & Noble Inventory Platform (`ea7742u20241g152`)

## Overview
`ea7742u20241g152` is an Angular 22 client application that helps Barnes & Noble monitor book availability across its
bookstores and register received books. Each bookstore is specialized in one literary specialty, and the books offered
for reception come from the [Open Library API](https://openlibrary.org/developers/api).

In development mode, the application consumes a local fake API exposed through `json-server` at `http://localhost:3000`.

## Authorship
- **Author:** Alexis Calin Torres Huaman
- **Student code:** u20241g152
- **Section (NRC):** 7742
- **Repository:** https://github.com/alexis-torres-1301/-----para-practicar-

## Features
- Toolbar with the Barnes & Noble logo (Logo.dev Logo API), the platform name and an EN / ES language switcher
- Sidenav navigation with *Bookstore Overview* and *Receive Books*
- Bookstore Overview with a *Store Inventory* grid of two Bookstore Summary cards per row, showing each book with its
  total copies plus the *Available Titles* and *Replenishment Required* indicators, or "Empty" when there are no Book Stocks
- Receive Books reactive form with specialty, book (from Open Library) and copies, with automatic bookstore assignment,
  automatic `receivedAt` and copies validated between 1 and twice the bookstore minimum copies
- Page not found view for unsupported routes
- Signal-based state management (`signal`, `computed`)
- Internationalization with English (default) and Spanish resources using `@ngx-translate`
- HTTP communication through Angular `HttpClient` and the REST Assembler pattern
- Layered organization by bounded context: `shared`, `bookstores`, `inventory` and `catalog`

## Routes
- `/bookstores/overview`: Bookstore Overview
- `/inventory/receipts/new`: Receive Books
- `/` redirects to `/bookstores/overview`
- Any other path shows the page not found view

## Architecture Overview
The application follows Domain-Driven Design (DDD) bounded contexts:

- **`shared`**: Base contracts (`BaseEntity`, `BaseAssembler`, `BaseApiEndpoint`, `BaseApi`, `ErrorHandlingEnabledBaseType`),
  `Specialty`, shell layout, language switcher and page not found view.
- **`bookstores`**: Bookstores and their book inventory summary (`Bookstore`, `BookstoreSummary`, `BookInventoryItem`).
- **`inventory`**: Book Stocks and the Receive Books form (`BookStock`).
- **`catalog`**: Books provided by the external Open Library API (`Book`).

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
│   ├── material-theme.scss             # Material 3 theme (Barnes & Noble green)
│   └── app/
│       ├── app.config.ts / app.routes.ts / app.ts
│       ├── shared/                     # domain, infrastructure, presentation
│       ├── bookstores/                 # domain, infrastructure, application, presentation
│       ├── inventory/                  # domain, infrastructure, application, presentation
│       └── catalog/                    # domain, infrastructure, application
└── README.md
```

## Technologies
- **Framework**: Angular 22.2.2 (Standalone Components, Signals, `inject()`)
- **Language**: TypeScript
- **UI & Theming**: Angular Material 22 (Material 3)
- **Routing**: `@angular/router` with lazy-loaded child routes per bounded context
- **Internationalization**: `@ngx-translate/core` & `@ngx-translate/http-loader`
- **Mock API**: `json-server` 0.17.4
- **External APIs**: Open Library API, Logo.dev Logo API

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
