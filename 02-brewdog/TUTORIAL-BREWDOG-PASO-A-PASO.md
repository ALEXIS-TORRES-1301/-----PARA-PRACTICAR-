# Tutorial paso a paso: parcial BrewDog (Angular 22 + arquitectura learning-center)

**Alumno:** Alexis Calin Torres Huaman · **Código:** u20241g152 · **NRC:** 7742 · **Proyecto:** `ea7742u20241g152`

Este tutorial reconstruye la solución de `02-brewdog/ea7742u20241g152/` **archivo por archivo**, en el mismo orden en que lo harías en el examen, con **25 commits**.
Cada paso tiene cinco partes: 🎯 qué haces, 💡 por qué, 📁 carpetas y archivos, ✅ cómo verificar y 📌 el commit.

**Cómo practicar con este tutorial**

1. **Primera vuelta (aprender):** escribe tú cada archivo mirando el código. **No copies y pegues**: escribirlo es lo que lo fija en la memoria. Lee siempre la parte 💡.
2. **Segunda vuelta (memorizar):** tapa el código y escribe solo con los títulos de cada paso. Mira el código únicamente cuando te trabes.
3. **Tercera vuelta (simulacro):** usa un repo nuevo y un cronómetro de 170 minutos, con solo la tabla de resumen a la vista.

> En el examen real **no** podrás tener este archivo abierto. Solo se permite la documentación oficial y el completado del IDE.

---

## Índice de commits

| # | Min | Mensaje |
|---|---|---|
| 1 | 0–8 | `chore: initialize angular 22.2.2 project with material and ngx-translate` |
| 2 | 8–11 | `chore(server): add json-server fake api data` |
| 3 | 11–15 | `docs(readme): add overview and authorship sections` |
| 4 | 15–20 | `build: configure environment variables for platform and external apis` |
| 5 | 20–25 | `style(theme): add material theme based on brewdog design` |
| 6 | 25–32 | `feat(i18n): add english and spanish translations with ngx-translate` |
| 7 | 32–34 | `feat(shared): add base entity domain contract` |
| 8 | 34–44 | `feat(shared): add base infrastructure for api endpoints and assemblers` |
| 9 | 44–49 | `feat(breweries): add brewery type and brewery entity` |
| 10 | 49–57 | `feat(breweries): integrate open brewery db api with assembler and endpoint` |
| 11 | 57–61 | `feat(breweries): add breweries store` |
| 12 | 61–68 | `feat(dispatches): add dispatch hub and dispatch order entities` |
| 13 | 68–73 | `feat(dispatches): add dispatch hub summary with tonnage indicators` |
| 14 | 73–82 | `feat(dispatches): add resources, assemblers and api endpoints` |
| 15 | 82–88 | `feat(dispatches): add dispatches api and store` |
| 16 | 88–91 | `feat(shared): add language switcher component` |
| 17 | 91–94 | `feat(shared): add footer content component` |
| 18 | 94–102 | `feat(shared): add layout with toolbar, sidenav and footer` |
| 19 | 102–106 | `feat(shared): add page not found view and root routes` |
| 20 | 106–114 | `feat(dispatches): add dispatch hub summary card component` |
| 21 | 114–121 | `feat(shared): add home view with my dispatch hubs grid` |
| 22 | 121–135 | `feat(dispatches): add new dispatch order form and routes` |
| 23 | 135–142 | `feat(dispatches): validate assigned tonnage against available capacity` |
| 24 | 142–150 | `style(ui): improve accessibility and responsive layout` |
| 25 | 150–158 | `docs(readme): add features, technologies and setup` |
| — | 158–170 | Verificación final, zip y entrega |

---

## Antes de empezar (una sola vez en tu PC)

```bash
node -v                                  # debe ser v24.x
npm install -g @angular/cli@22.2.2
npm install -g json-server@0.17.4
git config --global user.name "Alexis Calin Torres Huaman"
git config --global user.email "EL-CORREO-DE-TU-GITHUB"
```
En WebStorm, ve a **Settings → Version Control → GitHub** y verifica que tu cuenta esté como predeterminada.

---

## Commit 1: crear el proyecto y la repo privada

🎯 **Qué haces:** generas el proyecto Angular, instalas las librerías y lo subes a una repo privada.

💡 **Por qué:** `--skip-git` evita que Angular haga su propio commit "initial commit", que no sigue Conventional Commits. El primer commit lo haces tú con el mensaje correcto.

**1.** En la terminal, dentro de tu carpeta de proyectos:
```bash
ng new ea7742u20241g152 --style=css --ssr=false --skip-git
```
Cuando pregunte, responde así:
- **Zoneless?** No
- **AI tools?** None

**2.** Abre la carpeta en WebStorm (**File → Open**). En su terminal (`Alt + F12`) instala las librerías:
```bash
npm install @angular/material@22.2.2 @angular/cdk@22.2.2 @ngx-translate/core @ngx-translate/http-loader
npm install -D json-server@0.17.4
```

**3.** Borra `src/app/app.spec.ts`, porque no haremos tests.

**4.** Crea la repo: **Git → GitHub → Share Project on GitHub**.
- **Name:** `ea7742u20241g152`
- ✅ **Private**
- Haz clic en **Share**.

**5.** En la ventana "Add files for initial commit":
- Revisa que **no** esté `node_modules`.
- Cambia el mensaje por:

```text
chore: initialize angular 22.2.2 project with material and ngx-translate
```

**6.** En GitHub, entra a tu repo → **Settings → Collaborators → Add people** y agrega al profesor.

---

## Commit 2: fake API

🎯 **Qué haces:** colocas el `db.json` del examen y levantas json-server.

📁 Clic derecho sobre la raíz del proyecto → **New → Directory** → `server`. Copia ahí el `db.json` del zip del examen.

Abre una **segunda terminal** y déjala corriendo todo el examen:
```bash
cd server
json-server --watch db.json
```
Abre http://localhost:3000/dispatch-hubs y comprueba que veas 6 hubs.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `server/db.json`

```text
chore(server): add json-server fake api data
```

Luego haz clic en **Commit and Push**.

---

## Commit 3: README con Authorship

💡 **Por qué:** el examen exige la URL del repo en la sección *Authorship*, justo después del título y del *Overview*. Hacerlo al inicio deja evidencia temprana de autoría.

Reemplaza todo el contenido de `README.md`:

```markdown
# BrewDog Dispatch Logistics Platform (`ea7742u20241g152`)

## Overview
Angular 22 application that helps BrewDog control its dispatch hubs, outgoing freight dispatch orders and the maximum tonnage capacity of each hub.

## Authorship
- **Author:** Alexis Calin Torres Huaman
- **Student code:** u20241g152
- **Section (NRC):** 7742
- **Repository:** https://github.com/<tu-usuario>/ea7742u20241g152
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `README.md`

```text
docs(readme): add overview and authorship sections
```

Luego haz clic en **Commit and Push**.

---

## Commit 4: environments

🎯 **Qué haces:** defines todas las URLs y paths en variables de entorno.

💡 **Por qué:** el examen prohíbe escribir URLs a mano en el código ("hard coding"). Los endpoints las leerán de aquí. El comando `ng g environments` además agrega a `angular.json` el reemplazo de archivo para el modo desarrollo.

```bash
ng g environments
```
Reemplaza el contenido de ambos archivos.

**`src/environments/environment.ts`**
```ts
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
```

**`src/environments/environment.development.ts`**
```ts
/**
 * Development environment configuration.
 *
 * @summary Centralizes base URLs and paths so infrastructure classes avoid hard-coded URLs.
 * @author Alexis Calin Torres Huaman
 */
