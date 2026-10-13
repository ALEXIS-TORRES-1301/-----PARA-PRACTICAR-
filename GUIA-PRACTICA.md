# Guía para resolver el parcial tú mismo (Barnes & Noble)

Tiempo total: **170 min**. Al lado de cada fase va el tiempo sugerido y el **commit** que haces al terminarla.
La solución de referencia está en `ea7742u20241g152/`. **No la abras mientras practicas**: úsala solo al final para comparar.

> Regla de oro del examen: **commits pequeños y frecuentes**, en inglés, con Conventional Commits,
> todos **dentro del horario**. Un solo commit gigante al final **invalida la entrega**.
> Apunta a unos 12 a 18 commits, más o menos uno cada 10 a 15 minutos.

---

## 0. Antes de empezar (5 min)

1. Verifica tu Node: `node -v`. Angular 22.2.2 pide **Node ≥ 22.22.3 o ≥ 24.15**.
2. Crea el repositorio **privado** en GitHub `ea7742u20241g152` y agrega al profesor como **Admin** (Settings → Collaborators).
3. Abre WebStorm. Solo está permitido el asistente de completado del IDE: nada de IA agéntica.

## 1. Crear el proyecto (10 min)

```bash
npx @angular/cli@22.2.2 new ea7742u20241g152 --style=css --ssr=false
cd ea7742u20241g152
npm install @angular/material@22.2.2 @angular/cdk@22.2.2 @ngx-translate/core @ngx-translate/http-loader
npm install -D json-server@0.17.4
```

Crea `server/` y copia ahí el `db.json` del zip del examen. Pruébalo así:
`cd server && npx json-server --watch db.json`, y abre `http://localhost:3000/bookstores`.

```bash
git remote add origin https://github.com/<tu-usuario>/ea7742u20241g152.git
git add . && git commit -m "chore: initialize angular project with material and ngx-translate"
git push -u origin main
```

Después agrega `server/db.json`:
```bash
git add server && git commit -m "chore(server): add json-server fake api data"
```

## 2. Configuración global (15 min)

| Archivo | Qué poner |
|---|---|
| `src/environments/environment.ts` y `environment.development.ts` | URLs base y paths: `http://localhost:3000`, `/bookstores`, `/book-stocks`, `https://openlibrary.org`, `/subjects`, limit `50`, Logo.dev URL + key, dominio `barnesandnoble.com` |
| `angular.json` | `fileReplacements` en `development`, y `styles` con `src/material-theme.scss` |
| `src/material-theme.scss` | `mat.theme` con `mat.$green-palette` (verde B&N) y `toolbar-overrides` |
| `src/app/app.config.ts` | `provideHttpClient()`, `provideTranslateService({ loader: provideTranslateHttpLoader({prefix:'./i18n/', suffix:'.json'}), fallbackLang:'en' })`, `provideRouter(routes)` y `registerLocaleData(localeEs)` |
| `src/app/app.ts` | `translate.addLangs(['en','es'])` y `translate.use('en')` |
| `public/i18n/en.json` y `es.json` | Claves en **kebab-case** (`bookstore-overview.title`, `book-receipt.copies`...) |

```bash
git commit -am "build: configure environments, material theme and i18n providers"
```
(Si creaste archivos nuevos, usa `git add .` antes de hacer el commit.)

## 3. Shared: las bases (15 min)

`src/app/shared/`
- `domain/model/base-entity.ts`: `interface BaseEntity { id: number }`
- `domain/model/specialty.ts`: `type Specialty = 'fantasy' | 'science_fiction' | ...` y la lista `SPECIALTIES`
- `infrastructure/base-response.ts`: `BaseResponse` y `BaseResource`
- `infrastructure/base-assembler.ts`: interfaz con `toEntityFromResource`, `toResourceFromEntity`, `toEntitiesFromResponse`
- `infrastructure/base-api-endpoint.ts`: clase abstracta con `getAll()`, `create()` y `handleError()`. Cópiala de memoria del learning-center.
- `infrastructure/base-api.ts`: clase abstracta vacía
- `infrastructure/logo-dev-api.ts`: `getUrlToLogo(domain)` devuelve `${baseUrl}${domain}?token=${key}`

**Detalle importante:** en `create()` quita el `id` antes del POST (`const {id, ...body} = resource`) para que json-server lo genere.

```bash
git add . && git commit -m "feat(shared): add base entity, assembler, api endpoint and logo api"
```

## 4. Inventory: dominio + infraestructura + store (15 min)

