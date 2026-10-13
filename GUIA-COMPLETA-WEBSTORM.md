# Guía completa en WebStorm: de la cuenta de GitHub a la entrega del .zip

Parcial **Barnes & Noble**, Desarrollo de Aplicaciones Open Source.
Alumno: **Alexis Calin Torres Huaman**, código **u20241g152**, NRC **7742**, proyecto **`ea7742u20241g152`**.

> Arquitectura basada **solo en el proyecto learning-center** del profesor.
> Úsala para practicar. La solución de referencia está en `ea7742u20241g152/` de este repo: compárala **al final**, no mientras programas.
> En el examen solo se permite el completado del IDE. Nada de IA agéntica.

**Índice**
0. Preparar la PC (una sola vez)
1. Verificar tu cuenta de GitHub en WebStorm
2. Crear el proyecto Angular
3. Crear la repo privada desde WebStorm (primer commit)
4. Agregar al profesor y el README con Authorship
5. Cómo hacer commits en WebStorm (rutina)
6. Estructura de carpetas final
7. Secuencia exacta: carpetas, archivos y commits
8. Verificación final
9. Entrega: zip y aula virtual

---

## 0. Preparar la PC (una sola vez, antes del examen)

1. **Node.js v24 LTS** desde https://nodejs.org. Angular 22.2.2 no funciona con Node viejo.
2. **Git** desde https://git-scm.com, con las opciones por defecto.
3. Abre WebStorm y la terminal integrada (`Alt + F12`), y ejecuta:
   ```bash
   node -v                                   # v24.x
   npm install -g @angular/cli@22.2.2
   npm install -g json-server@0.17.4
   ng version                                # Angular CLI: 22.2.2
   git config --global user.name "Alexis Calin Torres Huaman"
   git config --global user.email "EL-CORREO-DE-TU-CUENTA-GITHUB"
   git config --global init.defaultBranch main
   ```
   - Si PowerShell dice "running scripts is disabled", ejecuta `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y vuelve a intentar.
4. Ve a **Settings** (`Ctrl + Alt + S`) → **Tools → AI Assistant**. Si lo tienes, deja solo el completado de código.

---

## 1. Verificar o cambiar tu cuenta de GitHub en WebStorm

1. En el navegador, abre github.com y mira el **avatar arriba a la derecha**. Tiene que ser tu cuenta. Si no lo es, cierra sesión y entra con la tuya.
2. En WebStorm ve a **Settings → Version Control → GitHub**.
   - **Si aparece tu cuenta:** selecciónala y elige **Set as Default**.
   - **Si aparece otra cuenta:** selecciónala y quítala con el botón **−**.
   - **Para agregar la tuya:** **+ → Log In via GitHub…**. Se abre el navegador; haz clic en **Authorize JetBrains**.
3. Comprueba la identidad de tus commits en la terminal:
   ```bash
   git config --global user.name    # Alexis Calin Torres Huaman
   git config --global user.email   # el de tu cuenta de GitHub
   ```
4. **Solo en Windows, si un push sale con otra cuenta:** ve a **Panel de control → Administrador de credenciales → Credenciales de Windows**, borra `git:https://github.com` y vuelve a hacer push.

---

## 2. Crear el proyecto Angular (5 min)

**Opción A: terminal (recomendada, porque controlas todas las opciones).**
En WebStorm usa **File → Close Project** y abre una terminal en tu carpeta de proyectos (por ejemplo `C:\Users\Alexis\WebstormProjects`):

```bash
ng new ea7742u20241g152 --style=css --ssr=false --skip-git
```

Responde así a las preguntas del asistente:

| Pregunta | Respuesta |
|---|---|
| Zoneless application? | **No** |
| AI tools? | **None** |

`--skip-git` evita el commit automático "initial commit", que no sigue Conventional Commits.

**Opción B: asistente de WebStorm.**
Ve a **File → New → Project → Angular CLI**:
- **Location:** `...\ea7742u20241g152`
- **Version:** `@angular/cli` 22.2.2
- **Additional parameters:** `--style=css --ssr=false --skip-git`

Luego abre el proyecto (**File → Open → carpeta `ea7742u20241g152`**) y, en la terminal de WebStorm, instala las librerías:
```bash
npm install @angular/material@22.2.2 @angular/cdk@22.2.2 @ngx-translate/core @ngx-translate/http-loader
npm install -D json-server@0.17.4
```

