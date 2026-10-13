# Guía de práctica: parcial BrewDog (NRC 7742)

Proyecto **`ea7742u20241g152`**. Arquitectura basada **solo en learning-center**.
La solución de referencia está en `02-brewdog/ea7742u20241g152/`: compárala **al terminar**, no mientras programas.

> **Preparar la PC, cuenta de GitHub, crear la repo desde WebStorm, rutina de commits y entrega:**
> es igual que en `01-barnes-noble/GUIA-COMPLETA-WEBSTORM.md`, secciones 0 a 5, 8 y 9.
> Aquí solo va lo que cambia en este examen.

---

## 1. Qué pide el examen (resumen)

| Requisito | Detalle |
|---|---|
| Fake API | `/dispatch-hubs` (id, name, breweryType, maxTonnage) y `/dispatch-orders` (id, dispatchHubId, breweryType, breweryId, breweryName, assignedTonnage, dispatchedAt) |
| API externa | `https://api.openbrewerydb.org/v1/breweries?by_type={breweryType}`. Usa `id`, `name` y `brewery_type` |
| Tipos | `micro`, `nano`, `regional`, `brewpub`, `large`, `contract`. Hay **un hub por tipo** |
| Toolbar | Logo de Logo.dev con `brewdog.com` y el texto **"BrewDog Dispatch Logistics Platform"** |
| Sidenav | **Home** y **New Dispatch Order**; abajo, los botones **EN / ES** |
| Home (`/home`) | Título "Home", el texto "Advanced Dispatch Order and Tonnage Management for Logistics Hubs." y la sección **"My Dispatch Hubs"** |
| Tarjeta | **header:** nombre del hub · **content:** por orden, `breweryName` + `assignedTonnage`, o "Empty" · **footer:** Total Dispatched Tonnage y Available Tonnage Capacity |
| Indicadores | **Total** = suma de `assignedTonnage` · **Available** = `maxTonnage` − total |
| Formulario (`/dispatch/orders/new`) | Título "New Dispatch Order", subtítulo "Register Freight Dispatch Order to Your Hub", y los campos breweryType → brewery → assignedTonnage. Botones **Create** y **Cancel**; ambos vuelven a `/home` |
| Regla | `assignedTonnage` debe ser **menor o igual que la capacidad disponible** del hub en ese momento. `dispatchedAt` es automático y el `id` lo genera json-server |
| Footer | Información institucional de BrewDog, copyright y estado de la red de distribución |
| Rutas | `/` redirige a `/home`; la página 404 tiene un botón para volver a Home |
| Bounded contexts | **`shared`** (bases, layout, footer, home, 404) · **`dispatches`** (hubs y órdenes) · **`breweries`** (API externa) |

**Diferencias con Barnes & Noble:**
- El selector EN/ES va **abajo en el sidenav**, no en el toolbar.
- Hay un **Footer** obligatorio.
- La vista principal se llama **Home**, está en `shared/presentation/views/home` (como en learning-center) y usa un componente de `dispatches`.
- La validación es contra la **capacidad disponible**: `maxTonnage − total`.
- La API externa devuelve un **array plano**, con `brewery_type` en snake_case. El **assembler** lo traduce a `breweryType`.
- El `id` de la cervecería es un **string (UUID)**, no un número. Por eso `Brewery` **no** implementa `BaseEntity`.

---

## 2. Estructura final

