# Barnes & Noble Inventory Platform (ea7742u20241g152)

## Overview
Web application that helps Barnes & Noble monitor book availability across its bookstores and register
received books. Each bookstore is specialized in one literary specialty, and the books offered for
reception come from the [Open Library API](https://openlibrary.org/developers/api).

## Authorship
- **Author:** Alexis Calin Torres Huaman
- **Student code:** u20241g152
- **Section (NRC):** 7742
- **Repository:** https://github.com/alexis-torres-1301/-----para-practicar-

## Features
- **Toolbar** with the Barnes & Noble logo (Logo.dev Logo API), the platform name and an EN / ES language switcher.
- **Sidenav** navigation with *Bookstore Overview* and *Receive Books*.
- **Bookstore Overview** (`/bookstores/overview`): a *Store Inventory* grid with two Bookstore Summary cards per row.
  Each card lists every book (title and total copies, grouping several Book Stocks of the same book) and shows the
  *Available Titles* and *Replenishment Required* indicators, or "Empty" when the bookstore has no Book Stocks.
- **Receive Books** (`/inventory/receipts/new`): reactive form to select the specialty, a book of that specialty
  (from Open Library) and the copies. The bookstore is assigned from the specialty, `receivedAt` is set automatically,
  and copies must be an integer between 1 and twice the bookstore minimum.
- **Page not found** view for unsupported routes, showing the invalid path and a button back to the overview.
- **Internationalization** in English (default) and Spanish.

## Technologies
- Angular 22.2.2 (standalone components, Signals, Router with lazy-loaded child routes)
- TypeScript
- Angular Material
- Angular HttpClient
- ngx-translate (`@ngx-translate/core`, `@ngx-translate/http-loader`)
- json-server 0.17.4 (Fake API)
- Open Library API and Logo.dev Logo API

## Project structure
The solution follows a domain-driven, layered architecture. Each bounded context has `domain`, `infrastructure`,
`application` and `presentation` layers.

| Bounded context | Responsibility |
|---|---|
| `shared` | Base entity, assembler and API endpoint types, `Specialty`, Logo.dev API, layout, language switcher, page not found |
| `bookstores` | `Bookstore` entity, `BookstoreSummary` read model, bookstore API and store, overview view and summary card |
| `inventory` | `BookStock` entity, book stock API and store, Receive Books form |
| `catalog` | `Book` entity, Open Library API, assembler and store |

## Configuration
Endpoints and keys are defined in `src/environments/environment*.ts`:
- `platformProviderApiBaseUrl`: Fake API base URL (`http://localhost:3000`).
- `catalogProviderApiBaseUrl`: Open Library base URL.
- `logoProviderPublishableKey`: Logo.dev publishable key. Replace it with your own key from [Logo.dev](https://logo.dev/).

## Running the application
Install dependencies:

```bash
npm install
```

Start the Fake API (json-server 0.17.4):

```bash
cd server
npx json-server --watch db.json
```

In another terminal, start the development server and open `http://localhost:4200/`:

```bash
ng serve
```

## Building

```bash
ng build
```
