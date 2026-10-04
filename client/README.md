# JobJourney frontend

This directory contains the React frontend for JobJourney. See the [project README](../README.md) for features, architecture, environment variables, database setup, and deployment.

Use Node.js 24 LTS (see `../.nvmrc`). From the project root, `npm run setup-project` installs both packages and `npm run dev` starts the API and frontend together.

If working from this directory:

```bash
npm ci
npm run dev       # http://localhost:5173; start the API separately from the root
npm run build     # writes dist/
npm run lint
npm run test:run   # one run
npm test          # watch mode
npm run test:ui   # interactive test UI
```

`vite.config.js` proxies `/api` to the backend port configured in the root `.env` (default `5100`). The Axios client uses `/api/v1`. Server credentials belong in the root environment file; they must not be placed in `VITE_` variables.

Routes, loaders, and actions live in `src/App.jsx` and `src/pages/`. TanStack Query manages cached API data, styled-components and CSS style the UI, and Recharts renders application statistics. Tests use Vitest, jsdom, and React Testing Library.

`npm run preview` previews the static build only. To serve the built frontend with its API, run `npm start` from the project root after building.
