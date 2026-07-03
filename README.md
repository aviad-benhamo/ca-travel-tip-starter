
# TravelTip

TravelTip is a lightweight location bookmarking app that combines the Google Maps JavaScript API with vanilla ES modules, browser storage, and modern Web APIs. Click anywhere on the map to capture the exact geo information, enrich it with a friendly name and rating, and keep your favorite spots only a tap away.

## Highlights
- Location CRM for travelers: add, edit, delete, and browse saved places with distance calculations and relative timestamps.
- Interactive Google map with reverse geocoding, pan-to-search, and persistent markers per selection.
- Built-in filtering, sorting, and donut-style stats for at-a-glance insights.
- Web Share, Clipboard, and Geolocation API integrations for frictionless sharing and navigation.
- Color theme picker, debug panel, and responsive layout ready for desktop and mobile.

## Tech Stack
- Vanilla JavaScript modules (no build step)
- Google Maps JavaScript API + Geocoding endpoint
- Browser APIs: LocalStorage, Geolocation, Clipboard, Web Share
- HTML5 `<dialog>` for CRUD forms and modern CSS for layout/theme

## Project Structure
```
travel-tip-starter/
├── index.html               # Root document with map, filters, dialog, and script entrypoint
├── css/
│   ├── main.css             # Global styles and layout helpers
│   └── base, cmps           # Design tokens and component styles
├── js/
│   ├── app.controller.js    # UI glue code, DOM/render logic, query param sync
│   └── services/
│       ├── loc.service.js   # CRUD, filtering, sorting, stats, demo seed data
│       ├── map.service.js   # Google Maps init, markers, reverse geocoding, user clicks
│       ├── async-storage.service.js # LocalStorage-based async facade
│       └── util.service.js  # Helpers: ids, timers, colors, query params, haversine
├── img/                     # Placeholder for future assets
└── README.md
```

## Getting Started
1. **Use the recommended Node runtime** from `.nvmrc` (major `24`) or another compatible Node `>=20`.
2. **Install dependencies** (dotenv powers the env injection script):
  ```powershell
  npm install
  ```
  You can run `npm run check` at any time to validate the tracked JavaScript files and entrypoint asset references without a real API key.
3. **Create your env file** from the template and set the Google Maps key:
  ```powershell
  copy .env.example .env
  # edit .env and set GOOGLE_MAPS_API_KEY
  ```
4. **Generate the runtime config** so the browser module can read the key without committing it:
  ```powershell
  npm run build:config
  ```
  This writes `js/config.js` (gitignored) with `envConfig.googleMapsApiKey`.
  Never commit this generated file with a real key.
5. **Serve the app** using any static server (ES modules require HTTP). For example:
  ```powershell
  npm start
  ```
  Or, if you prefer, run:
  ```powershell
  npx serve .
  ```
  You can also launch via VS Code's Live Server extension.
6. **Load the app** in the browser (default `http://localhost:3000`) and allow location access when prompted.

## Google Maps Key Policy
- `.env` and generated `js/config.js` are local-only files and must remain untracked.
- Google Maps browser keys are exposed to the client by design. Do not treat `js/config.js` as a secret store.
- Never commit a real API key to the repository, screenshots, docs, issues, or pull requests.
- Before any public demo, require Google Cloud HTTP referrer restrictions for the exact demo origins.
- If referrer restrictions are not configured and verified, treat the project as a local-only demo.

## Demo Support
- Local-only demo: supported. Use a local `.env`, generate `js/config.js`, and serve the app from localhost.
- Public demo with restricted browser key: supported only when the key is limited by strict HTTP referrer restrictions and only the required Maps APIs are enabled.
- Public demo without restrictions: not supported.
- Deferred demo: acceptable until a restricted browser key is prepared for the intended hosting domain.

## Usage
1. Click anywhere on the map to open the dialog, name the spot, and set a rating.
2. Filter by text or minimum rating, and sort by name, rating, or creation time.
3. Select a location to view address details, drop a marker, copy the deep link, or share via the Web Share API.
4. Hit the "My position" button to center the map around your geolocation and get distance calculations per saved location.
5. Track collection health through the dual donut charts (by rating and last update window).

## Data Model
Each location persists to LocalStorage via `async-storage.service.js` with the following schema:
```js
{
  id: 'GEouN',
  name: 'Dahab, Egypt',
  rate: 5,
  geo: {
    address: 'Dahab, South Sinai, Egypt',
    lat: 28.5096676,
    lng: 34.5165187,
    zoom: 11
  },
  createdAt: 1706562160181,
  updatedAt: 1706562160181
}
```
Data is seeded with three demo entries on first load and can be filtered, sorted, and aggregated entirely client-side.

## Core Modules
- `locService`: CRUD, filter/sort state, and stats helpers (`getLocCountByRateMap`, `getLocCountByUpdateMap`).
- `mapService`: Google Maps bootstrap, reverse geocoding, marker management, and user click handlers.
- `utilService`: Shared utilities (ID generation, elapsed time formatting, query param syncing, color palette, distance calculation).
- `app.controller`: Renders lists/UI, wires DOM events to the services via the global `window.app` namespace, and surfaces user messaging.

## Customization Ideas
1. Swap LocalStorage for a real backend by replacing `async-storage.service.js` with fetch calls.
2. Extend the dialog with photos, tags, or visit notes and visualize them in the list.
3. Add pagination using the existing `PAGE_SIZE` constant inside `locService`.
4. Gate map interactions behind authentication if embedding into a larger dashboard.

## Troubleshooting
- **Map fails to load**: Confirm the API key is valid, referrer restrictions are correct, and billing is enabled for the Maps project.
- **Geolocation blocked**: The browser requires HTTPS (or localhost). Allow the permission prompt and retry the "My position" button.
- **Clipboard/Web Share errors**: Some desktop browsers restrict these APIs to HTTPS contexts; run via `Live Server` or a secure host.

## Validation
- `npm run check`: validates tracked JavaScript syntax and confirms `index.html` references existing local assets.
- GitHub Actions runs the same check on pushes to `main` and on pull requests without requiring secrets or generated runtime config.

Happy mapping! 🚀


