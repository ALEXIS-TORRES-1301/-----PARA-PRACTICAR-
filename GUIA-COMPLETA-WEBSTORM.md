# Guía completa en WebStorm: de la cuenta de GitHub a la entrega del .zip

Parcial **Barnes & Noble**, Desarrollo de Aplicaciones Open Source.
Alumno: **Alexis Calin Torres Huaman**, código **u20241g152**, NRC **7742**, proyecto **`ea7742u20241g152`**.

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
7. Desarrollo por fases, con el commit de cada una
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

**Ritmo:** un commit cada **10 a 15 minutos**, unos 18 en total. Haz push al menos cada 2 o 3 commits.

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
│       │   ├── infrastructure/base-response.ts, base-assembler.ts, base-api-endpoint.ts, base-api.ts, logo-dev-api.ts
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
│           ├── infrastructure/subject-response.ts, book-assembler.ts, catalog-api.ts
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

## 7. Desarrollo por fases (170 min en total)

Cada fase termina con su commit. La tabla de tiempos va acumulada desde el inicio del examen.

| Tiempo | Fase | Commit(s) |
|---|---|---|
| 0–20 | Secciones 2, 3 y 4 | `chore: initialize...` · `chore(server): ...` · `docs(readme): ...` |
| 20–35 | **7.1** Configuración | `build: configure environments, material theme and i18n providers` · `feat(i18n): add english and spanish translation files` |
| 35–50 | **7.2** Shared base | `feat(shared): add base entity, assembler, api endpoint and logo api` |
| 50–62 | **7.3** Inventory | `feat(inventory): add book stock entity, assembler, api and store` |
| 62–80 | **7.4** Bookstores | `feat(bookstores): add bookstore entity and inventory summary model` · `feat(bookstores): add bookstore assembler, api and store` |
| 80–92 | **7.5** Catalog | `feat(catalog): integrate open library subjects api` |
| 92–110 | **7.6** Layout y rutas | `feat(shared): add layout with toolbar, sidenav and language switcher` · `feat(shared): add page not found view and application routes` |
| 110–128 | **7.7** Overview | `feat(bookstores): add bookstore summary card component` · `feat(bookstores): add bookstore overview view` |
| 128–150 | **7.8** Receive Books | `feat(inventory): add receive books reactive form` · `feat(inventory): validate copies against bookstore minimum copies` |
| 150–160 | **7.9** Pulido | `style(ui): improve accessibility and responsive layout` · `docs: add tsdoc comments` |
| 160–170 | **8 y 9** README final y entrega | `docs(readme): add features, technologies and setup` |

### 7.1 Configuración
- `src/environments/environment.ts` y `environment.development.ts`. Créalos con `ng g environments` o a mano. Deben contener:
  ```ts
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderBookstoresEndpointPath: '/bookstores',
  platformProviderBookStocksEndpointPath: '/book-stocks',
  catalogProviderApiBaseUrl: 'https://openlibrary.org',
  catalogProviderSubjectsEndpointPath: '/subjects',
  catalogProviderSubjectsLimit: 50,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: '<tu key de logo.dev>',
  institutionDomain: 'barnesandnoble.com'
  ```
- `src/material-theme.scss`: `@include mat.theme((color: (primary: mat.$green-palette)...))`. Agrégalo a `styles` en `angular.json`.
- `app.config.ts`:
  - `provideHttpClient()`
  - `provideTranslateService({loader: provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}), fallbackLang: 'en'})`
  - `registerLocaleData(localeEs)`
- `app.ts`: `translate.addLangs(['en','es'])` y `translate.use('en')`
- `public/i18n/en.json` y `es.json`, con claves en kebab-case.

### 7.2 Shared base
Copia de memoria el patrón del learning-center:
- `BaseEntity`, `BaseResource`, `BaseResponse`, `BaseAssembler`, `BaseApi`
- `BaseApiEndpoint`, con `getAll`, `create` (quitando el `id` antes del POST) y `handleError`
- `Specialty`: `'fantasy' | 'science_fiction' | 'history' | 'mystery' | 'romance' | 'science'`
- `LogoDevApi.getUrlToLogo(domain)`