```
ea7742u20241g152/
├── server/db.json                         ← el del zip del examen
├── public/i18n/en.json, es.json
├── src/
│   ├── environments/environment.ts, environment.development.ts
│   ├── material-theme.scss, styles.css, index.html
│   └── app/
│       ├── app.ts / app.html / app.config.ts / app.routes.ts
│       ├── shared/
│       │   ├── domain/model/base-entity.ts
│       │   ├── infrastructure/base-response.ts, base-assembler.ts, error-handling-enabled-base-type.ts,
│       │   │                  base-api-endpoint.ts, base-api.ts
│       │   └── presentation/
│       │       ├── components/language-switcher/, footer-content/, layout/
│       │       └── views/home/, page-not-found/
│       ├── breweries/
│       │   ├── domain/model/brewery-type.ts, brewery.entity.ts
│       │   ├── infrastructure/breweries-response.ts, brewery-assembler.ts, breweries-api-endpoint.ts, breweries-api.ts
│       │   └── application/breweries.store.ts
│       └── dispatches/
│           ├── domain/model/dispatch-hub.entity.ts, dispatch-order.entity.ts, dispatch-hub-summary.ts
│           ├── infrastructure/dispatch-hubs-response.ts, dispatch-hub-assembler.ts, dispatch-hubs-api-endpoint.ts,
│           │                  dispatch-orders-response.ts, dispatch-order-assembler.ts, dispatch-orders-api-endpoint.ts,
│           │                  dispatches-api.ts
│           ├── application/dispatches.store.ts
│           └── presentation/
│               ├── dispatches.routes.ts
│               ├── components/dispatch-hub-summary/, dispatch-hub-summary-list/
│               └── views/dispatch-order-form/
└── README.md
```

- **`views/`:** solo `home`, `page-not-found` y `dispatch-order-form`, porque tienen ruta.
- **`components/`:** `layout`, `language-switcher`, `footer-content`, `dispatch-hub-summary` (la tarjeta) y `dispatch-hub-summary-list` (la grilla).

---

## 3. Secuencia exacta: carpetas, archivos y commits

En cada commit: crea las carpetas, crea los archivos **en orden**, revisa que `ng serve` no tenga errores, presiona `Ctrl + K`, marca **solo** esos archivos y haz **Commit and Push**.
Rutas relativas a `src/app/`. Escribe el TSDoc (`@author Alexis Calin Torres Huaman`) mientras creas cada clase.

### Resumen

| # | Min | Mensaje |
|---|---|---|
| 1 | 0–8 | `chore: initialize angular 22.2.2 project with material and ngx-translate` |
| 2 | 8–11 | `chore(server): add json-server fake api data` |
| 3 | 11–15 | `docs(readme): add overview and authorship sections` |
| 4 | 15–20 | `build: configure environment variables for platform and external apis` |
| 5 | 20–25 | `style(theme): add material theme based on brewdog design` |
| 6 | 25–32 | `feat(i18n): add english and spanish translations with ngx-translate` |
| 7 | 32–36 | `feat(shared): add base entity domain contract` |
| 8 | 36–45 | `feat(shared): add base infrastructure for api endpoints and assemblers` |
| 9 | 45–50 | `feat(breweries): add brewery type and brewery entity` |
| 10 | 50–58 | `feat(breweries): integrate open brewery db api with assembler and endpoint` |
| 11 | 58–62 | `feat(breweries): add breweries store` |
| 12 | 62–68 | `feat(dispatches): add dispatch hub and dispatch order entities` |
| 13 | 68–74 | `feat(dispatches): add dispatch hub summary with tonnage indicators` |
| 14 | 74–82 | `feat(dispatches): add resources, assemblers and api endpoints` |
| 15 | 82–88 | `feat(dispatches): add dispatches api and store` |
| 16 | 88–92 | `feat(shared): add language switcher component` |
| 17 | 92–96 | `feat(shared): add footer content component` |
| 18 | 96–104 | `feat(shared): add layout with toolbar, sidenav and footer` |
| 19 | 104–109 | `feat(shared): add page not found view and root routes` |
| 20 | 109–117 | `feat(dispatches): add dispatch hub summary card component` |
| 21 | 117–124 | `feat(shared): add home view with my dispatch hubs grid` |
| 22 | 124–136 | `feat(dispatches): add new dispatch order form and routes` |
| 23 | 136–143 | `feat(dispatches): validate assigned tonnage against available capacity` |
| 24 | 143–152 | `style(ui): improve accessibility and responsive layout` |
| 25 | 152–160 | `docs(readme): add features, technologies and setup` |

Del minuto 160 al 170: verificación final, zip y entrega.

---

### Commits 1–3: proyecto, `server/db.json` y README
Igual que en la guía de Barnes & Noble (secciones 2 a 4). Copia el `db.json` del zip del examen a `server/`.