Prueba rápida: ejecuta `ng serve`, abre http://localhost:4200, comprueba que carga y deténlo con `Ctrl + C`.

---

## 3. Crear la repo privada desde WebStorm, con el primer commit (3 min)

1. Ve al **menú principal → Git → GitHub → Share Project on GitHub**. En la interfaz clásica está en **VCS → Share Project on → GitHub**.
2. Completa la ventana:
   - **Repository name:** `ea7742u20241g152`
   - ✅ **Private**
   - **Remote:** `origin`
   - **Share by:** revisa que sea **tu cuenta**
   - Haz clic en **Share**
3. Aparece **"Add Files For Initial Commit"**:
   - Revisa que **no** estén `node_modules`, `.angular` ni `dist`.
   - **Borra el mensaje "Initial commit"** y escribe:
     ```
     chore: initialize angular 22.2.2 project with material and ngx-translate
     ```
   - Haz clic en **Add**.
4. Abajo a la derecha sale "Successfully shared project on GitHub". Haz clic en el enlace y confirma que el dueño es **tu usuario** y que dice **Private**.

---

## 4. Agregar al profesor y el README con Authorship (5 min)

1. En GitHub, dentro de tu repo, ve a **Settings → Collaborators → Add people**, escribe el usuario que indique el profesor y haz clic en **Add**.
   - En un repo personal, GitHub solo da el rol *collaborator*. Si el profesor exige "Admin", pregúntale al inicio.
2. **Fake API:** en WebStorm haz clic derecho sobre la raíz del proyecto → **New → Directory** → `server`. Copia ahí el `db.json` del zip del examen.
3. **README:** reemplaza `README.md` por este contenido:
   ```markdown
   # Barnes & Noble Inventory Platform

   ## Overview
   Web application to monitor book availability across Barnes & Noble bookstores and register received books.

   ## Authorship
   - **Author:** Alexis Calin Torres Huaman
   - **Student code:** u20241g152
   - **Repository:** https://github.com/<tu-usuario>/ea7742u20241g152
   ```
4. Haz **dos commits separados** (cómo hacerlo está en la sección 5):
   - `chore(server): add json-server fake api data` (solo la carpeta `server`)
   - `docs(readme): add overview and authorship sections` (solo `README.md`)

---

## 5. Cómo hacer commits en WebStorm (la rutina que repites todo el examen)

1. Termina un paso **que compile**. Mira la terminal de `ng serve`: no debe haber errores en rojo.
2. Abre la ventana de commit con **`Ctrl + K`**. Ahí ves la lista de archivos cambiados.
3. **Marca solo los archivos de ese paso.** Si quieres separar en dos commits, desmarca lo que va en el siguiente.
4. Escribe el mensaje en inglés con el formato `tipo(contexto): descripción en minúscula`:

   | Tipo | Cuándo usarlo |
   |---|---|
   | `feat` | Funcionalidad nueva (entidades, stores, vistas) |
   | `fix` | Arreglar algo que estaba mal |
   | `build` / `chore` | Configuración, dependencias, datos |
   | `style` | CSS, diseño, formato |
   | `refactor` | Reorganizar código sin cambiar comportamiento |
   | `docs` | README, comentarios TSDoc |

   Para el contexto usa el bounded context: `shared`, `bookstores`, `inventory`, `catalog`, `i18n`, `readme`.
5. Haz clic en **Commit and Push…** (o **Commit**, y luego **`Ctrl + Shift + K`** para hacer push).
6. Para revisar tu historial abre **`Alt + 9`** (ventana Git) → pestaña **Log**. Debe verse una escalera de commits espaciados en el tiempo.

**Ritmo:** un commit cada **5 a 10 minutos**, unos 25 en total (la lista exacta está en la sección 7). Haz push al menos cada 2 o 3 commits.

**Atajos útiles**

| Atajo | Acción |
|---|---|
| `Ctrl + K` | Commit |
| `Ctrl + Shift + K` | Push |
| `Alt + 9` | Ventana Git (Log) |
| `Alt + F12` | Terminal (usa **+** para abrir otra pestaña) |
| `Alt + Insert` | Crear un archivo nuevo en la carpeta seleccionada |
| `Ctrl + Alt + L` | Formatear el archivo |
| `Ctrl + Alt + O` | Ordenar imports |

---

## 6. Estructura de carpetas final (lo que vas a construir)