`src/app/inventory/`
- `domain/model/book-stock.entity.ts`: id, bookstoreId, bookKey, bookTitle, authorName, copies, receivedAt (`Date`)
- `infrastructure/book-stocks-response.ts`: `BookStockResource` (receivedAt como `string`) y `BookStocksResponse`
- `infrastructure/book-stock-assembler.ts`: hace `new Date(resource.receivedAt)` y `toISOString()`
- `infrastructure/book-stocks-api-endpoint.ts`: `extends BaseApiEndpoint<...>` con la URL tomada del environment
- `infrastructure/inventory-api.ts`: `getBookStocks()` y `createBookStock()`
- `application/inventory.store.ts`: signals `bookStocks`, `loading` y `error`; `addBookStock(stock, onCreated, onFailed)`

```bash
git add . && git commit -m "feat(inventory): add book stock entity, assembler, api and store"
```

## 5. Bookstores: dominio + infraestructura + store (20 min)

`src/app/bookstores/`
- `domain/model/bookstore.entity.ts`: id, name, specialty, minimumCopies, más estos métodos:
  - `get maximumReceivableCopies()` devuelve `minimumCopies * 2`
  - `canReceive(copies)`: entero, mayor que 0 y menor o igual al máximo
  - `requiresReplenishment(total)`: `total < minimumCopies`
- `domain/model/bookstore-summary.ts`: **aquí está la lógica clave**
  - Filtra los stocks del bookstore y **agrúpalos por `bookKey`** (usa un `Map`), sumando las copies.
  - `availableTitles` es la cantidad de libros distintos (`items.length`).
  - `replenishmentRequired` es la cantidad de libros cuyo total de copies es menor que `minimumCopies`.
  - `isEmpty` es `items.length === 0`.
- `infrastructure/`: `bookstores-response.ts`, `bookstore-assembler.ts`, `bookstores-api-endpoint.ts` y `bookstores-api.ts`
- `application/bookstores.store.ts`: inyecta `InventoryStore` y expone
  `summaries = computed(() => bookstores().map(b => new BookstoreSummary(b, inventoryStore.bookStocks())))`
  y `getBookstoreBySpecialty(specialty)`.

Haz dos commits:
```bash
git add src/app/bookstores/domain && git commit -m "feat(bookstores): add bookstore entity and inventory summary model"
git add . && git commit -m "feat(bookstores): add bookstore assembler, api and store"
```

## 6. Catalog: Open Library (15 min)

`src/app/catalog/`
- `domain/model/book.entity.ts`: key, title, authorName. Si no hay autor, usa `'Unknown Author'`.
- `infrastructure/subject-response.ts`: `SubjectResponse { works: WorkResource[] }` y `WorkResource { key, title, authors?: {name}[] }`
- `infrastructure/book-assembler.ts`: `authorName: resource.authors?.[0]?.name`
- `infrastructure/catalog-api.ts`: `GET ${base}/subjects/${specialty}.json` con `params: {limit: 50}`
- `application/catalog.store.ts`: `books`, `loading` y `loadBooksBySpecialty(specialty)`

> Los nombres de Open Library no siguen las convenciones de TypeScript (por ejemplo `first_publish_year`).
> Eso solo se tolera en el **Resource**. En la **entidad** usas nombres correctos, y el **Assembler** es el que traduce.

```bash
git add . && git commit -m "feat(catalog): integrate open library subjects api"
```

## 7. Layout: toolbar + sidenav + idioma + 404 (20 min)

`src/app/shared/presentation/`
- `components/language-switcher/`: `mat-button-toggle-group` con EN/ES y `translate.use(lang)`
- `components/layout/`:
  - `mat-toolbar` con botón de menú (`aria-label`), `<img [src]="logoUrl">`, el texto "Barnes & Noble Inventory Platform", un spacer y el selector de idioma a la derecha
  - `mat-sidenav-container` y `mat-nav-list` con "Bookstore Overview" y "Receive Books" (`routerLink`)
  - `<router-outlet/>` en el contenido
- `views/page-not-found/`: muestra la ruta con `route.snapshot.url` y un botón que lleva a `/bookstores/overview`

Rutas en `app.routes.ts`:
```ts
{ path: 'bookstores', loadChildren: bookstoresRoutes },   // children: 'overview'
{ path: 'inventory',  loadChildren: inventoryRoutes },    // children: 'receipts/new'
{ path: '', redirectTo: '/bookstores/overview', pathMatch: 'full' },
{ path: '**', loadComponent: pageNotFound }
```

Haz dos commits:
```bash
git add . && git commit -m "feat(shared): add layout with toolbar, sidenav and language switcher"
git add . && git commit -m "feat(shared): add page not found view and application routes"
```