export const environment = {
  production: false,
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
```

> Regístrate gratis en https://logo.dev y reemplaza `YOUR_LOGO_DEV_PUBLISHABLE_KEY` por tu key; si no, el logo no carga.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`
- `angular.json`

```text
build: configure environment variables for platform and external apis
```

Luego haz clic en **Commit and Push**.

---

## Commit 5: tema visual de BrewDog

💡 **Por qué:** el examen pide parecerse al diseño de BrewDog: negro y blanco, títulos en mayúsculas con una fuente condensada y acentos cian. Angular Material 3 se configura con `mat.theme`.

📁 Crea `src/material-theme.scss` (clic derecho en `src` → **New → File**).

**`src/material-theme.scss`**
```scss
@use '@angular/material' as mat;

// BrewDog design approximation: black toolbar, bold condensed headings and cyan accents.
:root {
  @include mat.toolbar-overrides((
    container-background-color: #000000,
    container-text-color: #ffffff
  ));
  @include mat.sidenav-overrides((
    container-background-color: #f4f4f4
  ));
}

html {
  height: 100%;
  @include mat.theme((
    color: (
      primary: mat.$cyan-palette,
      tertiary: mat.$azure-palette,
    ),
    typography: (
      plain-family: Roboto,
      brand-family: Oswald,
    ),
    density: 0,
  ));
}

body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
  margin: 0;
  height: 100%;
}
```

En `angular.json`, dentro de `build → options → styles`, deja la lista así. El tema va **primero**:
```json
"styles": [
  "src/material-theme.scss",
  "src/styles.css"
]
```

**`src/styles.css`**
```css
/* Global styles shared by every view. */
html, body {
  height: 100%;
}

body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
}

h1, h2, h3 {
  font-family: Oswald, "Arial Narrow", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.container-with-spacing {
  margin: 16px;
}
```

**`src/index.html`**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>BrewDog Dispatch Logistics Platform</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/material-theme.scss`
- `src/styles.css`
- `src/index.html`
- `angular.json`

```text
style(theme): add material theme based on brewdog design
```

Luego haz clic en **Commit and Push**.

---

## Commit 6: i18n (inglés y español)

💡 **Por qué:** ngx-translate carga en tiempo de ejecución los JSON de `public/i18n/`. Las claves van en **kebab-case**, como pide el examen. Con `registerLocaleData(localeEs)` el `DatePipe` puede formatear fechas en español.

📁 Crea la carpeta `public/i18n/` con estos dos archivos:

**`public/i18n/en.json`**
```json
{
  "app": {
    "logo-alt": "BrewDog logo",
    "toggle-menu": "Toggle navigation menu",
    "language": "Preferred language",
    "navigation": "Main navigation"
  },
  "option": {
    "home": "Home",
    "new-dispatch-order": "New Dispatch Order"
  },
  "brewery-types": {
    "micro": "Micro",
    "nano": "Nano",
    "regional": "Regional",
    "brewpub": "Brewpub",
    "large": "Large",
    "contract": "Contract"
  },
  "home": {
    "title": "Home",
    "content": "Advanced Dispatch Order and Tonnage Management for Logistics Hubs.",
    "my-dispatch-hubs": "My Dispatch Hubs",
    "loading": "Loading dispatch hubs...",
    "no-dispatch-hubs": "No dispatch hubs found."
  },
  "dispatch-hub-summary": {
    "max-tonnage": "Max tonnage: {{ tonnage }} t",
    "orders": "Dispatch orders of {{ name }}",
    "tonnage-value": "{{ tonnage }} t",
    "dispatched-at": "Dispatched {{ date }}",
    "empty": "Empty",
    "total-dispatched-tonnage": "Total Dispatched Tonnage",
    "available-tonnage-capacity": "Available Tonnage Capacity"
  },
  "dispatch-order": {
    "title": "New Dispatch Order",
    "subtitle": "Register Freight Dispatch Order to Your Hub",
    "form-label": "New dispatch order form",
    "brewery-type": "Brewery Type",
    "brewery": "Destination Brewery",
    "assigned-tonnage": "Assigned Tonnage (t)",
    "dispatch-hub": "Dispatch hub: {{ name }}",
    "tonnage-hint": "Available capacity: {{ capacity }} t",
    "loading-breweries": "Loading breweries...",
    "create": "Create",
    "cancel": "Cancel",
    "error": {
      "brewery-type-required": "Brewery type is required",
      "brewery-required": "Destination brewery is required",
      "assigned-tonnage-required": "Assigned tonnage is required",
      "assigned-tonnage-min": "Assigned tonnage must be greater than 0",
      "assigned-tonnage-max": "Assigned tonnage must not exceed the available capacity of {{ capacity }} t",
      "no-capacity": "This dispatch hub has no available tonnage capacity.",
      "breweries-unavailable": "Breweries could not be loaded. Try again later.",
      "save-failed": "The dispatch order could not be created. Try again."
    }
  },
  "footer": {
    "about": "BrewDog Dispatch Logistics Platform · Global distribution of craft beer since 2007.",
    "rights": "Copyright © 2026 BrewDog. All rights reserved.",
    "network-status": "Distribution network status:",
    "operational": "Operational"
  },
  "page-not-found": {
    "title": "Page not found",
    "content": "The path <strong>/{{ invalid_path }}</strong> was not found.",
    "go-home": "Back to Home"
  }
}
```

**`public/i18n/es.json`**
```json
{
  "app": {
    "logo-alt": "Logo de BrewDog",
    "toggle-menu": "Mostrar u ocultar menú de navegación",
    "language": "Idioma preferido",
    "navigation": "Navegación principal"
  },
  "option": {
    "home": "Inicio",
    "new-dispatch-order": "Nueva Orden de Despacho"
  },
  "brewery-types": {
    "micro": "Micro",
    "nano": "Nano",
    "regional": "Regional",
    "brewpub": "Brewpub",
    "large": "Grande",
    "contract": "Por contrato"
  },
  "home": {
    "title": "Inicio",
    "content": "Gestión avanzada de órdenes de despacho y tonelaje para centros logísticos.",
    "my-dispatch-hubs": "Mis Centros de Despacho",
    "loading": "Cargando centros de despacho...",
    "no-dispatch-hubs": "No se encontraron centros de despacho."
  },
  "dispatch-hub-summary": {
    "max-tonnage": "Tonelaje máximo: {{ tonnage }} t",
    "orders": "Órdenes de despacho de {{ name }}",
    "tonnage-value": "{{ tonnage }} t",
    "dispatched-at": "Despachado {{ date }}",
    "empty": "Vacío",
    "total-dispatched-tonnage": "Tonelaje Total Despachado",
    "available-tonnage-capacity": "Capacidad de Tonelaje Disponible"
  },
  "dispatch-order": {
    "title": "Nueva Orden de Despacho",
    "subtitle": "Registre una orden de despacho de carga en su centro",
    "form-label": "Formulario de nueva orden de despacho",
    "brewery-type": "Tipo de Cervecería",
    "brewery": "Cervecería de Destino",
    "assigned-tonnage": "Tonelaje Asignado (t)",
    "dispatch-hub": "Centro de despacho: {{ name }}",
    "tonnage-hint": "Capacidad disponible: {{ capacity }} t",
    "loading-breweries": "Cargando cervecerías...",
    "create": "Crear",
    "cancel": "Cancelar",
    "error": {
      "brewery-type-required": "El tipo de cervecería es obligatorio",
      "brewery-required": "La cervecería de destino es obligatoria",
      "assigned-tonnage-required": "El tonelaje asignado es obligatorio",
      "assigned-tonnage-min": "El tonelaje asignado debe ser mayor que 0",
      "assigned-tonnage-max": "El tonelaje asignado no debe exceder la capacidad disponible de {{ capacity }} t",
      "no-capacity": "Este centro de despacho no tiene capacidad de tonelaje disponible.",
      "breweries-unavailable": "No se pudieron cargar las cervecerías. Intente más tarde.",
      "save-failed": "No se pudo crear la orden de despacho. Intente nuevamente."
    }
  },
  "footer": {
    "about": "BrewDog Dispatch Logistics Platform · Distribución global de cerveza artesanal desde 2007.",
    "rights": "Copyright © 2026 BrewDog. Todos los derechos reservados.",
    "network-status": "Estado de la red de distribución:",
    "operational": "Operativa"
  },
  "page-not-found": {
    "title": "Página no encontrada",
    "content": "La ruta <strong>/{{ invalid_path }}</strong> no fue encontrada.",
    "go-home": "Volver al Inicio"
  }
}
```

**`src/app/app.config.ts`**
```ts
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
```

Por ahora `app.ts` todavía **no** importa `Layout`, porque aún no existe. Escríbelo así:
```ts
import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

/**
 * Root component that bootstraps localization and the application shell.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Signal for the application title.
   */
  protected readonly title = signal('ea7742u20241g152');

  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Creates an instance of App and sets up translation with English as default.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
```

Reemplaza `src/app/app.html` (que trae la página de bienvenida de Angular) por `<router-outlet/>`. En el commit 18 lo cambiarás por `<app-layout/>`.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `public/i18n/en.json`
- `public/i18n/es.json`
- `src/app/app.config.ts`
- `src/app/app.ts`
- `src/app/app.html`

```text
feat(i18n): add english and spanish translations with ngx-translate
```

Luego haz clic en **Commit and Push**.

---

## Commit 7: shared, dominio

💡 **Por qué:** `BaseEntity` es el contrato mínimo de toda entidad con id numérico. Los genéricos de la infraestructura base lo exigen.

📁 Crea `src/app/shared/domain/model/`. En WebStorm puedes escribir la ruta completa en **New → Directory**.

**`src/app/shared/domain/model/base-entity.ts`**
```ts
/**
 * Minimal contract implemented by domain entities across bounded contexts.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  id: number;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/domain/model/base-entity.ts`

```text
feat(shared): add base entity domain contract
```

Luego haz clic en **Commit and Push**.

---

## Commit 8: shared, infraestructura base (patrón learning-center)

💡 **Por qué:** es el núcleo del patrón *Resource → Assembler → Endpoint → Api*.
- **`BaseResource` / `BaseResponse`:** la forma de los datos en la API.
- **`BaseAssembler`:** traduce entre el Resource y la entidad.
- **`BaseApiEndpoint`:** el CRUD genérico con `HttpClient` y el manejo de errores.
- **`BaseApi`:** la fachada que expone métodos al Store.
- **`ErrorHandlingEnabledBaseType`:** se usa en los endpoints que no son CRUD, como el de la API externa.

📁 Crea `src/app/shared/infrastructure/` y los archivos **en este orden**:

**`src/app/shared/infrastructure/base-response.ts`**
```ts
/**
 * Marker interface for HTTP response envelopes returned by API endpoints.
 *
 * @author Alexis Calin Torres Huaman
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseResponse {}

/**
 * Base contract for API resources that expose a numeric identifier.
 */
export interface BaseResource {
  /**
   * The unique identifier for the resource.
   */
  id: number;
}
```

**`src/app/shared/infrastructure/base-assembler.ts`**
```ts
import {BaseResource, BaseResponse} from './base-response';
import {BaseEntity} from '../domain/model/base-entity';

/**
 * Defines conversions between domain entities and API representations.
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with endpoint operations.
 * @typeParam TResponse - Response envelope type returned by collection queries.
 * @author Alexis Calin Torres Huaman
 */
export interface BaseAssembler<TEntity extends BaseEntity, TResource extends BaseResource, TResponse extends BaseResponse> {
  /**
   * Converts a resource to an entity.
   * @param resource - The resource to convert.
   * @returns The converted entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts an entity to a resource.
   * @param entity - The entity to convert.
   * @returns The converted resource.
   */
  toResourceFromEntity(entity: TEntity): TResource;

  /**
   * Converts a response envelope into a collection of domain entities.
   * @param response - Response payload returned by the API.
   * @returns Array of mapped domain entities.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
```

**`src/app/shared/infrastructure/error-handling-enabled-base-type.ts`**
```ts
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

/**
 * Provides reusable HTTP error translation for infrastructure services.
 *
 * @author Alexis Calin Torres Huaman
 */
export abstract class ErrorHandlingEnabledBaseType {
  /**
   * Creates an operation-specific HTTP error handler.
   * @param operation - Name of the failed operation.
   * @returns Function that transforms an {@link HttpErrorResponse} into a failed observable.
   */
  protected handleError = (operation: string) =>
    (error: HttpErrorResponse): Observable<never> => {
      let errorMessage: string;
      if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.status || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
}
```

**`src/app/shared/infrastructure/base-api-endpoint.ts`**
```ts
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';

/**
 * Provides generic CRUD operations for a single REST endpoint.
 *
 * @typeParam TEntity - Domain entity handled by the endpoint.
 * @typeParam TResource - Resource representation exchanged with the API.
 * @typeParam TResponse - Response envelope returned for collection queries.
 * @typeParam TAssembler - Mapper that translates between entities and resources.
 * @author Alexis Calin Torres Huaman
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {}

  /**
   * Fetches all entities from the configured endpoint.
   * @returns Stream with the mapped entity collection.
   */
  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response.map(resource => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /**
   * Fetches a single entity by identifier.
   * @param id - Entity identifier.
   * @returns Stream with the mapped entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  /**
   * Creates a new entity in the remote endpoint.
   *
   * @remarks
   * The identifier is omitted so the backend generates it.
   *
   * @param entity - Entity to persist.
   * @returns Stream with the created entity returned by the API.
   */
  create(entity: TEntity): Observable<TEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, ...resource} = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /**
   * Updates an existing entity.
   * @param entity - Entity state to persist.
   * @param id - Identifier of the target entity.
   * @returns Stream with the updated entity returned by the API.
   */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  /**
   * Deletes an entity by identifier.
   * @param id - Identifier of the entity to remove.
   * @returns Completion stream for the delete operation.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  /**
   * Builds a reusable HTTP error handler for endpoint operations.
   * @param operation - Name of the operation to include in the error context.
   * @returns Function that maps an HTTP error into a failed observable.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage: string;
      if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else {
        errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      }
      return throwError(() => new Error(errorMessage));
    };
  }
}
```

**`src/app/shared/infrastructure/base-api.ts`**
```ts
/**
 * Defines the base type for API facades in a bounded context.
 *
 * @remarks
 * A concrete API service composes one or more endpoint classes and exposes
 * domain-oriented methods to the application layer.
 *
 * @author Alexis Calin Torres Huaman
 */
export abstract class BaseApi {
  // No methods defined; child classes compose endpoint instances.
}
```

> Fíjate en `create()`: hace `const {id, ...resource}` para **no enviar el id**. Así json-server genera el siguiente id. Si envías `id: 0`, se guarda con id 0.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/infrastructure/base-response.ts`
- `src/app/shared/infrastructure/base-assembler.ts`
- `src/app/shared/infrastructure/error-handling-enabled-base-type.ts`
- `src/app/shared/infrastructure/base-api-endpoint.ts`
- `src/app/shared/infrastructure/base-api.ts`

```text
feat(shared): add base infrastructure for api endpoints and assemblers
```

Luego haz clic en **Commit and Push**.

---

## Commit 9: breweries, dominio

💡 **Por qué:**
- `BreweryType` es un *union type* con los 6 valores del enunciado; así TypeScript impide que escribas un tipo inválido.
- `Brewery` **no** implementa `BaseEntity`, porque su `id` es un UUID (string).
- Las entidades usan campos privados `#` con get y set, igual que `Course` y `Category` en learning-center.

📁 Crea `src/app/breweries/domain/model/`.

**`src/app/breweries/domain/model/brewery-type.ts`**
```ts
/**
 * Type of brewery, as classified by the Open Brewery DB API.
 *
 * @remarks
 * Each value matches the `by_type` filter of the breweries endpoint and identifies a single dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
export type BreweryType = 'micro' | 'nano' | 'regional' | 'brewpub' | 'large' | 'contract';

/**
 * Every supported brewery type, in display order.
 */
export const BREWERY_TYPES: readonly BreweryType[] = ['micro', 'nano', 'regional', 'brewpub', 'large', 'contract'];
```

**`src/app/breweries/domain/model/brewery.entity.ts`**
```ts
import {BreweryType} from './brewery-type';

/**
 * Represents a destination brewery provided by the external breweries API.
 *
 * @author Alexis Calin Torres Huaman
 */
export class Brewery {
  /**
   * Unique identifier of the brewery (UUID).
   */
  #id: string;

  /**
   * Name of the brewery.
   */
  #name: string;

  /**
   * Type of the brewery.
   */
  #breweryType: BreweryType;

  /**
   * Creates a new brewery entity.
   *
   * @param brewery - Initialization values.
   * @param brewery.id - Unique identifier of the brewery.
   * @param brewery.name - Name of the brewery.
   * @param brewery.breweryType - Type of the brewery.
   */
  constructor(brewery: { id: string; name: string; breweryType: BreweryType }) {
    this.#id = brewery.id;
    this.#name = brewery.name;
    this.#breweryType = brewery.breweryType;
  }

  /**
   * Gets the unique identifier of the brewery.
   * @returns The brewery identifier.
   */
  get id(): string {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the brewery.
   * @param value - The brewery identifier.
   */
  set id(value: string) {
    this.#id = value;
  }

  /**
   * Gets the name of the brewery.
   * @returns The brewery name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Sets the name of the brewery.
   * @param value - The brewery name.
   */
  set name(value: string) {
    this.#name = value;
  }

  /**
   * Gets the type of the brewery.
   * @returns The brewery type.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the type of the brewery.
   * @param value - The brewery type.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/breweries/domain/model/brewery-type.ts`
- `src/app/breweries/domain/model/brewery.entity.ts`

```text
feat(breweries): add brewery type and brewery entity
```

Luego haz clic en **Commit and Push**.

---

## Commit 10: breweries, integración con Open Brewery DB

💡 **Por qué:**
- La API devuelve un **array plano** con `brewery_type` en *snake_case*.
- El enunciado dice que eso **no debe afectar** a las entidades: `brewery_type` existe **solo** en el Resource, y el **Assembler** lo traduce a `breweryType`.
- El endpoint extiende `ErrorHandlingEnabledBaseType` en vez de `BaseApiEndpoint` porque no es un CRUD con id numérico. Es el mismo patrón que `SignInApiEndpoint` en learning-center.

📁 Crea `src/app/breweries/infrastructure/` y los archivos en este orden:

**`src/app/breweries/infrastructure/breweries-response.ts`**
```ts
/**
 * Resource representation of a brewery returned by the Open Brewery DB API.
 *
 * @remarks
 * Property names follow the provider (snake_case); the assembler maps them to the domain entity.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface BreweryResource {
  /**
   * Unique identifier of the brewery (UUID).
   */
  id: string;

  /**
   * Name of the brewery.
   */
  name: string;

  /**
   * Type of the brewery.
   */
  brewery_type: string;

  /**
   * City where the brewery is located.
   */
  city?: string;

  /**
   * Country where the brewery is located.
   */
  country?: string;
}

/**
 * Response returned by the breweries endpoint: a JSON array of brewery resources.
 */
export type BreweriesResponse = BreweryResource[];
```

**`src/app/breweries/infrastructure/brewery-assembler.ts`**
```ts
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesResponse, BreweryResource} from './breweries-response';

/**
 * Maps brewery resources from the external API into brewery entities.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BreweryAssembler {
  /**
   * Converts a BreweriesResponse to an array of Brewery entities.
   * @param response - The API response containing breweries.
   * @returns An array of Brewery entities.
   */
  toEntitiesFromResponse = (response: BreweriesResponse): Brewery[] =>
    (response ?? []).map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BreweryResource to a Brewery entity, mapping `brewery_type` to `breweryType`.
   * @param resource - The resource to convert.
   * @returns The converted Brewery entity.
   */
  toEntityFromResource = (resource: BreweryResource): Brewery =>
    new Brewery({
      id: resource.id,
      name: resource.name,
      breweryType: resource.brewery_type as BreweryType
    });
}
```

**`src/app/breweries/infrastructure/breweries-api-endpoint.ts`**
```ts
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweryAssembler} from './brewery-assembler';
import {BreweriesResponse} from './breweries-response';

const breweriesApiEndpointUrl = `${environment.breweriesProviderApiBaseUrl}${environment.breweriesProviderBreweriesEndpointPath}`;

/**
 * Encapsulates the Open Brewery DB HTTP operations for breweries.
 *
 * @author Alexis Calin Torres Huaman
 */
export class BreweriesApiEndpoint extends ErrorHandlingEnabledBaseType {
  /**
   * Creates an instance of BreweriesApiEndpoint.
   * @param http - The HttpClient for making HTTP requests.
   * @param assembler - The assembler for converting resources into entities.
   */
  constructor(private http: HttpClient, private assembler: BreweryAssembler) {
    super();
  }

  /**
   * Fetches the breweries of a brewery type.
   * @param breweryType - Brewery type used as `by_type` filter.
   * @returns Stream with the brewery collection.
   */
  getByType = (breweryType: BreweryType): Observable<Brewery[]> =>
    this.http.get<BreweriesResponse>(breweriesApiEndpointUrl, {
      params: {by_type: breweryType, per_page: environment.breweriesProviderPageSize}
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch breweries'))
    );
}
```

**`src/app/breweries/infrastructure/breweries-api.ts`**
```ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApiEndpoint} from './breweries-api-endpoint';
import {BreweryAssembler} from './brewery-assembler';

/**
 * Infrastructure facade for breweries endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BreweriesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly breweriesEndpoint = new BreweriesApiEndpoint(this.http, new BreweryAssembler());

  /**
   * Retrieves the breweries of a brewery type.
   * @param breweryType - Brewery type to query.
   * @returns Stream with the brewery collection.
   */
  getBreweriesByType = (breweryType: BreweryType): Observable<Brewery[]> =>
    this.breweriesEndpoint.getByType(breweryType);
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/breweries/infrastructure/breweries-response.ts`
- `src/app/breweries/infrastructure/brewery-assembler.ts`
- `src/app/breweries/infrastructure/breweries-api-endpoint.ts`
- `src/app/breweries/infrastructure/breweries-api.ts`

```text
feat(breweries): integrate open brewery db api with assembler and endpoint
```

Luego haz clic en **Commit and Push**.

---

## Commit 11: breweries, store

💡 **Por qué:** el Store guarda el estado con **Signals**: un `signal` privado y su versión `asReadonly()` pública.
- `loadBreweriesByType` cancela la petición anterior. Si el usuario cambia rápido de tipo, no se mezclan los resultados.
- `getBreweryById` permite que el formulario recupere el nombre de la cervecería a partir del id seleccionado.

📁 Crea `src/app/breweries/application/`.

**`src/app/breweries/application/breweries.store.ts`**
```ts
import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Brewery} from '../domain/model/brewery.entity';
import {BreweryType} from '../domain/model/brewery-type';
import {BreweriesApi} from '../infrastructure/breweries-api';

/**
 * Holds breweries application state with the breweries of the selected type.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class BreweriesStore {
  private readonly breweriesApi = inject(BreweriesApi);
  private breweriesSubscription: Subscription | null = null;

  private readonly breweriesSignal = signal<Brewery[]>([]);

  /**
   * Readonly signal for the breweries of the last requested type.
   */
  readonly breweries = this.breweriesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if breweries are loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the breweries of a type, cancelling any pending request.
   * @param breweryType - Brewery type to query.
   */
  loadBreweriesByType = (breweryType: BreweryType): void => {
    this.breweriesSubscription?.unsubscribe();
    this.breweriesSignal.set([]);
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.breweriesSubscription = this.breweriesApi.getBreweriesByType(breweryType).subscribe({
      next: breweries => {
        this.breweriesSignal.set(breweries);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load breweries'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Selects a loaded brewery by identifier.
   * @param id - Brewery identifier.
   * @returns The brewery, or undefined when it is not loaded.
   */
  getBreweryById = (id: string): Brewery | undefined =>
    this.breweriesSignal().find(brewery => brewery.id === id);

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/breweries/application/breweries.store.ts`

```text
feat(breweries): add breweries store
```

Luego haz clic en **Commit and Push**.

---

## Commit 12: dispatches, entidades

💡 **Por qué:** son las dos entidades del json-server.
- `dispatchedAt` es un `Date` en la entidad, aunque en la API sea un string. El Assembler hace la conversión.
- `breweryId` es un string, porque guarda el UUID de la API externa.

📁 Crea `src/app/dispatches/domain/model/`.

**`src/app/dispatches/domain/model/dispatch-hub.entity.ts`**
```ts
import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

/**
 * Represents a BrewDog dispatch hub that ships orders to breweries of a single type.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHub implements BaseEntity {
  /**
   * Unique identifier of the dispatch hub.
   */
  #id: number;

  /**
   * Name of the dispatch hub.
   */
  #name: string;

  /**
   * Brewery type served by the dispatch hub.
   */
  #breweryType: BreweryType;

  /**
   * Maximum tonnage the dispatch hub can dispatch.
   */
  #maxTonnage: number;

  /**
   * Creates a new DispatchHub entity.
   *
   * @param dispatchHub - Initialization values.
   * @param dispatchHub.id - Unique identifier of the dispatch hub.
   * @param dispatchHub.name - Name of the dispatch hub.
   * @param dispatchHub.breweryType - Brewery type served by the dispatch hub.
   * @param dispatchHub.maxTonnage - Maximum tonnage the dispatch hub can dispatch.
   */
  constructor(dispatchHub: { id: number; name: string; breweryType: BreweryType; maxTonnage: number }) {
    this.#id = dispatchHub.id;
    this.#name = dispatchHub.name;
    this.#breweryType = dispatchHub.breweryType;
    this.#maxTonnage = dispatchHub.maxTonnage;
  }

  /**
   * Gets the unique identifier of the dispatch hub.
   * @returns The unique identifier of the dispatch hub.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the dispatch hub.
   * @param value - The unique identifier of the dispatch hub.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the name of the dispatch hub.
   * @returns The name of the dispatch hub.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Sets the name of the dispatch hub.
   * @param value - The name of the dispatch hub.
   */
  set name(value: string) {
    this.#name = value;
  }

  /**
   * Gets the brewery type served by the dispatch hub.
   * @returns The brewery type served by the dispatch hub.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the brewery type served by the dispatch hub.
   * @param value - The brewery type served by the dispatch hub.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  /**
   * Gets the maximum tonnage the dispatch hub can dispatch.
   * @returns The maximum tonnage the dispatch hub can dispatch.
   */
  get maxTonnage(): number {
    return this.#maxTonnage;
  }

  /**
   * Sets the maximum tonnage the dispatch hub can dispatch.
   * @param value - The maximum tonnage the dispatch hub can dispatch.
   */
  set maxTonnage(value: number) {
    this.#maxTonnage = value;
  }
}
```

**`src/app/dispatches/domain/model/dispatch-order.entity.ts`**
```ts
import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {BreweryType} from '../../../breweries/domain/model/brewery-type';

/**
 * Represents a freight dispatch order from a dispatch hub to a destination brewery.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrder implements BaseEntity {
  /**
   * Unique identifier of the dispatch order.
   */
  #id: number;

  /**
   * Identifier of the dispatch hub that ships the order.
   */
  #dispatchHubId: number;

  /**
   * Type of the destination brewery.
   */
  #breweryType: BreweryType;

  /**
   * Identifier of the destination brewery.
   */
  #breweryId: string;

  /**
   * Name of the destination brewery.
   */
  #breweryName: string;

  /**
   * Tonnage assigned to the order.
   */
  #assignedTonnage: number;

  /**
   * Date and time when the order was dispatched.
   */
  #dispatchedAt: Date;

  /**
   * Creates a new DispatchOrder entity.
   *
   * @param dispatchOrder - Initialization values.
   * @param dispatchOrder.id - Unique identifier of the dispatch order.
   * @param dispatchOrder.dispatchHubId - Identifier of the dispatch hub that ships the order.
   * @param dispatchOrder.breweryType - Type of the destination brewery.
   * @param dispatchOrder.breweryId - Identifier of the destination brewery.
   * @param dispatchOrder.breweryName - Name of the destination brewery.
   * @param dispatchOrder.assignedTonnage - Tonnage assigned to the order.
   * @param dispatchOrder.dispatchedAt - Date and time when the order was dispatched.
   */
  constructor(dispatchOrder: { id: number; dispatchHubId: number; breweryType: BreweryType; breweryId: string; breweryName: string; assignedTonnage: number; dispatchedAt: Date }) {
    this.#id = dispatchOrder.id;
    this.#dispatchHubId = dispatchOrder.dispatchHubId;
    this.#breweryType = dispatchOrder.breweryType;
    this.#breweryId = dispatchOrder.breweryId;
    this.#breweryName = dispatchOrder.breweryName;
    this.#assignedTonnage = dispatchOrder.assignedTonnage;
    this.#dispatchedAt = dispatchOrder.dispatchedAt;
  }

  /**
   * Gets the unique identifier of the dispatch order.
   * @returns The unique identifier of the dispatch order.
   */
  get id(): number {
    return this.#id;
  }

  /**
   * Sets the unique identifier of the dispatch order.
   * @param value - The unique identifier of the dispatch order.
   */
  set id(value: number) {
    this.#id = value;
  }

  /**
   * Gets the identifier of the dispatch hub that ships the order.
   * @returns The identifier of the dispatch hub that ships the order.
   */
  get dispatchHubId(): number {
    return this.#dispatchHubId;
  }

  /**
   * Sets the identifier of the dispatch hub that ships the order.
   * @param value - The identifier of the dispatch hub that ships the order.
   */
  set dispatchHubId(value: number) {
    this.#dispatchHubId = value;
  }

  /**
   * Gets the type of the destination brewery.
   * @returns The type of the destination brewery.
   */
  get breweryType(): BreweryType {
    return this.#breweryType;
  }

  /**
   * Sets the type of the destination brewery.
   * @param value - The type of the destination brewery.
   */
  set breweryType(value: BreweryType) {
    this.#breweryType = value;
  }

  /**
   * Gets the identifier of the destination brewery.
   * @returns The identifier of the destination brewery.
   */
  get breweryId(): string {
    return this.#breweryId;
  }

  /**
   * Sets the identifier of the destination brewery.
   * @param value - The identifier of the destination brewery.
   */
  set breweryId(value: string) {
    this.#breweryId = value;
  }

  /**
   * Gets the name of the destination brewery.
   * @returns The name of the destination brewery.
   */
  get breweryName(): string {
    return this.#breweryName;
  }

  /**
   * Sets the name of the destination brewery.
   * @param value - The name of the destination brewery.
   */
  set breweryName(value: string) {
    this.#breweryName = value;
  }

  /**
   * Gets the tonnage assigned to the order.
   * @returns The tonnage assigned to the order.
   */
  get assignedTonnage(): number {
    return this.#assignedTonnage;
  }

  /**
   * Sets the tonnage assigned to the order.
   * @param value - The tonnage assigned to the order.
   */
  set assignedTonnage(value: number) {
    this.#assignedTonnage = value;
  }

  /**
   * Gets the date and time when the order was dispatched.
   * @returns The date and time when the order was dispatched.
   */
  get dispatchedAt(): Date {
    return this.#dispatchedAt;
  }

  /**
   * Sets the date and time when the order was dispatched.
   * @param value - The date and time when the order was dispatched.
   */
  set dispatchedAt(value: Date) {
    this.#dispatchedAt = value;
  }
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/domain/model/dispatch-hub.entity.ts`
- `src/app/dispatches/domain/model/dispatch-order.entity.ts`

```text
feat(dispatches): add dispatch hub and dispatch order entities
```

Luego haz clic en **Commit and Push**.

---

## Commit 13: dispatches, `DispatchHubSummary` (la lógica de negocio)

💡 **Por qué:** aquí están **todas las reglas del enunciado**, en el dominio y no en el componente. Esto suma en "Code Quality".
- **Total Dispatched Tonnage:** la suma de `assignedTonnage` de las órdenes del hub (`reduce`).
- **Available Tonnage Capacity:** `maxTonnage − total`.
- **Empty:** el hub no tiene órdenes.
- **Regla de registro:** `canDispatch(t)` exige que `t > 0` y que `t ≤ disponible`.

📁 En la misma carpeta `domain/model/`:

**`src/app/dispatches/domain/model/dispatch-hub-summary.ts`**
```ts
import {DispatchHub} from './dispatch-hub.entity';
import {DispatchOrder} from './dispatch-order.entity';

/**
 * Read model that summarizes the dispatch orders and tonnage of a dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubSummary {
  /**
   * Dispatch orders that belong to the hub, most recent first.
   */
  readonly orders: DispatchOrder[];

  /**
   * Creates a summary for a dispatch hub.
   *
   * @param dispatchHub - The summarized dispatch hub.
   * @param dispatchOrders - Dispatch orders; only the ones of this hub are considered.
   */
  constructor(readonly dispatchHub: DispatchHub, dispatchOrders: DispatchOrder[]) {
    this.orders = dispatchOrders
      .filter(order => order.dispatchHubId === dispatchHub.id)
      .sort((a, b) => b.dispatchedAt.getTime() - a.dispatchedAt.getTime());
  }

  /**
   * True when no dispatch orders were registered for the hub.
   */
  get isEmpty(): boolean {
    return this.orders.length === 0;
  }

  /**
   * Sum of the assigned tonnage of every order of the hub.
   */
  get totalDispatchedTonnage(): number {
    return this.orders.reduce((total, order) => total + order.assignedTonnage, 0);
  }

  /**
   * Maximum tonnage of the hub minus the total dispatched tonnage.
   */
  get availableTonnageCapacity(): number {
    return this.dispatchHub.maxTonnage - this.totalDispatchedTonnage;
  }

  /**
   * Checks whether a new order with the given tonnage can be dispatched.
   * @param assignedTonnage - Tonnage of the new order.
   * @returns True when it is greater than zero and not above the available tonnage capacity.
   */
  canDispatch(assignedTonnage: number): boolean {
    return assignedTonnage > 0 && assignedTonnage <= this.availableTonnageCapacity;
  }
}
```

🧮 **Compruébalo a mano con el `db.json` del examen:** el hub Micro (maxTonnage 850) tiene las órdenes 210 y 180, así que el total es **390** y el disponible es **460**.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/domain/model/dispatch-hub-summary.ts`

```text
feat(dispatches): add dispatch hub summary with tonnage indicators
```

Luego haz clic en **Commit and Push**.

---

## Commit 14: dispatches, resources, assemblers y endpoints

💡 **Por qué:** es el mismo patrón para cada recurso del json-server:
1. **Response:** la forma del JSON.
2. **Assembler:** convierte entre el JSON y la entidad.
3. **ApiEndpoint:** extiende `BaseApiEndpoint` y le pasa la URL del `environment`.

📁 Crea `src/app/dispatches/infrastructure/` y los archivos en este orden:

**`src/app/dispatches/infrastructure/dispatch-hubs-response.ts`**
```ts
import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a dispatch hub exchanged with the platform API.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface DispatchHubResource extends BaseResource {
  /**
   * Unique identifier of the dispatch hub.
   */
  id: number;

  /**
   * Name of the dispatch hub.
   */
  name: string;

  /**
   * Brewery type served by the dispatch hub.
   */
  breweryType: string;

  /**
   * Maximum tonnage the dispatch hub can dispatch.
   */
  maxTonnage: number;
}

/**
 * Response envelope for dispatch hub collection queries.
 */
export interface DispatchHubsResponse extends BaseResponse {
  /**
   * Dispatch hub resources included in the response.
   */
  dispatchHubs: DispatchHubResource[];
}
```

**`src/app/dispatches/infrastructure/dispatch-hub-assembler.ts`**
```ts
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';

/**
 * Maps dispatch hub entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubAssembler implements BaseAssembler<DispatchHub, DispatchHubResource, DispatchHubsResponse> {
  /**
   * Converts a DispatchHubsResponse to an array of DispatchHub entities.
   * @param response - The API response containing dispatch hubs.
   * @returns An array of DispatchHub entities.
   */
  toEntitiesFromResponse = (response: DispatchHubsResponse): DispatchHub[] =>
    response.dispatchHubs.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DispatchHubResource to a DispatchHub entity.
   * @param resource - The resource to convert.
   * @returns The converted DispatchHub entity.
   */
  toEntityFromResource = (resource: DispatchHubResource): DispatchHub =>
    new DispatchHub({
      id: resource.id,
      name: resource.name,
      breweryType: resource.breweryType as BreweryType,
      maxTonnage: resource.maxTonnage
    });

  /**
   * Converts a DispatchHub entity to a DispatchHubResource.
   * @param entity - The entity to convert.
   * @returns The converted DispatchHubResource.
   */
  toResourceFromEntity = (entity: DispatchHub): DispatchHubResource => ({
    id: entity.id,
    name: entity.name,
    breweryType: entity.breweryType,
    maxTonnage: entity.maxTonnage
  });
}
```

**`src/app/dispatches/infrastructure/dispatch-hubs-api-endpoint.ts`**
```ts
import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchHubResource, DispatchHubsResponse} from './dispatch-hubs-response';
import {DispatchHubAssembler} from './dispatch-hub-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for dispatch hub operations.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchHubsApiEndpoint extends BaseApiEndpoint<DispatchHub, DispatchHubResource, DispatchHubsResponse, DispatchHubAssembler> {
  /**
   * Creates an instance of DispatchHubsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchHubsEndpointPath}`,
      new DispatchHubAssembler());
  }
}
```

**`src/app/dispatches/infrastructure/dispatch-orders-response.ts`**
```ts
import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a dispatch order exchanged with the platform API.
 *
 * @author Alexis Calin Torres Huaman
 */
export interface DispatchOrderResource extends BaseResource {
  /**
   * Unique identifier of the dispatch order.
   */
  id: number;

  /**
   * Identifier of the dispatch hub that ships the order.
   */
  dispatchHubId: number;

  /**
   * Type of the destination brewery.
   */
  breweryType: string;

  /**
   * Identifier of the destination brewery.
   */
  breweryId: string;

  /**
   * Name of the destination brewery.
   */
  breweryName: string;

  /**
   * Tonnage assigned to the order.
   */
  assignedTonnage: number;

  /**
   * ISO-8601 date and time when the order was dispatched.
   */
  dispatchedAt: string;
}

/**
 * Response envelope for dispatch order collection queries.
 */
export interface DispatchOrdersResponse extends BaseResponse {
  /**
   * Dispatch order resources included in the response.
   */
  dispatchOrders: DispatchOrderResource[];
}
```

**`src/app/dispatches/infrastructure/dispatch-order-assembler.ts`**
```ts
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BreweryType} from '../../breweries/domain/model/brewery-type';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';