```
ea7742u20241g152/
├── server/db.json
├── public/i18n/en.json, es.json
├── src/
│   ├── environments/environment.ts, environment.development.ts
│   ├── material-theme.scss
│   ├── styles.css
│   └── app/
│       ├── app.ts / app.html / app.config.ts / app.routes.ts
│       ├── shared/
│       │   ├── domain/model/base-entity.ts, specialty.ts
│       │   ├── infrastructure/base-response.ts, base-assembler.ts, base-api-endpoint.ts, base-api.ts, error-handling-enabled-base-type.ts
│       │   └── presentation/
│       │       ├── components/layout/, language-switcher/
│       │       └── views/page-not-found/
│       ├── inventory/
│       │   ├── domain/model/book-stock.entity.ts
│       │   ├── infrastructure/book-stocks-response.ts, book-stock-assembler.ts, book-stocks-api-endpoint.ts, inventory-api.ts
│       │   ├── application/inventory.store.ts
│       │   └── presentation/inventory.routes.ts, views/book-receipt-form/
│       ├── bookstores/
│       │   ├── domain/model/bookstore.entity.ts, book-inventory-item.ts, bookstore-summary.ts
│       │   ├── infrastructure/bookstores-response.ts, bookstore-assembler.ts, bookstores-api-endpoint.ts, bookstores-api.ts
│       │   ├── application/bookstores.store.ts
│       │   └── presentation/bookstores.routes.ts, views/bookstore-overview/, components/bookstore-summary/
│       └── catalog/
│           ├── domain/model/book.entity.ts
│           ├── infrastructure/books-response.ts, book-assembler.ts, books-api-endpoint.ts, catalog-api.ts
│           └── application/catalog.store.ts
└── README.md
```

**Reglas de la estructura**
- En `views/` van **solo** los componentes que tienen ruta: `bookstore-overview`, `book-receipt-form` y `page-not-found`.
- En `components/` van los que se incluyen dentro de otros: `bookstore-summary`, `layout` y `language-switcher`.
- Los nombres de archivo van en **kebab-case**. Las clases van en **PascalCase** y en inglés.

**Cómo crear los archivos en WebStorm**
- **Carpetas:** clic derecho → **New → Directory**. Puedes escribir la ruta completa, por ejemplo `bookstores/domain/model`.
- **Clases TS:** clic derecho → **New → TypeScript File** → `bookstore.entity`.
- **Componentes:** usa la terminal, que crea el .ts, .html y .css juntos:
  ```bash
  ng g c bookstores/presentation/views/bookstore-overview --skip-tests
  ng g c bookstores/presentation/components/bookstore-summary --skip-tests
  ng g c inventory/presentation/views/book-receipt-form --skip-tests
  ng g c shared/presentation/components/layout --skip-tests
  ng g c shared/presentation/components/language-switcher --skip-tests
  ng g c shared/presentation/views/page-not-found --skip-tests
  ```
  También puedes hacer clic derecho → **New → Angular Schematic… → component**.

---

## 7. Secuencia exacta: carpetas, archivos y commits (170 min)

Cada bloque es **un commit**. Haz siempre lo mismo:
1. Crea las carpetas.
2. Crea los archivos **en el orden indicado**. El orden importa: cada archivo usa a los anteriores.
3. Verifica que `ng serve` no muestre errores.
4. Presiona `Ctrl + K`, marca **solo** los archivos del bloque, escribe el mensaje y haz clic en **Commit and Push**.

Todas las rutas son relativas a `src/app/`, salvo que digan otra cosa.
**Escribe el TSDoc (`/** ... @author Alexis Calin Torres Huaman */`) mientras creas cada clase**; no lo dejes para el final.

### Resumen de los 25 commits