### Commit 4: environments
Ejecuta `ng g environments`. En los **2 archivos** pon:
```ts
platformProviderApiBaseUrl: 'http://localhost:3000',
platformProviderDispatchHubsEndpointPath: '/dispatch-hubs',
platformProviderDispatchOrdersEndpointPath: '/dispatch-orders',
breweriesProviderApiBaseUrl: 'https://api.openbrewerydb.org/v1',
breweriesProviderBreweriesEndpointPath: '/breweries',
breweriesProviderPageSize: 50,
logoProviderApiBaseUrl: 'https://img.logo.dev/',
logoProviderPublishableKey: 'TU_KEY_DE_LOGO_DEV',
institutionDomain: 'brewdog.com'
```
**Marca:** los 2 environments y `angular.json`.

### Commit 5: tema
- `src/material-theme.scss`: toolbar **negro** (`mat.toolbar-overrides((container-background-color: #000000, container-text-color: #ffffff))`) y `mat.theme` con `mat.$cyan-palette`. Agrégalo a `styles` en `angular.json`.
- `src/styles.css`: títulos en mayúsculas con la fuente *Oswald*, más `.container-with-spacing`.
- `src/index.html`: el título y las fuentes Oswald, Roboto y Material Icons.

**Marca:** esos 4 archivos.

### Commit 6: i18n
Crea `public/i18n/en.json` y `es.json` con claves en kebab-case: `app`, `option` (`home`, `new-dispatch-order`), `brewery-types`, `home`, `dispatch-hub-summary`, `dispatch-order` (con `error.*`), `footer` y `page-not-found`.
Luego actualiza `app.config.ts` (`provideHttpClient`, `provideTranslateService`, `registerLocaleData(localeEs)`) y `app.ts` (`addLangs` y `use('en')`).

**Marca:** los 2 json, `app.config.ts` y `app.ts`.

### Commit 7: shared, dominio
Crea `shared/domain/model/base-entity.ts` con `interface BaseEntity { id: number }`.

### Commit 8: shared, infraestructura
Crea en `shared/infrastructure/`, en este orden:
1. `base-response.ts`
2. `base-assembler.ts`
3. `error-handling-enabled-base-type.ts`
4. `base-api-endpoint.ts` (en `create` quita el `id` antes del POST)
5. `base-api.ts`

### Commit 9: breweries, dominio
1. `breweries/domain/model/brewery-type.ts`: `type BreweryType = 'micro' | 'nano' | 'regional' | 'brewpub' | 'large' | 'contract'` y `BREWERY_TYPES`
2. `breweries/domain/model/brewery.entity.ts`: `#id: string`, `#name` y `#breweryType`, con get y set

### Commit 10: breweries, infraestructura
Crea en `breweries/infrastructure/`:
1. `breweries-response.ts`: `BreweryResource { id: string; name: string; brewery_type: string }` y `type BreweriesResponse = BreweryResource[]`
2. `brewery-assembler.ts`: `toEntitiesFromResponse` y `toEntityFromResource`, que hace `breweryType: resource.brewery_type`
3. `breweries-api-endpoint.ts`: `extends ErrorHandlingEnabledBaseType`, con `getByType(type)`, que hace `GET` con `params: {by_type: type, per_page: 50}`
4. `breweries-api.ts`: `extends BaseApi`, con `new BreweriesApiEndpoint(this.http, new BreweryAssembler())`

### Commit 11: breweries, store
Crea `breweries/application/breweries.store.ts` con `breweries`, `loading`, `error`, `loadBreweriesByType(type)` y `getBreweryById(id)`.

### Commit 12: dispatches, entidades
Crea en `dispatches/domain/model/`:
1. `dispatch-hub.entity.ts`: `#id`, `#name`, `#breweryType` y `#maxTonnage`, con get y set
2. `dispatch-order.entity.ts`: `#id`, `#dispatchHubId`, `#breweryType`, `#breweryId: string`, `#breweryName`, `#assignedTonnage` y `#dispatchedAt: Date`, con get y set

