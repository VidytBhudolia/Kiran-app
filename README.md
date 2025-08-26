# Kiran App

An Expo React Native dashboard app with charts, plus a minimal Node/Express API (MongoDB) for ingesting and serving telemetry.

## Features
- Expo (React Native) app with two screens: Dashboard and Comparisons
- Live charts for irradiance, temperature, voltage, azimuth, and zenith
- Server exposes simple REST endpoints to POST and GET data
- Environment-based API endpoint (no hard-coded URLs)

## Monorepo layout
- App (Expo): `./` (root)
- Server (Node/Express): `./server`

## Prerequisites
- Node.js 18+ and npm or yarn
- Expo CLI (optional; Expo will prompt to install)
- For the server:
  - MongoDB instance (local or hosted) and a connection string

## Quick start

1) Configure environment
- Copy `.env.example` to `.env` in the project root and set `API_URL` to your server's `/api/data` endpoint.
- Example (local dev):
  - Server runs on port 3000 (default), so: `API_URL=http://localhost:3000/api/data`

2) Install dependencies
- App (root): run `npm install`
- Server: run `npm install` inside `server/`

3) Run the server (local)
- Create `server/.env` with:
  - `MONGO_URI=<your mongodb connection string>`
- Start the server (e.g. using node):
  - `node server/api/index.js`
- The API will listen on `PORT` env or `3000` by default
  - Endpoints:
    - `POST /api/data` to ingest a document
    - `GET /api/data` returns recent documents (limit 10)

4) Run the app (Expo)
- From the project root: `npm run start`
- Press `a` for Android emulator, `i` for iOS (macOS), or scan the QR in Expo Go

## Environment
- `.env` (root): used by the app via `react-native-dotenv` (see `babel.config.js`)
  - Keys must be in `KEY=VALUE` format
  - Example: `API_URL=https://example.com/api/data`
- `server/.env`: loaded by `dotenv` in the server
  - Example: `MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority`

## Deploying the server (Vercel)
- The repo includes `server/vercel.json` to deploy `server/api/index.js` as a serverless function.
- Create a new Vercel project pointing at the `server` folder.
- Add `MONGO_URI` as a Vercel environment variable.
- After deploy, set your app `.env` `API_URL` to the deployed URL + `/api/data`.

## Tech stack
- App: Expo, React Native, React Navigation, react-native-chart-kit, react-native-svg
- Server: Express, Mongoose, CORS, dotenv

## Scripts
- App (root):
  - `npm run start` – start Expo dev server
  - `npm run android` – start on Android
  - `npm run ios` – start on iOS (macOS only)
  - `npm run web` – start web
- Server:
  - No predefined scripts; run `node server/api/index.js` or add scripts as needed

## Notes
- The Dashboard screen polls the API every ~2.5 seconds. Ensure `API_URL` is reachable and returns JSON array documents with fields: `irradiance`, `temperature`, `voltage`, `azimuth`, `zenith`, and `timestamp`.
- For production, prefer HTTPS endpoints and secure your server and database.