| # | Min | Mensaje |
|---|---|---|
| 1 | 0–8 | `chore: initialize angular 22.2.2 project with material and ngx-translate` |
| 2 | 8–11 | `chore(server): add json-server fake api data` |
| 3 | 11–15 | `docs(readme): add overview and authorship sections` |
| 4 | 15–20 | `build: configure environment variables for platform and external apis` |
| 5 | 20–25 | `style(theme): add material theme based on barnes and noble design` |
| 6 | 25–32 | `feat(i18n): add english and spanish translations with ngx-translate` |
| 7 | 32–36 | `feat(shared): add base entity and specialty domain model` |
| 8 | 36–45 | `feat(shared): add base infrastructure for api endpoints and assemblers` |
| 9 | 45–50 | `feat(inventory): add book stock entity and resources` |
| 10 | 50–56 | `feat(inventory): add book stock assembler and inventory api` |
| 11 | 56–61 | `feat(inventory): add inventory store with signals` |
| 12 | 61–71 | `feat(bookstores): add bookstore entity and inventory summary model` |
| 13 | 71–79 | `feat(bookstores): add bookstore assembler, api and store` |
| 14 | 79–85 | `feat(catalog): add book entity, resources and assembler` |
| 15 | 85–92 | `feat(catalog): add books api endpoint, catalog api and store` |
| 16 | 92–96 | `feat(shared): add language switcher component` |
| 17 | 96–104 | `feat(shared): add layout with toolbar and sidenav` |
| 18 | 104–109 | `feat(shared): add page not found view and root routes` |
| 19 | 109–117 | `feat(bookstores): add bookstore summary card component` |
| 20 | 117–124 | `feat(bookstores): add bookstore overview view and routes` |
| 21 | 124–136 | `feat(inventory): add receive books reactive form and routes` |
| 22 | 136–143 | `feat(inventory): validate copies against bookstore minimum copies` |
| 23 | 143–152 | `style(ui): improve accessibility and responsive layout` |
| 24 | 152–158 | `docs: complete tsdoc comments` |
| 25 | 158–165 | `docs(readme): add features, technologies and setup` |

Los últimos 5 minutos son para empaquetar y entregar (sección 9).

---

### Commits 1, 2 y 3: proyecto, servidor y README
Ya los hiciste en las secciones 3 y 4.

---

### Commit 4: environments

**Carpeta:** `src/environments/`. Créala con `ng g environments`, que además registra los `fileReplacements` en `angular.json`.

**Archivos:**
1. `src/environments/environment.ts`, con `production: true`
2. `src/environments/environment.development.ts`, con `production: false`

Ambos con el mismo contenido:
```ts
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderBookstoresEndpointPath: '/bookstores',
  platformProviderBookStocksEndpointPath: '/book-stocks',
  catalogProviderApiBaseUrl: 'https://openlibrary.org',
  catalogProviderSubjectsEndpointPath: '/subjects',
  catalogProviderSubjectsLimit: 50,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'TU_KEY_DE_LOGO_DEV',
  institutionDomain: 'barnesandnoble.com'
};
```

**Marca en el commit:** los 2 environments y `angular.json`.
`build: configure environment variables for platform and external apis`

---

### Commit 5: tema de Material

**Archivos:**
1. `src/material-theme.scss`: `@use '@angular/material' as mat;`, `mat.theme(...)` con `mat.$green-palette` y `mat.toolbar-overrides` con el verde `#2a5934`.
2. En `angular.json` → `styles`, agrega `"src/material-theme.scss"` **antes** de `"src/styles.css"`.
3. `src/styles.css`: estilos de `html` y `body`, más la clase `.container-with-spacing { margin: 16px; }` del learning-center.
4. `src/index.html`: cambia el `<title>` y agrega las fuentes Roboto y Material Icons.

**Marca:** `material-theme.scss`, `styles.css`, `index.html` y `angular.json`.
`style(theme): add material theme based on barnes and noble design`

---

### Commit 6: i18n

**Carpeta:** `public/i18n/`

**Archivos:**
1. `public/i18n/en.json`, con todas las claves en kebab-case:
   - `app`: `logo-alt`, `toggle-menu`, `language`, `navigation`
   - `option`: `bookstore-overview`, `receive-books`
   - `specialties`: `fantasy`, `science-fiction`, `history`, `mystery`, `romance`, `science`
   - `bookstore-overview`: `title`, `content`, `store-inventory`
   - `bookstore-summary`: `empty`, `available-titles`, `replenishment-required`, `last-received`
   - `book-receipt`: `title`, `subtitle`, `specialty`, `book`, `copies`, `receive`, `cancel`, y `error.*`
   - `page-not-found`: `title`, `content`, `go-back`
2. `public/i18n/es.json`: las mismas claves, traducidas al español.
3. `app.config.ts`: agrega `provideHttpClient()`, `provideTranslateService({ loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}), fallbackLang: 'en' })` y `registerLocaleData(localeEs)`.
4. `app.ts`: inyecta `TranslateService`, y en el constructor ejecuta `addLangs(['en','es'])` y `use('en')`.

**Marca:** los 2 json, `app.config.ts` y `app.ts`.
`feat(i18n): add english and spanish translations with ngx-translate`