/**
 * Maps dispatch order entities to and from API resources.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrderAssembler implements BaseAssembler<DispatchOrder, DispatchOrderResource, DispatchOrdersResponse> {
  /**
   * Converts a DispatchOrdersResponse to an array of DispatchOrder entities.
   * @param response - The API response containing dispatch orders.
   * @returns An array of DispatchOrder entities.
   */
  toEntitiesFromResponse = (response: DispatchOrdersResponse): DispatchOrder[] =>
    response.dispatchOrders.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DispatchOrderResource to a DispatchOrder entity.
   * @param resource - The resource to convert.
   * @returns The converted DispatchOrder entity.
   */
  toEntityFromResource = (resource: DispatchOrderResource): DispatchOrder =>
    new DispatchOrder({
      id: resource.id,
      dispatchHubId: resource.dispatchHubId,
      breweryType: resource.breweryType as BreweryType,
      breweryId: resource.breweryId,
      breweryName: resource.breweryName,
      assignedTonnage: resource.assignedTonnage,
      dispatchedAt: new Date(resource.dispatchedAt)
    });

  /**
   * Converts a DispatchOrder entity to a DispatchOrderResource.
   * @param entity - The entity to convert.
   * @returns The converted DispatchOrderResource.
   */
  toResourceFromEntity = (entity: DispatchOrder): DispatchOrderResource => ({
    id: entity.id,
    dispatchHubId: entity.dispatchHubId,
    breweryType: entity.breweryType,
    breweryId: entity.breweryId,
    breweryName: entity.breweryName,
    assignedTonnage: entity.assignedTonnage,
    dispatchedAt: entity.dispatchedAt.toISOString()
  });
}
```

**`src/app/dispatches/infrastructure/dispatch-orders-api-endpoint.ts`**
```ts
import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchOrderResource, DispatchOrdersResponse} from './dispatch-orders-response';
import {DispatchOrderAssembler} from './dispatch-order-assembler';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for dispatch order operations.
 *
 * @author Alexis Calin Torres Huaman
 */