### 7.3 Inventory
1. `BookStock`, con `receivedAt: Date`
2. `BookStockResource`, con `receivedAt: string`
3. `BookStockAssembler`
4. `BookStocksApiEndpoint`
5. `InventoryApi`
6. `InventoryStore`, con los signals `bookStocks`, `loading` y `error`, y `addBookStock(stock, onCreated, onFailed)`

### 7.4 Bookstores
- `Bookstore`, con `maximumReceivableCopies` (= minimumCopies × 2), `canReceive(copies)` y `requiresReplenishment(total)`.
- `BookstoreSummary`:
  - agrupa los stocks **por `bookKey`** sumando copies
  - `availableTitles` = cantidad de libros distintos
  - `replenishmentRequired` = cantidad de libros con total menor que `minimumCopies`
  - `isEmpty`
- `BookstoresStore`: `summaries = computed(...)` usando `InventoryStore.bookStocks()`, y `getBookstoreBySpecialty()`.

### 7.5 Catalog
- `Book`, con `'Unknown Author'` cuando no viene autor.
- `SubjectResponse`, `WorkResource` y `BookAssembler` (que usa `authors?.[0]?.name`).
- `CatalogApi`: `GET ${base}/subjects/${specialty}.json?limit=50`.
- `CatalogStore.loadBooksBySpecialty()`.

### 7.6 Layout y rutas
- **Toolbar:** botón de menú con `aria-label`, logo con `alt`, el texto "Barnes & Noble Inventory Platform", un spacer y EN/ES.
- **`mat-sidenav`:** dos enlaces, "Bookstore Overview" y "Receive Books".
- **Rutas:** `bookstores` → `overview`, `inventory` → `receipts/new`, `''` redirige a `/bookstores/overview` y `**` va a PageNotFound.
- **PageNotFound:** muestra la ruta inválida y un botón para volver al Overview.

### 7.7 Overview
- **`bookstore-summary`:**
  - header con el `name`
  - content con la lista de título y total de copies, o "Empty"
  - footer con los 2 indicadores
  - usa `| date`
- **`bookstore-overview`:** el título, el texto, "Store Inventory" y un `mat-grid-list cols="2"`.

### 7.8 Receive Books
- `h1` "Receive Books" y subtítulo "Register Books to Your Bookstore".
- Form reactivo con `specialty`, `bookKey` y `copies`.
- Al cambiar `specialty`:
  - carga los libros de esa especialidad
  - resetea el libro
  - actualiza `Validators.max(minimumCopies * 2)`
- **Receive:** crea el `BookStock` con `receivedAt: new Date()`; navega **solo cuando el POST responde OK**.
- **Cancel:** navega al Overview.

### 7.9 Pulido
- **ARIA:** `aria-label` y `role="alert"`.
- **Responsive:** `BreakpointObserver`, con 1 columna en móvil.
- **TSDoc** en cada clase:
  ```ts
  /**
   * Represents a Barnes & Noble bookstore.
   *
   * @author Alexis Calin Torres Huaman
   */
  ```

---

## 8. Verificación final (5 min, antes de empaquetar)

- [ ] `ng build` termina sin errores.
- [ ] `/` redirige a `/bookstores/overview`.
- [ ] Una ruta inventada muestra la página 404 con la ruta y el botón para volver.
- [ ] EN/ES traduce todo, incluidas las especialidades.
- [ ] Al registrar un stock, vuelves al Overview y los números se actualizan.
- [ ] Copies rechaza 0, decimales y valores mayores que el doble de minimumCopies.
- [ ] El README tiene título, Overview, **Authorship con la URL**, Features, Technologies y Setup.
- [ ] En GitHub (pestaña *Commits*) se ven ~18 commits **con horas dentro del examen**, todos a tu nombre.
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