---

### Commit 7: shared, dominio

**Carpeta:** `shared/domain/model/`

**Archivos:**
1. `base-entity.ts`: `export interface BaseEntity { id: number; }`
2. `specialty.ts`:
   - `export type Specialty = 'fantasy' | 'science_fiction' | 'history' | 'mystery' | 'romance' | 'science';`
   - `SPECIALTIES` con los 6 valores
   - `specialtyTranslationKey(s)`, que devuelve `` `specialties.${s.replaceAll('_','-')}` ``

**Marca:** los 2 archivos.
`feat(shared): add base entity and specialty domain model`

---

### Commit 8: shared, infraestructura

**Carpeta:** `shared/infrastructure/`

**Archivos, en este orden:**
1. `base-response.ts`: `BaseResponse` (vacía) y `BaseResource { id: number }`
2. `base-assembler.ts`: `interface BaseAssembler<TEntity, TResource, TResponse>` con `toEntityFromResource`, `toResourceFromEntity` y `toEntitiesFromResponse`
3. `error-handling-enabled-base-type.ts`: clase abstracta con `handleError(operation)`, que distingue 404, `ErrorEvent` y otros errores
4. `base-api-endpoint.ts`: clase abstracta con `constructor(http, endpointUrl, assembler)`, `getAll`, `getById`, `create`, `update`, `delete` y `handleError`. En `create` quita el id: `const {id, ...resource} = ...`
5. `base-api.ts`: `export abstract class BaseApi {}`

**Marca:** los 5 archivos.
`feat(shared): add base infrastructure for api endpoints and assemblers`

---

### Commit 9: inventory, entidad y resources

**Carpetas:** `inventory/domain/model/` e `inventory/infrastructure/`

**Archivos:**
1. `inventory/domain/model/book-stock.entity.ts`:
   - campos privados `#id`, `#bookstoreId`, `#bookKey`, `#bookTitle`, `#authorName`, `#copies` y `#receivedAt: Date`
   - constructor con un objeto
   - get y set para cada campo
2. `inventory/infrastructure/book-stocks-response.ts`: `BookStockResource extends BaseResource` (con `receivedAt: string`) y `BookStocksResponse { bookStocks: BookStockResource[] }`

**Marca:** los 2 archivos.
`feat(inventory): add book stock entity and resources`

---

### Commit 10: inventory, assembler y API

**Archivos (en `inventory/infrastructure/`):**
1. `book-stock-assembler.ts`: `implements BaseAssembler<...>`; usa `new Date(resource.receivedAt)` y `entity.receivedAt.toISOString()`
2. `book-stocks-api-endpoint.ts`: `extends BaseApiEndpoint<...>`, con `super(http, url del environment, new BookStockAssembler())`
3. `inventory-api.ts`: `@Injectable({providedIn:'root'})`, `extends BaseApi`, con `getBookStocks()` y `createBookStock()`

**Marca:** los 3 archivos.
`feat(inventory): add book stock assembler and inventory api`

---

### Commit 11: inventory, store

**Carpeta:** `inventory/application/`

**Archivo:** `inventory.store.ts`
- `bookStocksSignal`, `loadingSignal` y `errorSignal`, cada uno con su versión `asReadonly()`
- `loadBookStocks()` en el constructor, con `takeUntilDestroyed()`
- `addBookStock(bookStock, onCreated, onFailed)`, que actualiza el signal y llama a `onCreated` en el `next`
- `formatError()`

**Marca:** `inventory.store.ts`.
`feat(inventory): add inventory store with signals`

---

### Commit 12: bookstores, dominio (la lógica más importante)

**Carpeta:** `bookstores/domain/model/`

**Archivos:**
1. `bookstore.entity.ts`:
   - `#id`, `#name`, `#specialty` y `#minimumCopies`, con get y set
   - `get maximumReceivableCopies()`, que devuelve `minimumCopies * 2`
   - `canReceive(copies)`: entero, mayor que 0 y menor o igual al máximo
   - `requiresReplenishment(totalCopies)`, que devuelve `totalCopies < minimumCopies`