export class DispatchOrdersApiEndpoint extends BaseApiEndpoint<DispatchOrder, DispatchOrderResource, DispatchOrdersResponse, DispatchOrderAssembler> {
  /**
   * Creates an instance of DispatchOrdersApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDispatchOrdersEndpointPath}`,
      new DispatchOrderAssembler());
  }
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/infrastructure/dispatch-hubs-response.ts`
- `src/app/dispatches/infrastructure/dispatch-hub-assembler.ts`
- `src/app/dispatches/infrastructure/dispatch-hubs-api-endpoint.ts`
- `src/app/dispatches/infrastructure/dispatch-orders-response.ts`
- `src/app/dispatches/infrastructure/dispatch-order-assembler.ts`
- `src/app/dispatches/infrastructure/dispatch-orders-api-endpoint.ts`

```text
feat(dispatches): add resources, assemblers and api endpoints
```

Luego haz clic en **Commit and Push**.

---

## Commit 15: dispatches, API (fachada) y Store

💡 **Por qué:**
- **`DispatchesApi`:** reúne los dos endpoints, igual que `LearningApi` en learning-center.
- **`DispatchesStore`:**
  - carga hubs y órdenes en el constructor;
  - `dispatchHubSummaries` es un `computed`, que se **recalcula solo** cuando llega una orden nueva, y por eso la Home se actualiza al volver del formulario;
  - `addDispatchOrder` recibe callbacks, para que el formulario **navegue solo cuando el POST terminó bien**.

**`src/app/dispatches/infrastructure/dispatches-api.ts`**
```ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchHubsApiEndpoint} from './dispatch-hubs-api-endpoint';
import {DispatchOrdersApiEndpoint} from './dispatch-orders-api-endpoint';

/**
 * Infrastructure facade for dispatch hub and dispatch order endpoint operations.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class DispatchesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly dispatchHubsEndpoint = new DispatchHubsApiEndpoint(this.http);
  private readonly dispatchOrdersEndpoint = new DispatchOrdersApiEndpoint(this.http);

  /**
   * Retrieves all dispatch hubs.
   * @returns Stream with the dispatch hub collection.
   */
  getDispatchHubs = (): Observable<DispatchHub[]> =>
    this.dispatchHubsEndpoint.getAll();