### Commit 13: dispatches, summary (la lógica clave)
Crea `dispatches/domain/model/dispatch-hub-summary.ts` con `constructor(dispatchHub, dispatchOrders)`:
- `orders`: filtra las órdenes por `dispatchHubId === dispatchHub.id`
- `isEmpty`: `orders.length === 0`
- `totalDispatchedTonnage`: `orders.reduce((t, o) => t + o.assignedTonnage, 0)`
- `availableTonnageCapacity`: `dispatchHub.maxTonnage - totalDispatchedTonnage`
- `canDispatch(tonnage)`: `tonnage > 0 && tonnage <= availableTonnageCapacity`

### Commit 14: dispatches, infraestructura
Crea en `dispatches/infrastructure/`, en este orden:
1. `dispatch-hubs-response.ts`
2. `dispatch-hub-assembler.ts`
3. `dispatch-hubs-api-endpoint.ts`
4. `dispatch-orders-response.ts` (con `dispatchedAt: string`)
5. `dispatch-order-assembler.ts` (con `new Date(...)` y `toISOString()`)
6. `dispatch-orders-api-endpoint.ts`

Los endpoints usan `extends BaseApiEndpoint<...>`.

### Commit 15: dispatches, API y store
1. `dispatches/infrastructure/dispatches-api.ts`: `getDispatchHubs()`, `getDispatchOrders()` y `createDispatchOrder()`
2. `dispatches/application/dispatches.store.ts`:
   - `dispatchHubs`, `dispatchOrders`, `loading` y `error`
   - `dispatchHubSummaries = computed(() => dispatchHubs().map(h => new DispatchHubSummary(h, dispatchOrders())))`
   - `getDispatchHubSummaryByBreweryType(type)`
   - `addDispatchOrder(order, onCreated, onFailed)`

### Commit 16: language switcher
```bash
ng g c shared/presentation/components/language-switcher --skip-tests
```
Es el mismo componente que en learning-center.

### Commit 17: footer
```bash
ng g c shared/presentation/components/footer-content --skip-tests
```
Incluye tres textos traducidos: la información institucional de BrewDog, el estado de la red ("Distribution network status: Operational") y el copyright.

### Commit 18: layout
```bash
ng g c shared/presentation/components/layout --skip-tests
```
- **Toolbar:** botón de menú, `<img [src]="logoUrl">` y el título.
- **Sidenav:** un `mat-nav-list` con `@for (option of options())` y, **abajo**, `<app-language-switcher/>`. Usa un contenedor con `display: flex; flex-direction: column; justify-content: space-between`.
- **Contenido:** `<router-outlet/>` y, debajo, `<app-footer-content/>`.

Cambia `app.html` a `<app-layout/>` y agrega `Layout` a los imports de `app.ts`.

**Marca:** los 3 archivos de layout, `app.html` y `app.ts`.

### Commit 19: 404 y rutas raíz
```bash
ng g c shared/presentation/views/page-not-found --skip-tests
```
- **page-not-found:** muestra la ruta inválida y un botón **"Back to Home"**.
- **`app.routes.ts`:** por ahora, solo `''` (redirige a `/home`) y `**` (va a la 404).

### Commit 20: tarjeta Dispatch Hub Summary
```bash
ng g c dispatches/presentation/components/dispatch-hub-summary --skip-tests
```
- **`.ts`:** `summary = input.required<DispatchHubSummaryModel>()`. Importa el modelo con un alias, porque el componente tiene el mismo nombre.
- **`.html`:** `mat-card` con:
  - **header:** nombre del hub
  - **content:** `@if (summary().isEmpty)` "Empty"; si no, `@for` con `breweryName`, `assignedTonnage` y `dispatchedAt | date`
  - **footer:** los 2 indicadores

### Commit 21: Home con la grilla
```bash
ng g c dispatches/presentation/components/dispatch-hub-summary-list --skip-tests
ng g c shared/presentation/views/home --skip-tests
```
- **`dispatch-hub-summary-list`:** inyecta `DispatchesStore` y contiene `<mat-grid-list [cols]="2" rowHeight="380px">` con un `@for` que pone un `<app-dispatch-hub-summary>` en cada `mat-grid-tile`.
- **`home`:** un `h1` "Home", el texto, un `h2` "My Dispatch Hubs" y `<app-dispatch-hub-summary-list/>`.
- **`app.routes.ts`:** agrega `{ path: 'home', component: Home }`.