2. `book-inventory-item.ts`: una clase con `bookKey`, `bookTitle`, `totalCopies` y `lastReceivedAt`
3. `bookstore-summary.ts`: `constructor(bookstore, bookStocks)`
   - filtra los stocks donde `bookstoreId === bookstore.id`
   - los agrupa con un `Map` por `bookKey`, sumando copies, y guarda el resultado en `items`
   - `isEmpty`, que devuelve `items.length === 0`
   - `availableTitles`, que devuelve `items.length`
   - `replenishmentRequired`, que cuenta los items donde `bookstore.requiresReplenishment(item.totalCopies)`

**Marca:** los 3 archivos.
`feat(bookstores): add bookstore entity and inventory summary model`

---

### Commit 13: bookstores, infraestructura y store

**Carpetas:** `bookstores/infrastructure/` y `bookstores/application/`

**Archivos:**
1. `infrastructure/bookstores-response.ts`: `BookstoreResource` y `BookstoresResponse`
2. `infrastructure/bookstore-assembler.ts`
3. `infrastructure/bookstores-api-endpoint.ts`
4. `infrastructure/bookstores-api.ts`, con `getBookstores()`
5. `application/bookstores.store.ts`:
   - `bookstores`, `loading` y `error`
   - `summaries = computed(() => bookstores().map(b => new BookstoreSummary(b, inventoryStore.bookStocks())))`
   - `getBookstoreBySpecialty(specialty)`

**Marca:** los 5 archivos.
`feat(bookstores): add bookstore assembler, api and store`

---

### Commit 14: catalog, entidad, resources y assembler

**Carpetas:** `catalog/domain/model/` y `catalog/infrastructure/`

**Archivos:**
1. `domain/model/book.entity.ts`: `#key`, `#title` y `#authorName`, con get y set. Si no viene autor, `authorName` vale `'Unknown Author'`.
2. `infrastructure/books-response.ts`: `AuthorResource { name }`, `BookResource { key, title, authors? }` y `BooksResponse { works }`
3. `infrastructure/book-assembler.ts`: clase normal, con `toEntitiesFromResponse` y `toEntityFromResource`, que usa `authors?.[0]?.name`

**Marca:** los 3 archivos.
`feat(catalog): add book entity, resources and assembler`

---

### Commit 15: catalog, endpoint, API y store

**Carpeta:** `catalog/application/`

**Archivos:**
1. `infrastructure/books-api-endpoint.ts`: `extends ErrorHandlingEnabledBaseType`; `getBySpecialty(specialty)` hace `GET {base}/subjects/{specialty}.json` con `params: {limit: 50}` y `catchError(this.handleError(...))`
2. `infrastructure/catalog-api.ts`: `extends BaseApi`, con `booksEndpoint = new BooksApiEndpoint(this.http, new BookAssembler())`
3. `application/catalog.store.ts`: `books`, `loading`, `error`, `loadBooksBySpecialty(specialty)` y `getBookByKey(key)`

**Marca:** los 3 archivos.
`feat(catalog): add books api endpoint, catalog api and store`

---

### Commit 16: language switcher

**Terminal:**
```bash
ng g c shared/presentation/components/language-switcher --skip-tests
```

**Archivos generados:** `.ts`, `.html` y `.css`.
- **`.ts`:** `currentLang`, `languages`, la inyección de `TranslateService` y `useLanguage(lang)`.
- **`.html`:** un `mat-button-toggle-group` con `@for` sobre los idiomas, mostrando `EN` y `ES`.

**Marca:** los 3 archivos.
`feat(shared): add language switcher component`

---

### Commit 17: layout (toolbar + sidenav)

**Terminal:**
```bash
ng g c shared/presentation/components/layout --skip-tests
```

**Archivos:**
1. **`layout.ts`:**
   - `logoUrl`, armado con el `environment`
   - `options = signal([{link:'/bookstores/overview', label:'option.bookstore-overview'}, {link:'/inventory/receipts/new', label:'option.receive-books'}])`
2. **`layout.html`:**
   - `mat-toolbar` con: botón de menú, `<img [src]="logoUrl">`, el texto "Barnes & Noble Inventory Platform", un spacer y `<app-language-switcher/>`
   - `mat-sidenav-container` → `mat-sidenav` con un `mat-nav-list` y un `@for` sobre `options()`
   - `mat-sidenav-content` → `<router-outlet/>`
3. **`layout.css`**
4. **`app.html`:** reemplaza todo por `<app-layout/>`
5. **`app.ts`:** agrega `Layout` a `imports`

**Marca:** los 3 de layout, más `app.html` y `app.ts`.
`feat(shared): add layout with toolbar and sidenav`

---

### Commit 18: page not found y rutas raíz