  /**
   * Retrieves all dispatch orders.
   * @returns Stream with the dispatch order collection.
   */
  getDispatchOrders = (): Observable<DispatchOrder[]> =>
    this.dispatchOrdersEndpoint.getAll();

  /**
   * Creates a new dispatch order.
   * @param dispatchOrder - The dispatch order to create.
   * @returns Stream with the created dispatch order.
   */
  createDispatchOrder = (dispatchOrder: DispatchOrder): Observable<DispatchOrder> =>
    this.dispatchOrdersEndpoint.create(dispatchOrder);
}
```

📁 Crea `src/app/dispatches/application/`.

**`src/app/dispatches/application/dispatches.store.ts`**
```ts
import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DispatchHub} from '../domain/model/dispatch-hub.entity';
import {DispatchOrder} from '../domain/model/dispatch-order.entity';
import {DispatchHubSummary} from '../domain/model/dispatch-hub-summary';
import {DispatchesApi} from '../infrastructure/dispatches-api';
import {BreweryType} from '../../breweries/domain/model/brewery-type';

/**
 * Holds dispatch application state and coordinates dispatch hub and order behavior.
 *
 * @author Alexis Calin Torres Huaman
 */
@Injectable({providedIn: 'root'})
export class DispatchesStore {
  private readonly dispatchesApi = inject(DispatchesApi);

  private readonly dispatchHubsSignal = signal<DispatchHub[]>([]);

  /**
   * Readonly signal for the list of dispatch hubs.
   */
  readonly dispatchHubs = this.dispatchHubsSignal.asReadonly();

  private readonly dispatchOrdersSignal = signal<DispatchOrder[]>([]);

  /**
   * Readonly signal for the list of dispatch orders.
   */
  readonly dispatchOrders = this.dispatchOrdersSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Computed summary per dispatch hub, recomputed when hubs or orders change.
   */
  readonly dispatchHubSummaries = computed(() =>
    this.dispatchHubs().map(hub => new DispatchHubSummary(hub, this.dispatchOrders())));

  /**
   * Creates an instance of DispatchesStore and loads initial data.
   */
  constructor() {
    this.loadDispatchHubs();
    this.loadDispatchOrders();
  }

  /**
   * Selects the summary of the dispatch hub that serves a brewery type (one hub per type).
   * @param breweryType - Brewery type to search.
   * @returns Reactive selection for the matching dispatch hub summary.
   */
  getDispatchHubSummaryByBreweryType = (breweryType: BreweryType): Signal<DispatchHubSummary | undefined> =>
    computed(() => this.dispatchHubSummaries().find(summary => summary.dispatchHub.breweryType === breweryType));