## 8. Vista Bookstore Overview (20 min)

- `bookstores/presentation/components/bookstore-summary/`, que es la **tarjeta**:
  - **header:** `mat-card-title` con el `name`
  - **content:** con `@if (summary().isEmpty)` muestra "Empty"; si no, recorre los libros con título y total de copies
  - **footer:** Available Titles y Replenishment Required
  - Usa **`DatePipe`** en algún lugar, por ejemplo `item.lastReceivedAt | date:'mediumDate'`
- `bookstores/presentation/views/bookstore-overview/`:
  - un `h1` "Bookstore Overview", un `p` "Monitor Book Availability Across Our Stores" y un `h2` "Store Inventory"
  - `<mat-grid-list cols="2" rowHeight="400px">`, con un `<mat-grid-tile>` y un `<app-bookstore-summary>` por cada summary

Haz dos commits:
```bash
git add . && git commit -m "feat(bookstores): add bookstore summary card component"
git add . && git commit -m "feat(bookstores): add bookstore overview view with store inventory grid"
```

## 9. Vista Receive Books (25 min)

`inventory/presentation/views/book-receipt-form/`
- `h1` "Receive Books" y subtítulo "Register Books to Your Bookstore"
- Reactive form con tres campos: `specialty` (mat-select), `bookKey` (mat-select, deshabilitado mientras no haya specialty) y `copies` (input number)
- Al cambiar `specialty` (`valueChanges`):
  1. resetea `bookKey`
  2. ejecuta `catalogStore.loadBooksBySpecialty(specialty)`
  3. actualiza los validadores de `copies`: `required`, `min(1)`, `pattern(/^\d+$/)` y `max(bookstore.minimumCopies * 2)`
- **Receive:** arma el `BookStock` con `receivedAt: new Date()` y el `bookstoreId` del bookstore de esa specialty, llama a `addBookStock(...)` y **navega solo en el callback de éxito**
- **Cancel:** navega a `/bookstores/overview`
- Pon un `mat-error` traducido para cada error

Haz dos commits:
```bash
git add . && git commit -m "feat(inventory): add receive books reactive form"
git add . && git commit -m "feat(inventory): validate copies against bookstore minimum copies"
```

## 10. Pulido final (15 min)

- [ ] **ARIA:** `aria-label` en botones de icono, en el `nav`, el grid y el form; `role="alert"` en los errores
- [ ] **Responsive:** con `BreakpointObserver`, 1 columna en móvil
- [ ] **TSDoc:** cada clase con un comentario `/** resumen ... @author Alexis Calin Torres Huaman */`
- [ ] **ES:** todo traducido, incluidas las especialidades
- [ ] **`ng build`** sin errores

```bash
git commit -am "style(ui): improve accessibility and responsive layout"
git commit -am "docs: add tsdoc comments to classes"
```

## 11. README y entrega (10 min)

En el README van, en este orden: **título**, **Overview**, **Authorship** (nombre, código y URL del repo privado), Features, Technologies, Structure y Setup.

```bash
git commit -am "docs(readme): add overview, authorship, features and setup"
git push
```

Para el zip, **sin node_modules**:
```bash
cd ..
# Windows: borra la carpeta node_modules y comprime la carpeta con clic derecho → Comprimir
zip -r ea7742u20241g152.zip ea7742u20241g152 -x "ea7742u20241g152/node_modules/*"
```

---

## Errores típicos que restan puntos

| Error | Cómo evitarlo |
|---|---|
| Contar dos veces el mismo libro | Agrupar por `bookKey` antes de contar |
| Navegar antes de que termine el POST | Navegar dentro del `next` del subscribe (callback) |
| Pedir `receivedAt` o `id` en el form | El `id` lo genera json-server y `receivedAt` es `new Date()` |
| Escribir URLs a mano en los services | Todo va en `environment.ts` |
| Usar textos sin traducir | Todo pasa por `\| translate`, con claves en kebab-case |
| Poner componentes que no son de ruta en `views/` | Las tarjetas y el layout van en `components/` |
| Que la fecha en ES se rompa | `registerLocaleData(localeEs)` |
| Usar componentes NgModule | Todos deben ser standalone (es lo default en Angular 22) |

## Cómo practicar

1. **Primera vuelta:** sigue esta guía paso a paso, sin límite de tiempo.
2. **Segunda vuelta:** desde cero, con cronómetro de 170 min y mirando solo los títulos de esta guía.
3. **Al terminar cada vuelta:** compara tu código con `ea7742u20241g152/` y anota en qué te trabaste.