**Terminal:**
```bash
ng g c shared/presentation/views/page-not-found --skip-tests
```

**Archivos:**
1. **`page-not-found.ts`:** `invalidPath`, calculado en `ngOnInit` desde `route.snapshot.url`, y `navigateToBookstoreOverview()`
2. **`page-not-found.html`:** el título, el texto con la ruta y el botón para volver
3. **`app.routes.ts`:** por ahora solo estas rutas (las de los contextos se agregan en los commits 20 y 21):
   ```ts
   const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
   export const routes: Routes = [
     { path: '', redirectTo: '/bookstores/overview', pathMatch: 'full' },
     { path: '**', loadComponent: pageNotFound }
   ];
   ```

**Marca:** los 3 de page-not-found y `app.routes.ts`.
`feat(shared): add page not found view and root routes`

---

### Commit 19: tarjeta Bookstore Summary

**Terminal:**
```bash
ng g c bookstores/presentation/components/bookstore-summary --skip-tests
```

**Archivos:**
1. **`.ts`:** `summary = input.required<BookstoreSummary>()`. Importa el modelo con un alias, porque el componente se llama igual: `import {BookstoreSummary as BookstoreSummaryModel} ...`
2. **`.html`:** un `mat-card` con:
   - `mat-card-header` con el `name`
   - `mat-card-content` con `@if (summary().isEmpty)` "Empty"; si no, un `@for` con el título y `totalCopies`, y `| date`
   - `mat-card-footer` con los 2 indicadores
3. **`.css`**

**Marca:** los 3 archivos.
`feat(bookstores): add bookstore summary card component`

---

### Commit 20: vista Bookstore Overview y sus rutas

**Terminal:**
```bash
ng g c bookstores/presentation/views/bookstore-overview --skip-tests
```

**Archivos:**
1. **`bookstore-overview.ts`:** inyecta `BookstoresStore` y expone `summaries`
2. **`bookstore-overview.html`:**
   - `h1` "Bookstore Overview", un `p` con el texto y un `h2` "Store Inventory"
   - `mat-grid-list [cols]="2" rowHeight="400px"`, con un `@for` que pone `<mat-grid-tile><app-bookstore-summary [summary]="summary"/></mat-grid-tile>`
3. **`bookstore-overview.css`**
4. **`bookstores/presentation/bookstores.routes.ts`:**
   ```ts
   export const bookstoresRoutes: Routes = [
     { path: 'overview', loadComponent: bookstoreOverview },
     { path: '', redirectTo: 'overview', pathMatch: 'full' }
   ];
   ```
5. **`app.routes.ts`:** agrega `{ path: 'bookstores', loadChildren: bookstoresRoutes }`

**Prueba:** `/` debe mostrar las tarjetas con datos.

**Marca:** los 3 de la vista, `bookstores.routes.ts` y `app.routes.ts`.
`feat(bookstores): add bookstore overview view and routes`

---

### Commit 21: formulario Receive Books y sus rutas

**Terminal:**
```bash
ng g c inventory/presentation/views/book-receipt-form --skip-tests
```

**Archivos:**
1. **`book-receipt-form.ts`:**
   - `form = this.fb.group({ specialty: new FormControl(...), bookKey: new FormControl(...), copies: new FormControl(...) })`
   - por ahora, solo validadores `required`
   - `valueChanges` de `specialty` → `catalogStore.loadBooksBySpecialty()`
   - `submit()` crea el `BookStock` con `receivedAt: new Date()` y llama a `addBookStock(..., () => navegar)`
   - `cancel()`
2. **`book-receipt-form.html`:**
   - `h1` y subtítulo
   - 2 `mat-select` y 1 input number
   - botones Cancel y Receive
3. **`book-receipt-form.css`**
4. **`inventory/presentation/inventory.routes.ts`:** `{ path: 'receipts/new', loadComponent: bookReceiptForm }`
5. **`app.routes.ts`:** agrega `{ path: 'inventory', loadChildren: inventoryRoutes }`

**Prueba:** registra un libro y comprueba que la tarjeta cambie al volver.

**Marca:** los 3 de la vista, `inventory.routes.ts` y `app.routes.ts`.
`feat(inventory): add receive books reactive form and routes`

---

### Commit 22: validación de copies

