# Paso 0: del repositorio vacío al proyecto Angular funcionando

Todo esto se hace en **tu computadora**, con WebStorm y la terminal. Calcula unos **20 minutos** el día del examen.

> **Para practicar**, ponle otro nombre al repo, por ejemplo `practica-barnes-noble`, y así no ocupas el nombre real.
> **El día del examen** el nombre debe ser exactamente `ea7742u20241g152`.

---

## A. Una sola vez, antes del examen (instalar herramientas)

### A1. Node.js
Angular 22.2.2 exige **Node 22.22.3 o superior, o 24.15 o superior**.
1. Descarga el **LTS (v24)** desde https://nodejs.org e instálalo.
2. Comprueba la versión:
   ```bash
   node -v      # v24.x.x
   npm -v
   ```

### A2. Git
1. Instálalo desde https://git-scm.com. En Windows deja las opciones por defecto, que incluyen *Git Credential Manager*.
2. Configura tu identidad. Así es como el profesor verá la autoría de tus commits:
   ```bash
   git config --global user.name "Alexis Calin Torres Huaman"
   git config --global user.email "tu-correo-de-github@..."
   git config --global init.defaultBranch main
   ```
   El correo debe ser el mismo de tu cuenta de GitHub, para que los commits aparezcan a tu nombre.

### A3. Angular CLI y json-server (globales)
```bash
npm install -g @angular/cli@22.2.2
npm install -g json-server@0.17.4
ng version            # debe decir Angular CLI: 22.2.2
json-server --version # 0.17.4
```

### A4. WebStorm
- Ve a Settings → Version Control → GitHub e inicia sesión con tu cuenta. Así puedes hacer push sin pelearte con contraseñas.
- Ve a Settings → Tools → AI Assistant. Si lo tienes, deja **solo el completado de código**: nada de chat ni de agentes.

---

## B. Día del examen: crear el repositorio en GitHub (3 min)

1. Entra a https://github.com/new.
2. Llena los datos así:
   - **Repository name:** `ea7742u20241g152`
   - **Visibility:** **Private**
   - **NO** marques *Add a README*, *.gitignore* ni *license*. Angular ya los crea, y si los marcas tendrás conflictos al hacer push.
3. Haz clic en **Create repository** y copia la URL: `https://github.com/<tu-usuario>/ea7742u20241g152.git`.
4. **Agrega al profesor:** Settings → Collaborators → **Add people** → escribe el usuario de GitHub que te dé el profesor → envía la invitación.
   - En un repo personal, GitHub solo permite invitarlo como *collaborator*; el rol "Admin" existe solo en repos de organizaciones.
   - Si el profesor exige "Admin" explícitamente, pregúntale al inicio. Si no dice nada, la invitación como collaborator es lo normal.
   - **Hazlo apenas crees el repo**, porque el examen pide que el profesor esté desde el inicio.

---

## C. Crear el proyecto Angular (5 min)

En la terminal, ve a la carpeta donde guardas tus proyectos (por ejemplo `cd C:\Users\Alexis\WebstormProjects`) y ejecuta:

```bash
ng new ea7742u20241g152 --style=css --ssr=false --skip-git
```

- `--skip-git` evita que Angular haga su propio commit `"initial commit"`, que **no** sigue Conventional Commits. El primer commit lo haces tú.

El asistente te hará algunas preguntas. Respóndelas así:

| Pregunta | Respuesta |
|---|---|
| Zoneless application? | **No**. El proyecto del profesor usa `provideZoneChangeDetection` y zone.js. |
| Which AI tools to configure? | **None**, porque no se permite IA. |

Luego entra al proyecto e instala las librerías:

```bash
cd ea7742u20241g152
npm install @angular/material@22.2.2 @angular/cdk@22.2.2
npm install @ngx-translate/core @ngx-translate/http-loader
```

Comprueba que arranca:
```bash
ng serve
```
Abre http://localhost:4200, verifica que se vea la página de bienvenida de Angular y cierra el servidor con `Ctrl + C`.

---

## D. Primer commit y conexión con GitHub (3 min)

```bash
git init
git add .
git commit -m "chore: initialize angular 22.2.2 project with material and ngx-translate"
git remote add origin https://github.com/<tu-usuario>/ea7742u20241g152.git
git push -u origin main
```

- Si te pide credenciales, se abrirá el navegador para que inicies sesión en GitHub.
- Refresca la página del repo en GitHub. Ya deberías ver tus archivos.

> Antes de cada commit revisa con `git status` que **node_modules no aparezca**. El `.gitignore` de Angular ya lo excluye.

---

## E. Fake API con el db.json del examen (3 min)

1. Descomprime el zip del examen (`upc-pre-202620-1asi0729-examen-parcial-...-files.zip`).
2. Crea la carpeta `server` en la raíz del proyecto, al mismo nivel que `src`, y copia ahí el `db.json`.
3. Pruébalo en una **segunda terminal**:
   ```bash
   cd server
   json-server --watch db.json
   ```
4. Abre http://localhost:3000/bookstores y http://localhost:3000/book-stocks. Deberías ver el JSON. Deja esta terminal abierta.
5. En la primera terminal, haz el commit:
   ```bash
   git add server
   git commit -m "chore(server): add json-server fake api data"
   git push
   ```

---

## F. README con Authorship desde el inicio (3 min)

El examen pide la URL del repo en el README, **después del título y del Overview**. Reemplaza el contenido de `README.md`:

```markdown
# Barnes & Noble Inventory Platform

## Overview
Web application to monitor book availability across Barnes & Noble bookstores and register received books.

## Authorship
- **Author:** Alexis Calin Torres Huaman
- **Student code:** u20241g152
- **Repository:** https://github.com/<tu-usuario>/ea7742u20241g152
```

```bash
git add README.md
git commit -m "docs(readme): add overview and authorship sections"
git push
```

Las secciones Features, Technologies y Setup las completas al final (fase 11 de la guía).

---

## G. Abrir en WebStorm y trabajar

1. Ve a **File → Open** y elige la carpeta `ea7742u20241g152`.
2. Ten dos terminales abiertas (`Alt + F12`; para abrir otra pestaña usa el botón **+**):
   - **Terminal 1:** `ng serve`
   - **Terminal 2:** `cd server && json-server --watch db.json`
3. Commits desde WebStorm: con **`Ctrl + K`** abres la ventana de commit, escribes el mensaje y haces clic en *Commit*. Con **`Ctrl + Shift + K`** haces push.
   Por terminal funciona igual: `git add .`, `git commit -m "..."` y `git push`.

A partir de aquí sigue con la **fase 2** de `GUIA-PRACTICA.md` (configuración: environments, tema e i18n).

---

## Resumen de commits hasta aquí

```
chore: initialize angular 22.2.2 project with material and ngx-translate
chore(server): add json-server fake api data
docs(readme): add overview and authorship sections
```

## Si algo falla

| Problema | Solución |
|---|---|
| `The Angular CLI requires a minimum Node.js version...` | Actualiza Node a v24 LTS (paso A1) |
| `ng` no se reconoce | Cierra y vuelve a abrir la terminal; si sigue, ejecuta `npm install -g @angular/cli@22.2.2` |
| En PowerShell sale "running scripts is disabled" | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `json-server` no se reconoce | Usa `npx json-server@0.17.4 --watch db.json` |
| `git push` rechazado con "fetch first" | Creaste el repo con README. Ejecuta `git pull origin main --allow-unrelated-histories` y luego `git push` |
| Puerto 3000 o 4200 ocupado | Cierra la otra terminal, o usa `ng serve --port 4300` |