  /**
   * Adds a new dispatch order once it is persisted.
   * @param dispatchOrder - The dispatch order to add.
   * @param onCreated - Callback invoked after the order is persisted.
   * @param onFailed - Callback invoked when the order could not be persisted.
   */
  addDispatchOrder = (dispatchOrder: DispatchOrder, onCreated?: () => void, onFailed?: () => void): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.dispatchesApi.createDispatchOrder(dispatchOrder).subscribe({
      next: createdOrder => {
        this.dispatchOrdersSignal.update(orders => [...orders, createdOrder]);
        this.loadingSignal.set(false);
        onCreated?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create dispatch order'));
        this.loadingSignal.set(false);
        onFailed?.();
      }
    });
  };

  /**
   * Loads all dispatch hubs from the API.
   */
  private loadDispatchHubs = (): void => {
    this.loadingSignal.set(true);
    this.dispatchesApi.getDispatchHubs().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchHubs => {
        this.dispatchHubsSignal.set(dispatchHubs);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch hubs'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all dispatch orders from the API.
   */
  private loadDispatchOrders = (): void => {
    this.loadingSignal.set(true);
    this.dispatchesApi.getDispatchOrders().pipe(takeUntilDestroyed()).subscribe({
      next: dispatchOrders => {
        this.dispatchOrdersSignal.set(dispatchOrders);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load dispatch orders'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/infrastructure/dispatches-api.ts`
- `src/app/dispatches/application/dispatches.store.ts`

```text
feat(dispatches): add dispatches api and store
```

Luego haz clic en **Commit and Push**.

---

## Commit 16: language switcher

💡 **Por qué:** es el mismo componente de learning-center. Va en `components/` porque no tiene ruta propia.

```bash
ng g c shared/presentation/components/language-switcher --skip-tests
```
Reemplaza el contenido de los 3 archivos generados:

**`src/app/shared/presentation/components/language-switcher/language-switcher.ts`**
```ts
import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * Switches the active locale used by the translation service.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggleModule,
    TranslatePipe
  ],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  /**
   * The currently selected language code.
   */
  protected currentLang = 'en';

  /**
   * List of available language codes.
   */
  protected languages: string[];

  /**
   * Translation service instance.
   */
  private translate: TranslateService;

  /**
   * Creates an instance of LanguageSwitcher.
   * Initializes the current language from the translation service.
   */
  constructor() {
    this.translate = inject(TranslateService);
    this.currentLang = this.translate.getCurrentLang() ?? 'en';
    this.languages = [...this.translate.getLangs()];
  }

  /**
   * Changes the application's current language.
   * Updates both the translation service and the component's local state.
   *
   * @param language - The language code to switch to (e.g., 'en', 'es')
   */
  useLanguage = (language: string) => {
    this.translate.use(language);
    this.currentLang = language;
  };
}
```

**`src/app/shared/presentation/components/language-switcher/language-switcher.html`**
```html
<mat-button-toggle-group [value]="currentLang"
                         appearance="standard"
                         [attr.aria-label]="'app.language' | translate"
                         hideSingleSelectionIndicator
                         name="language">

  @for (language of languages; track language) {
    <mat-button-toggle [value]="language"
                       [aria-label]="language"
                       (click)="useLanguage(language)">
      {{ language.toUpperCase() }}
    </mat-button-toggle>
  }
</mat-button-toggle-group>
```

**`src/app/shared/presentation/components/language-switcher/language-switcher.css`**
```css
mat-button-toggle-group {
  --mat-button-toggle-height: 32px;
  background-color: #ffffff;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/presentation/components/language-switcher/language-switcher.ts`
- `src/app/shared/presentation/components/language-switcher/language-switcher.html`
- `src/app/shared/presentation/components/language-switcher/language-switcher.css`

```text
feat(shared): add language switcher component
```

Luego haz clic en **Commit and Push**.

---

## Commit 17: footer

💡 **Por qué:** el enunciado exige un footer con información institucional de BrewDog, copyright y el estado operativo de la red de distribución.

```bash
ng g c shared/presentation/components/footer-content --skip-tests
```

**`src/app/shared/presentation/components/footer-content/footer-content.ts`**
```ts
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays BrewDog institutional information, copyright and distribution network status.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-footer-content',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css'
})
export class FooterContent {

}
```

**`src/app/shared/presentation/components/footer-content/footer-content.html`**
```html
<footer class="footer-content">
  <p>{{ 'footer.about' | translate }}</p>
  <p class="status" role="status">
    <mat-icon class="status-icon" aria-hidden="true">check_circle</mat-icon>
    {{ 'footer.network-status' | translate }} <strong>{{ 'footer.operational' | translate }}</strong>
  </p>
  <p class="rights">{{ 'footer.rights' | translate }}</p>
</footer>
```

**`src/app/shared/presentation/components/footer-content/footer-content.css`**
```css
.footer-content {
  padding: 16px;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  font-size: 0.85rem;
}

.footer-content p {
  margin: 4px 0;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.status-icon {
  color: #22c55e;
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.rights {
  color: #bdbdbd;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/presentation/components/footer-content/footer-content.ts`
- `src/app/shared/presentation/components/footer-content/footer-content.html`
- `src/app/shared/presentation/components/footer-content/footer-content.css`

```text
feat(shared): add footer content component
```

Luego haz clic en **Commit and Push**.

---

## Commit 18: layout (toolbar + sidenav + footer)

💡 **Por qué:**
- **Toolbar:** a la izquierda el logo (Logo.dev con `brewdog.com`) y el texto.
- **Sidenav:** arriba los enlaces Home y New Dispatch Order (`options = signal([...])`, como en learning-center); **abajo** el EN/ES, como pide el enunciado. Lo logra el `flex` con `justify-content: space-between`.
- `routerLinkActive` resalta la opción activa y `aria-current` la anuncia a los lectores de pantalla.

```bash
ng g c shared/presentation/components/layout --skip-tests
```

**`src/app/shared/presentation/components/layout/layout.ts`**
```ts
import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';
import {environment} from '../../../../../environments/environment';

/**
 * Main shell component that hosts the toolbar, sidenav navigation, routed content and footer.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  /**
   * URL of the institutional logo provided by the Logo.dev Logo API.
   */
  protected readonly logoUrl =
    `${environment.logoProviderApiBaseUrl}${environment.institutionDomain}?token=${environment.logoProviderPublishableKey}`;

  /**
   * Array of navigation options for the application's sidenav.
   */
  options = signal([
    {link: '/home', label: 'option.home', icon: 'home'},
    {link: '/dispatch/orders/new', label: 'option.new-dispatch-order', icon: 'local_shipping'}
  ]);
}
```

**`src/app/shared/presentation/components/layout/layout.html`**
```html
<mat-toolbar class="toolbar">
  <mat-toolbar-row>
    <button mat-icon-button type="button" (click)="drawer.toggle()"
            [attr.aria-label]="'app.toggle-menu' | translate"
            [attr.aria-expanded]="drawer.opened" aria-controls="app-sidenav">
      <mat-icon aria-hidden="true">menu</mat-icon>
    </button>
    <img class="logo" [src]="logoUrl" [alt]="'app.logo-alt' | translate" width="36" height="36">
    <h1 class="title">BrewDog Dispatch Logistics Platform</h1>
  </mat-toolbar-row>
</mat-toolbar>

<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer id="app-sidenav" class="sidenav" mode="side" opened>
    <div class="sidenav-content">
      <nav [attr.aria-label]="'app.navigation' | translate">
        <mat-nav-list>
          @for (option of options(); track option.label) {
            <a mat-list-item [routerLink]="option.link" routerLinkActive="active"
               #link="routerLinkActive" [activated]="link.isActive"
               [attr.aria-current]="link.isActive ? 'page' : null">
              <mat-icon matListItemIcon aria-hidden="true">{{ option.icon }}</mat-icon>
              <span matListItemTitle>{{ option.label | translate }}</span>
            </a>
          }
        </mat-nav-list>
      </nav>
      <div class="language">
        <app-language-switcher/>
      </div>
    </div>
  </mat-sidenav>
  <mat-sidenav-content class="main-content">
    <main>
      <router-outlet/>
    </main>
    <app-footer-content/>
  </mat-sidenav-content>
</mat-sidenav-container>
```

**`src/app/shared/presentation/components/layout/layout.css`**
```css
:host {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.toolbar mat-toolbar-row {
  gap: 12px;
}

.toolbar .mat-mdc-icon-button {
  --mat-icon-button-icon-color: #ffffff;
}

.logo {
  border-radius: 4px;
  background-color: #ffffff;
}

.title {
  margin: 0;
  color: #ffffff;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidenav-container {
  flex: 1;
}

.sidenav {
  width: 240px;
  border-right: 1px solid #e0e0e0;
}

.sidenav-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.language {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

@media (max-width: 599px) {
  .sidenav {
    width: 72px;
  }

  .sidenav [matListItemTitle], .title {
    display: none;
  }

  .language {
    padding: 8px 4px;
  }
}
```

Ahora sí, actualiza la raíz de la app:

**`src/app/app.html`**
```html
<app-layout/>
```

**`src/app/app.ts`**
```ts
import {Component, inject, signal} from '@angular/core';
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
  /**
   * Signal for the application title.
   */
  protected readonly title = signal('ea7742u20241g152');

  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Creates an instance of App and sets up translation with English as default.
   */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
```

La app todavía muestra el contenido vacío, porque aún no hay rutas. Lo normal es ver el toolbar, el sidenav y el footer.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/presentation/components/layout/layout.ts`
- `src/app/shared/presentation/components/layout/layout.html`
- `src/app/shared/presentation/components/layout/layout.css`
- `src/app/app.html`
- `src/app/app.ts`

```text
feat(shared): add layout with toolbar, sidenav and footer
```

Luego haz clic en **Commit and Push**.

---

## Commit 19: página 404 y rutas raíz

💡 **Por qué:** `**` atrapa cualquier ruta que no exista. La vista lee la ruta inválida desde `ActivatedRoute`, igual que en learning-center.

```bash
ng g c shared/presentation/views/page-not-found --skip-tests
```

**`src/app/shared/presentation/views/page-not-found/page-not-found.ts`**
```ts
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays fallback content for unsupported routes.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit {
  /**
   * The invalid path that led to this page.
   */
  protected invalidPath = '';

  /**
   * Activated route instance.
   */
  private route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * Router instance.
   */
  private router: Router = inject(Router);

  /**
   * Initializes the component and sets the invalid path from the route.
   */
  ngOnInit() {
    this.invalidPath = this.route.snapshot.url.map(url => url.path).join('/');
  }

  /**
   * Navigates to the home view.
   */
  protected navigateToHome() {
    this.router.navigate(['home']).then();
  }
}
```

**`src/app/shared/presentation/views/page-not-found/page-not-found.html`**
```html
<div class="container-with-spacing" role="alert">
  <h1>{{ 'page-not-found.title' | translate }}</h1>
  <div [innerHTML]="'page-not-found.content' | translate: { invalid_path: invalidPath }"></div>
</div>
<button mat-flat-button class="container-with-spacing" (click)="navigateToHome()">
  {{ 'page-not-found.go-home' | translate }}
</button>
```

Deja `page-not-found.css` vacío. Por ahora `app.routes.ts` solo tiene la redirección y la 404, porque Home todavía no existe:

```ts
import {Routes} from '@angular/router';

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'BrewDog Dispatch Logistics Platform';

/**
 * Root route configuration that composes bounded-context routes.
 *
 * @author Alexis Calin Torres Huaman
 */
export const routes: Routes = [
  { path: '',   redirectTo:    '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];
```

**Prueba:** http://localhost:4200/abc debe mostrar "Page not found" con la ruta `/abc`.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/shared/presentation/views/page-not-found/page-not-found.ts`
- `src/app/shared/presentation/views/page-not-found/page-not-found.html`
- `src/app/shared/presentation/views/page-not-found/page-not-found.css`
- `src/app/app.routes.ts`

```text
feat(shared): add page not found view and root routes
```

Luego haz clic en **Commit and Push**.

---

## Commit 20: tarjeta Dispatch Hub Summary

💡 **Por qué:**
- Es un componente **de presentación**: recibe el summary con `input.required()` y no llama a la API.
- **header:** el nombre del hub. **content:** las órdenes, o "Empty". **footer:** los dos indicadores.
- Usa `DatePipe` (que el examen exige) y `DecimalPipe`, ambos con el idioma activo.
- El modelo se importa con un **alias** (`DispatchHubSummaryModel`), porque el componente se llama igual.

```bash
ng g c dispatches/presentation/components/dispatch-hub-summary --skip-tests
```

**`src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.ts`**
```ts
import {Component, inject, input} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {DispatchHubSummary as DispatchHubSummaryModel} from '../../../domain/model/dispatch-hub-summary';

/**
 * Card that presents the dispatch orders and tonnage indicators of one dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-hub-summary',
  imports: [MatCardModule, MatListModule, MatIconModule, DatePipe, DecimalPipe, TranslatePipe],
  templateUrl: './dispatch-hub-summary.html',
  styleUrl: './dispatch-hub-summary.css'
})
export class DispatchHubSummary {
  /**
   * Translation service instance.
   */
  private translate = inject(TranslateService);

  /**
   * Summary displayed by the card.
   */
  readonly summary = input.required<DispatchHubSummaryModel>();

  /**
   * Active language, used to localize dates and numbers.
   */
  protected readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(event => event.lang)),
    {initialValue: this.translate.getCurrentLang() ?? 'en'});
}
```

**`src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.html`**
```html
@let hub = summary().dispatchHub;
<mat-card class="summary-card" appearance="outlined"
          role="region" [attr.aria-labelledby]="'dispatch-hub-' + hub.id + '-name'">
  <mat-card-header>
    <mat-icon mat-card-avatar class="avatar" aria-hidden="true">warehouse</mat-icon>
    <mat-card-title [id]="'dispatch-hub-' + hub.id + '-name'">{{ hub.name }}</mat-card-title>
    <mat-card-subtitle>
      {{ ('brewery-types.' + hub.breweryType) | translate }} ·
      {{ 'dispatch-hub-summary.max-tonnage' | translate: { tonnage: (hub.maxTonnage | number: '1.0-2' : currentLang()) } }}
    </mat-card-subtitle>
  </mat-card-header>

  <mat-card-content class="content">
    @if (summary().isEmpty) {
      <p class="empty" role="status">{{ 'dispatch-hub-summary.empty' | translate }}</p>
    } @else {
      <mat-list [attr.aria-label]="'dispatch-hub-summary.orders' | translate: { name: hub.name }">
        @for (order of summary().orders; track order.id) {
          <mat-list-item>
            <span matListItemTitle>{{ order.breweryName }}</span>
            <span matListItemLine class="dispatched-at">
              {{ 'dispatch-hub-summary.dispatched-at' | translate: { date: (order.dispatchedAt | date: 'medium' : undefined : currentLang()) } }}
            </span>
            <span matListItemMeta class="tonnage">
              {{ 'dispatch-hub-summary.tonnage-value' | translate: { tonnage: (order.assignedTonnage | number: '1.0-2' : currentLang()) } }}
            </span>
          </mat-list-item>
        }
      </mat-list>
    }
  </mat-card-content>

  <mat-card-footer class="footer">
    <div class="indicator">
      <span class="indicator-value">{{ summary().totalDispatchedTonnage | number: '1.0-2' : currentLang() }} t</span>
      <span class="indicator-label">{{ 'dispatch-hub-summary.total-dispatched-tonnage' | translate }}</span>
    </div>
    <div class="indicator" [class.warning]="summary().availableTonnageCapacity <= 0">
      <span class="indicator-value">{{ summary().availableTonnageCapacity | number: '1.0-2' : currentLang() }} t</span>
      <span class="indicator-label">{{ 'dispatch-hub-summary.available-tonnage-capacity' | translate }}</span>
    </div>
  </mat-card-footer>
</mat-card>
```

**`src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.css`**
```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}

.summary-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #000000;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  color: var(--mat-sys-on-surface-variant);
  font-style: italic;
}

.dispatched-at {
  font-size: 0.8rem;
}

.tonnage {
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
}

.footer {
  display: flex;
  border-top: 1px solid #e0e0e0;
}

.indicator {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  text-align: center;
}

.indicator-value {
  font-family: Oswald, "Arial Narrow", sans-serif;
  font-size: 1.4rem;
  color: #00838f;
}

.indicator.warning .indicator-value {
  color: #b3261e;
}

.indicator-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.ts`
- `src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.html`
- `src/app/dispatches/presentation/components/dispatch-hub-summary/dispatch-hub-summary.css`

```text
feat(dispatches): add dispatch hub summary card component
```

Luego haz clic en **Commit and Push**.

---

## Commit 21: Home con la grilla "My Dispatch Hubs"

💡 **Por qué:**
- **`dispatch-hub-summary-list`** es la grilla (`mat-grid-list`) con una tarjeta por hub. Va en `components/` de `dispatches` porque no tiene ruta.
- **`home`** sí tiene ruta (`/home`), así que va en `views/`. Está en `shared` igual que la Home de learning-center, y solo compone el título, el texto y la grilla.
- `BreakpointObserver` muestra 2 columnas en desktop y 1 en móvil (responsive).

```bash
ng g c dispatches/presentation/components/dispatch-hub-summary-list --skip-tests
ng g c shared/presentation/views/home --skip-tests
```

**`src/app/dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list.ts`**
```ts
import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatError} from '@angular/material/form-field';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchesStore} from '../../../application/dispatches.store';
import {DispatchHubSummary} from '../dispatch-hub-summary/dispatch-hub-summary';

/**
 * Grid list with one dispatch hub summary card per dispatch hub.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-hub-summary-list',
  imports: [MatGridListModule, MatProgressBarModule, MatError, TranslatePipe, DispatchHubSummary],
  templateUrl: './dispatch-hub-summary-list.html',
  styleUrl: './dispatch-hub-summary-list.css'
})
export class DispatchHubSummaryList {
  /**
   * Dispatches store instance.
   */
  readonly store = inject(DispatchesStore);

  /**
   * Breakpoint observer used for the responsive grid.
   */
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * True on extra small screens.
   */
  private readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.XSmall).pipe(map(result => result.matches)),
    {initialValue: false});

  /**
   * Number of grid columns: two summaries per row, one on small screens.
   */
  protected readonly columns = computed(() => this.isHandset() ? 1 : 2);
}
```

**`src/app/dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list.html`**
```html
@if (store.loading()) {
  <mat-progress-bar mode="indeterminate" [attr.aria-label]="'home.loading' | translate"/>
}
@if (store.error()) {
  <mat-error role="alert">{{ store.error() }}</mat-error>
} @else if (!store.loading() && store.dispatchHubSummaries().length === 0) {
  <p role="status">{{ 'home.no-dispatch-hubs' | translate }}</p>
}

<mat-grid-list [cols]="columns()" rowHeight="380px" gutterSize="16px"
               [attr.aria-label]="'home.my-dispatch-hubs' | translate">
  @for (summary of store.dispatchHubSummaries(); track summary.dispatchHub.id) {
    <mat-grid-tile>
      <app-dispatch-hub-summary [summary]="summary"/>
    </mat-grid-tile>
  }
</mat-grid-list>
```

Deja `dispatch-hub-summary-list.css` vacío.

**`src/app/shared/presentation/views/home/home.ts`**
```ts
import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchHubSummaryList} from '../../../../dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list';

/**
 * Home view with the platform introduction and the "My Dispatch Hubs" section.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, DispatchHubSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
```

**`src/app/shared/presentation/views/home/home.html`**
```html
<section class="container-with-spacing" aria-labelledby="home-title">
  <h1 id="home-title">{{ 'home.title' | translate }}</h1>
  <p class="lead">{{ 'home.content' | translate }}</p>

  <section aria-labelledby="my-dispatch-hubs-title">
    <h2 id="my-dispatch-hubs-title">{{ 'home.my-dispatch-hubs' | translate }}</h2>
    <app-dispatch-hub-summary-list/>
  </section>
</section>
```

**`src/app/shared/presentation/views/home/home.css`**
```css
.lead {
  font-size: 1.1rem;
  color: var(--mat-sys-on-surface-variant);
}
```

Agrega la ruta de Home en `app.routes.ts`:
```ts
import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'BrewDog Dispatch Logistics Platform';

/**
 * Root route configuration that composes bounded-context routes.
 *
 * @author Alexis Calin Torres Huaman
 */
export const routes: Routes = [
  { path: 'home', component:     Home,         title: `${baseTitle} - Home` },
  { path: '',     redirectTo:    '/home', pathMatch: 'full' },
  { path: '**',   loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];
```

**Prueba:** http://localhost:4200 debe redirigir a `/home` y mostrar 6 tarjetas. Micro: **390 t / 460 t**. Brewpub, Nano y Contract: **Empty**.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list.ts`
- `src/app/dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list.html`
- `src/app/dispatches/presentation/components/dispatch-hub-summary-list/dispatch-hub-summary-list.css`
- `src/app/shared/presentation/views/home/home.ts`
- `src/app/shared/presentation/views/home/home.html`
- `src/app/shared/presentation/views/home/home.css`
- `src/app/app.routes.ts`

```text
feat(shared): add home view with my dispatch hubs grid
```

Luego haz clic en **Commit and Push**.

---

## Commit 22: formulario New Dispatch Order y sus rutas

💡 **Por qué:**
- **Formulario reactivo:** `breweryType` → `breweryId` → `assignedTonnage`. `breweryId` empieza deshabilitado y se habilita al elegir un tipo.
- **Al cambiar el tipo** (`valueChanges`): se cargan las cervecerías de Open Brewery DB, se resetea la cervecería elegida y se busca el hub de ese tipo con `computed`.
- **`submit()`:** crea el `DispatchOrder` con `dispatchedAt: new Date()` e `id: 0` (no se envía), y **navega solo en el callback de éxito**.
- **Rutas:** `dispatches.routes.ts` define `orders/new` y `app.routes.ts` lo monta en `dispatch`, así la URL queda `/dispatch/orders/new` (child routes por bounded context).

```bash
ng g c dispatches/presentation/views/dispatch-order-form --skip-tests
```

Escribe el `.ts` completo **sin** el método `updateAssignedTonnageValidators()` y **sin** la llamada a ese método en el constructor; esos los agregas en el commit 23. En `submit()`, deja la condición sin `!summary.canDispatch(assignedTonnage)`.
Referencia del archivo final:

**`src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.ts`**
```ts
import {Component, computed, inject, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TranslatePipe} from '@ngx-translate/core';
import {DispatchesStore} from '../../../application/dispatches.store';
import {DispatchOrder} from '../../../domain/model/dispatch-order.entity';
import {BreweriesStore} from '../../../../breweries/application/breweries.store';
import {BREWERY_TYPES, BreweryType} from '../../../../breweries/domain/model/brewery-type';

/**
 * View with the reactive form used to register a new dispatch order.
 *
 * @author Alexis Calin Torres Huaman
 */
@Component({
  selector: 'app-dispatch-order-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    TranslatePipe
  ],
  templateUrl: './dispatch-order-form.html',
  styleUrl: './dispatch-order-form.css'
})
export class DispatchOrderForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dispatchesStore = inject(DispatchesStore);
  private breweriesStore = inject(BreweriesStore);

  /**
   * Form group for the dispatch order form.
   */
  form = this.fb.group({
    breweryType: new FormControl<BreweryType | null>(null, {validators: [Validators.required]}),
    breweryId: new FormControl<string | null>({value: null, disabled: true}, {validators: [Validators.required]}),
    assignedTonnage: new FormControl<number | null>(null, {validators: [Validators.required, Validators.min(0.01)]})
  });

  /**
   * Selectable brewery types.
   */
  protected readonly breweryTypes = BREWERY_TYPES;

  /**
   * Breweries of the selected brewery type.
   */
  protected readonly breweries = this.breweriesStore.breweries;

  /**
   * True while breweries are loading.
   */
  protected readonly loadingBreweries = this.breweriesStore.loading;

  /**
   * Error raised while loading breweries.
   */
  protected readonly breweriesError = this.breweriesStore.error;

  /**
   * True while the dispatch order is being saved.
   */
  protected readonly saving = signal(false);

  /**
   * True when saving the dispatch order failed.
   */
  protected readonly saveFailed = signal(false);

  /**
   * Selected brewery type as a signal.
   */
  private readonly selectedBreweryType = toSignal(this.form.controls.breweryType.valueChanges, {initialValue: null});

  /**
   * Summary of the dispatch hub assigned automatically from the selected brewery type.
   */
  protected readonly dispatchHubSummary = computed(() => {
    const breweryType = this.selectedBreweryType();
    return breweryType ? this.dispatchesStore.getDispatchHubSummaryByBreweryType(breweryType)() : undefined;
  });

  /**
   * Available tonnage capacity of the assigned dispatch hub at this moment.
   */
  protected readonly availableTonnageCapacity = computed(() => this.dispatchHubSummary()?.availableTonnageCapacity ?? null);

  /**
   * Creates an instance of DispatchOrderForm and reacts to brewery type changes.
   */
  constructor() {
    this.form.controls.breweryType.valueChanges.pipe(takeUntilDestroyed()).subscribe(breweryType => {
      this.form.controls.breweryId.reset({value: null, disabled: !breweryType});
      if (breweryType) this.breweriesStore.loadBreweriesByType(breweryType);
      this.updateAssignedTonnageValidators();
    });
  }

  /**
   * Submits the form to create the dispatch order and navigates home once it is persisted.
   */
  submit() {
    const summary = this.dispatchHubSummary();
    const brewery = this.breweriesStore.getBreweryById(this.form.controls.breweryId.value ?? '');
    const assignedTonnage = Number(this.form.controls.assignedTonnage.value);
    if (this.form.invalid || !summary || !brewery || !summary.canDispatch(assignedTonnage)) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.saveFailed.set(false);
    const dispatchOrder = new DispatchOrder({
      id: 0,
      dispatchHubId: summary.dispatchHub.id,
      breweryType: brewery.breweryType,
      breweryId: brewery.id,
      breweryName: brewery.name,
      assignedTonnage,
      dispatchedAt: new Date()
    });
    this.dispatchesStore.addDispatchOrder(dispatchOrder,
      () => this.navigateToHome(),
      () => {
        this.saving.set(false);
        this.saveFailed.set(true);
      });
  }

  /**
   * Discards the form and navigates home.
   */
  cancel() {
    this.navigateToHome();
  }

  /**
   * Replaces the assigned tonnage validators so the maximum follows the assigned hub capacity.
   */
  private updateAssignedTonnageValidators() {
    const assignedTonnage = this.form.controls.assignedTonnage;
    const capacity = this.availableTonnageCapacity();
    assignedTonnage.setValidators([
      Validators.required,
      Validators.min(0.01),
      ...(capacity !== null ? [Validators.max(capacity)] : [])
    ]);
    assignedTonnage.updateValueAndValidity();
  }

  /**
   * Navigates to the home view.
   */
  private navigateToHome() {
    this.router.navigate(['home']).then();
  }
}
```

**`src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.html`**
```html
<section class="container-with-spacing" aria-labelledby="dispatch-order-title">
  <h1 id="dispatch-order-title">{{ 'dispatch-order.title' | translate }}</h1>
  <p class="subtitle">{{ 'dispatch-order.subtitle' | translate }}</p>

  <mat-card appearance="outlined" class="form-card">
    <mat-card-content>
      <form [formGroup]="form" (ngSubmit)="submit()" [attr.aria-label]="'dispatch-order.form-label' | translate" novalidate>
        <mat-form-field>
          <mat-label>{{ 'dispatch-order.brewery-type' | translate }}</mat-label>
          <mat-select formControlName="breweryType" required>
            @for (breweryType of breweryTypes; track breweryType) {
              <mat-option [value]="breweryType">{{ ('brewery-types.' + breweryType) | translate }}</mat-option>
            }
          </mat-select>
          @if (dispatchHubSummary(); as summary) {
            <mat-hint>{{ 'dispatch-order.dispatch-hub' | translate: { name: summary.dispatchHub.name } }}</mat-hint>
          }
          @if (form.controls.breweryType.hasError('required')) {
            <mat-error>{{ 'dispatch-order.error.brewery-type-required' | translate }}</mat-error>
          }
        </mat-form-field>

        <mat-form-field>
          <mat-label>{{ 'dispatch-order.brewery' | translate }}</mat-label>
          <mat-select formControlName="breweryId" required [attr.aria-busy]="loadingBreweries()">
            @for (brewery of breweries(); track brewery.id) {
              <mat-option [value]="brewery.id">{{ brewery.name }}</mat-option>
            }
          </mat-select>
          @if (loadingBreweries()) {
            <mat-hint>{{ 'dispatch-order.loading-breweries' | translate }}</mat-hint>
          }
          @if (form.controls.breweryId.hasError('required')) {
            <mat-error>{{ 'dispatch-order.error.brewery-required' | translate }}</mat-error>
          }
        </mat-form-field>
        @if (loadingBreweries()) {
          <mat-progress-bar mode="indeterminate" [attr.aria-label]="'dispatch-order.loading-breweries' | translate"/>
        }
        @if (breweriesError()) {
          <p class="error" role="alert">{{ 'dispatch-order.error.breweries-unavailable' | translate }}</p>
        }

        @let assignedTonnage = form.controls.assignedTonnage;
        <mat-form-field>
          <mat-label>{{ 'dispatch-order.assigned-tonnage' | translate }}</mat-label>
          <input matInput type="number" formControlName="assignedTonnage" min="0" step="any" required
                 [attr.max]="availableTonnageCapacity()" inputmode="decimal">
          @if (availableTonnageCapacity() !== null) {
            <mat-hint>{{ 'dispatch-order.tonnage-hint' | translate: { capacity: availableTonnageCapacity() } }}</mat-hint>
          }
          @if (assignedTonnage.hasError('required')) {
            <mat-error>{{ 'dispatch-order.error.assigned-tonnage-required' | translate }}</mat-error>
          } @else if (assignedTonnage.hasError('min')) {
            <mat-error>{{ 'dispatch-order.error.assigned-tonnage-min' | translate }}</mat-error>
          } @else if (assignedTonnage.hasError('max')) {
            <mat-error>{{ 'dispatch-order.error.assigned-tonnage-max' | translate: { capacity: availableTonnageCapacity() } }}</mat-error>
          }
        </mat-form-field>

        @if (availableTonnageCapacity() !== null && availableTonnageCapacity()! <= 0) {
          <p class="error" role="alert">{{ 'dispatch-order.error.no-capacity' | translate }}</p>
        }
        @if (saveFailed()) {
          <p class="error" role="alert">{{ 'dispatch-order.error.save-failed' | translate }}</p>
        }

        <div class="actions">
          <button mat-stroked-button type="button" (click)="cancel()">
            {{ 'dispatch-order.cancel' | translate }}
          </button>
          <button mat-flat-button type="submit" [disabled]="form.invalid || saving()">
            {{ 'dispatch-order.create' | translate }}
          </button>
        </div>
      </form>
    </mat-card-content>
  </mat-card>
</section>
```

**`src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.css`**
```css
.subtitle {
  font-size: 1.1rem;
  color: var(--mat-sys-on-surface-variant);
}

.form-card {
  max-width: 640px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.error {
  color: #b3261e;
  margin: 0;
}
```

En el `.html` de este commit puedes omitir el `mat-error` de `max` y el aviso `no-capacity`; los agregas en el commit 23.

📁 Crea `src/app/dispatches/presentation/dispatches.routes.ts`:

**`src/app/dispatches/presentation/dispatches.routes.ts`**
```ts
import {Routes} from '@angular/router';

const dispatchOrderForm = () =>
  import('./views/dispatch-order-form/dispatch-order-form').then(m => m.DispatchOrderForm);

/**
 * Route tree for the dispatches bounded context.
 *
 * @author Alexis Calin Torres Huaman
 */
export const dispatchesRoutes: Routes = [
  {path: 'orders/new', loadComponent: dispatchOrderForm, title: 'BrewDog - New Dispatch Order'}
];
```

Y la versión final de `app.routes.ts`:

**`src/app/app.routes.ts`**
```ts
import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const dispatchesRoutes = () => import('./dispatches/presentation/dispatches.routes').then(m => m.dispatchesRoutes);
const baseTitle = 'BrewDog Dispatch Logistics Platform';

/**
 * Root route configuration that composes bounded-context routes.
 *
 * @author Alexis Calin Torres Huaman
 */
export const routes: Routes = [
  { path: 'home',     component:     Home,             title: `${baseTitle} - Home` },
  { path: 'dispatch', loadChildren:  dispatchesRoutes },
  { path: '',         redirectTo:    '/home', pathMatch: 'full' },
  { path: '**',       loadComponent: pageNotFound,     title: `${baseTitle} - Page Not Found` }
];
```

**Prueba:** crea una orden Micro de 100 t. Debes volver a Home y ver la nueva orden en la tarjeta Micro, con el total actualizado.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.ts`
- `src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.html`
- `src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.css`
- `src/app/dispatches/presentation/dispatches.routes.ts`
- `src/app/app.routes.ts`

```text
feat(dispatches): add new dispatch order form and routes
```

Luego haz clic en **Commit and Push**.

---

## Commit 23: validar el tonelaje contra la capacidad disponible

💡 **Por qué:** es la regla más importante: *"Solo se puede registrar una DispatchOrder cuando assignedTonnage es ≤ la capacidad disponible del hub en ese momento."*
- **Validación visual:** al cambiar el tipo, `setValidators` agrega `Validators.max(capacidad)`, con su `mat-error` y un `mat-hint` que dice cuánto queda.
- **Validación de negocio:** antes de guardar, `summary.canDispatch(t)`. Es la defensa en el dominio por si se salta la del formulario.
- **Aviso:** si la capacidad es 0, se muestra "no available tonnage capacity".

Agrega al `.ts` el método `updateAssignedTonnageValidators()` y su llamada en el constructor, y la condición `!summary.canDispatch(assignedTonnage)` en `submit()`. Usa como referencia el archivo final del commit 22.
En el `.html`, agrega el `mat-hint` de capacidad, el `mat-error` de `max` y el `<p class="error">` de `no-capacity`.

> ⚠️ Pon `@let assignedTonnage = form.controls.assignedTonnage;` **antes** del `<mat-form-field>`, no adentro. Si lo pones adentro, el `mat-hint` desaparece después de escribir.

**Prueba con Micro (disponible 460):**
- **0** → "must be greater than 0", y Create queda deshabilitado.
- **461** → "must not exceed 460 t", y Create queda deshabilitado.
- **460** → se crea; al volver, Micro queda en **0 t** disponibles.
- **Otra orden Micro** → aparece "This dispatch hub has no available tonnage capacity".

> Si después quieres repetir la prueba, restaura el `db.json` original del zip.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.ts`
- `src/app/dispatches/presentation/views/dispatch-order-form/dispatch-order-form.html`

```text
feat(dispatches): validate assigned tonnage against available capacity
```

Luego haz clic en **Commit and Push**.

---

## Commit 24: accesibilidad y responsive (revisión)

💡 **Por qué:** la rúbrica evalúa los atributos ARIA y el responsive (C02). Si escribiste el código tal como está arriba, casi todo ya está. Aprovecha este commit para **revisar** y completar lo que te falte:

- [ ] `aria-label` en el botón de menú, en el `nav`, en la grilla, en la lista de órdenes y en el formulario.
- [ ] `aria-expanded` y `aria-controls` en el botón de menú.
- [ ] `aria-current="page"` en el enlace activo.
- [ ] `role="alert"` en los errores y `role="status"` en "Empty" y en el estado del footer.
- [ ] `alt` traducido en el logo.
- [ ] `aria-hidden="true"` en los íconos decorativos.
- [ ] Móvil: 1 columna (`BreakpointObserver`) y el sidenav solo con íconos (`@media (max-width: 599px)` en `layout.css`).

**Prueba:** abre Chrome DevTools con F12 → ícono de celular → iPhone y revisa que todo se vea bien.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `(solo los archivos que hayas modificado)`

```text
style(ui): improve accessibility and responsive layout
```

Luego haz clic en **Commit and Push**.

---

## Commit 25: README final

💡 **Por qué:** el examen pide en el README la descripción, los features, el stack, la configuración y la sección Authorship.

Reemplaza `README.md` por:

**`README.md`**
````markdown
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
````

> Cambia la URL de *Repository* por la de tu repo del examen.

**✅ Verifica:** la terminal de `ng serve` no muestra errores en rojo.

**📌 Commit** (`Ctrl + K`): marca solo estos archivos:
- `README.md`

```text
docs(readme): add features, technologies and setup
```

Luego haz clic en **Commit and Push**.

---

## Verificación final (5 min)

- [ ] `ng build` termina sin errores.
- [ ] `/` redirige a `/home`.
- [ ] Hay 6 tarjetas, en 2 columnas.
- [ ] Los totales coinciden con la tabla de abajo.
- [ ] Una ruta inventada muestra la 404 con el botón **Back to Home**.
- [ ] EN/ES cambia todos los textos, incluidas las fechas.
- [ ] El formulario rechaza 0 y valores mayores que el disponible.
- [ ] Create y Cancel vuelven a `/home`.
- [ ] El footer aparece en todas las vistas.
- [ ] En GitHub → *Commits* se ven unos 25 commits, todos a tu nombre y dentro del horario.

| Hub | Max | Total | Disponible |
|---|---|---|---|
| Micro Dispatch Center | 850 | 390 | 460 |
| Regional Freight Hub | 3400 | 2050 | 1350 |
| Brewpub Logistics Terminal | 600 | 0 (Empty) | 600 |
| Nano Experimental Depot | 300 | 0 (Empty) | 300 |
| Main Industrial Port | 7500 | 2400 | 5100 |
| Contract Alliance Center | 1800 | 0 (Empty) | 1800 |

## Entrega

1. Detén `ng serve` y `json-server` con `Ctrl + C` y cierra WebStorm.
2. En el explorador de archivos, **borra `node_modules`** dentro del proyecto. Si existen, borra también `.angular` y `dist`.
3. Clic derecho en la carpeta `ea7742u20241g152` → **Comprimir en archivo ZIP**.
4. El archivo debe llamarse **`ea7742u20241g152.zip`**.
5. Ábrelo y comprueba que **no** tenga `node_modules`.
6. Súbelo en la Actividad del Examen Parcial del aula virtual.