**Archivos:** `book-receipt-form.ts` y `.html`
- **validadores:** `Validators.min(1)` y `Validators.pattern(/^\d+$/)`
- **al cambiar specialty:** `copies.setValidators([... , Validators.max(bookstore.maximumReceivableCopies)])` y luego `updateValueAndValidity()`
- **en `submit()`:** verifica también `bookstore.canReceive(copies)`
- **en el HTML:** un `mat-error` traducido para cada error (required, pattern, min, max) y un `mat-hint` que diga "Between 1 and X copies"

**Marca:** los 2 archivos.
`feat(inventory): validate copies against bookstore minimum copies`

---

### Commit 23: accesibilidad y responsive

**Archivos:** los `.html` y `.css` que toques
- **ARIA:** `aria-label` en los botones de icono, el `nav`, el grid y el form; `role="alert"` en los errores; `aria-current` en el enlace activo
- **Responsive:** `BreakpointObserver` en el Overview, con `columns = computed(() => isHandset() ? 1 : 2)`
- **Prueba:** que se vea bien en móvil (en Chrome: F12 → ícono de celular)

**Marca:** solo los archivos modificados.
`style(ui): improve accessibility and responsive layout`

---

### Commit 24: TSDoc

Revisa que **cada** clase, interfaz y método público tenga su comentario:
```ts
/**
 * Represents a Barnes & Noble bookstore.
 *
 * @author Alexis Calin Torres Huaman
 */
```

**Marca:** los archivos que completaste.
`docs: complete tsdoc comments`

---

### Commit 25: README final

Completa las secciones Features, Routes, Architecture Overview, Project Structure, Technologies, Installation, Starting the Fake API y Running the Application.

**Marca:** `README.md`.
`docs(readme): add features, technologies and setup`

Luego pasa a las secciones 8 y 9.

---

## 8. Verificación final (5 min, antes de empaquetar)

- [ ] `ng build` termina sin errores.
- [ ] `/` redirige a `/bookstores/overview`.
- [ ] Una ruta inventada muestra la página 404 con la ruta y el botón para volver.
- [ ] EN/ES traduce todo, incluidas las especialidades.
- [ ] Al registrar un stock, vuelves al Overview y los números se actualizan.
- [ ] Copies rechaza 0, decimales y valores mayores que el doble de minimumCopies.
- [ ] El README tiene título, Overview, **Authorship con la URL**, Features, Technologies y Setup.
- [ ] En GitHub (pestaña *Commits*) se ven ~25 commits **con horas dentro del examen**, todos a tu nombre.
- [ ] Último commit y **push** hechos.

---

## 9. Entrega: el .zip

1. **Detén** `ng serve` y `json-server` con `Ctrl + C` en cada terminal.
2. En WebStorm haz clic derecho en el proyecto → **Open In → Explorer**.
3. Cierra WebStorm, para que no bloquee archivos.
4. Dentro de la carpeta `ea7742u20241g152`, **borra `node_modules`**. Si existen, borra también `.angular` y `dist`.
5. Sube un nivel. Haz clic derecho sobre la carpeta `ea7742u20241g152` → **Comprimir en archivo ZIP**. En Windows 10 es **Enviar a → Carpeta comprimida (en zip)**.
6. Revisa que el archivo se llame exactamente **`ea7742u20241g152.zip`**. Solo .zip: no .rar ni .7z.
7. Ábrelo y comprueba que adentro esté la carpeta del proyecto con `src`, `server`, `package.json` y `README.md`, y que **no** esté `node_modules`.
8. Súbelo en la **Actividad del Examen Parcial** del aula virtual y espera la confirmación de envío.

---

## Problemas comunes

| Problema | Solución |
|---|---|
| `The Angular CLI requires a minimum Node.js version` | Instala Node 24 LTS y reinicia WebStorm |
| "Share Project on GitHub" no aparece | Settings → Plugins y verifica que **GitHub** esté habilitado |
| El push sale con otra cuenta | Sección 1, paso 4 (Administrador de credenciales) |
| `git push` rechazado con "fetch first" | Creaste el repo con README desde la web. Ejecuta `git pull origin main --allow-unrelated-histories` y luego push |
| `node_modules` aparece en el commit | Revisa que `.gitignore` tenga `/node_modules` |
| Te equivocaste en el mensaje del **último** commit, aún sin push | En la ventana de commit marca **Amend** y corrige el mensaje |
| Puerto 4200 ocupado | `ng serve --port 4300` |
| `json-server` no se reconoce | `npx json-server@0.17.4 --watch db.json` |