**Prueba:** `/` debe mostrar las 6 tarjetas.

### Commit 22: formulario y rutas
```bash
ng g c dispatches/presentation/views/dispatch-order-form --skip-tests
```
- **`.ts`:**
  - `form` con `breweryType`, `breweryId` (deshabilitado al inicio) y `assignedTonnage` (`required`)
  - `valueChanges` de `breweryType`: resetea `breweryId` y ejecuta `breweriesStore.loadBreweriesByType()`
  - `dispatchHubSummary = computed(...)`, buscado por el tipo seleccionado
  - `submit()`: crea `new DispatchOrder({... dispatchedAt: new Date()})` y llama a `addDispatchOrder(..., () => navegar a home)`
  - `cancel()`: navega a home
- **`.html`:** título, subtítulo, 2 `mat-select`, 1 input number y los botones **Cancel** y **Create**.
- **`dispatches/presentation/dispatches.routes.ts`:** `{ path: 'orders/new', loadComponent: dispatchOrderForm }`
- **`app.routes.ts`:** agrega `{ path: 'dispatch', loadChildren: dispatchesRoutes }`

**Prueba:** crea una orden y comprueba que la tarjeta se actualice.

### Commit 23: validación de capacidad
- `Validators.min(0.01)`.
- Al cambiar `breweryType`: `assignedTonnage.setValidators([..., Validators.max(summary.availableTonnageCapacity)])` y luego `updateValueAndValidity()`.
- En `submit()`: verifica también `summary.canDispatch(tonnage)`.
- En el HTML: un `mat-error` para required, min y max; un `mat-hint` "Available capacity: X t"; y un aviso cuando la capacidad sea 0.
- Pon `@let assignedTonnage = form.controls.assignedTonnage;` **antes** del `<mat-form-field>`, no adentro. Si lo pones adentro, el `mat-hint` desaparece después de escribir.

### Commit 24: accesibilidad y responsive
- `aria-label` en botones, `nav`, grilla y formulario.
- `role="alert"` en los errores y `role="status"` en "Empty".
- `BreakpointObserver`: 1 columna en móvil.
- En pantallas pequeñas, el sidenav solo con íconos.

### Commit 25: README final
Completa Features, Routes, Architecture Overview, Project Structure, Technologies, Installation, Starting the Fake API y Running the Application.

---

## 4. Datos para verificar tu solución (con el `db.json` del examen)

| Hub | maxTonnage | Total despachado | Disponible |
|---|---|---|---|
| BrewDog Micro Dispatch Center | 850 | 210 + 180 = **390** | **460** |
| BrewDog Regional Freight Hub | 3400 | 950 + 1100 = **2050** | **1350** |
| BrewDog Brewpub Logistics Terminal | 600 | 0 (**Empty**) | **600** |
| BrewDog Nano Experimental Depot | 300 | 0 (**Empty**) | **300** |
| BrewDog Main Industrial Port | 7500 | **2400** | **5100** |
| BrewDog Contract Alliance Center | 1800 | 0 (**Empty**) | **1800** |

**Pruebas del formulario con el tipo "micro":**
- 461 t → error "must not exceed 460".
- 460 t → se crea y luego el hub queda en **0** disponible.
- Otra orden micro → debe mostrar "This dispatch hub has no available tonnage capacity".

## 5. Errores típicos de este examen

| Error | Cómo evitarlo |
|---|---|
| Usar `brewery_type` en la entidad | Solo en el Resource; el Assembler lo convierte a `breweryType` |
| Hacer que `Brewery` implemente `BaseEntity` | Su `id` es un string (UUID); `BaseEntity` exige un número |
| Validar contra `maxTonnage` | Hay que validar contra lo **disponible**: `maxTonnage − total` |
| Poner EN/ES en el toolbar | El enunciado lo pide **abajo del sidenav** |
| Olvidar el footer | Es obligatorio, con info institucional, copyright y estado de la red |
| Navegar antes de que termine el POST | Navega en el callback de éxito |
| Pedir `dispatchedAt` o `id` en el formulario | `dispatchedAt` es `new Date()` y el `id` lo genera json-server |
