# PawPaths Mobile MVP

A React Native (Expo) prototype for a dog-owner social walking app.

## What is implemented

- **Discover** tab with nearby dog-friendly routes.
- **Track** tab with live walk timer, distance simulation, and pace.
- **Alerts** tab to post and view safety warnings (bugs, glass, heat, etc.).
- **Profile** tab to create and view dog profiles.

This is a local MVP foundation to validate core UX loops before adding backend services and production map/location integrations.

## Notes for this repository

- Binary image assets were removed to keep PRs text-only in environments that reject binary files.
- Expo will use defaults for icon/splash during local development unless you add your own assets later.

## Run locally

```bash
npm install
npm run start
```

Then open in Expo Go (Android/iOS) or press `w` for web preview.

## Scripts

- `npm run start` - start Expo dev server.
- `npm run android` - launch Android target.
- `npm run ios` - launch iOS target.
- `npm run web` - launch web target.
- `npm run typecheck` - TypeScript no-emit check.

## Next build steps

1. Add real GPS/background tracking via Expo Location + Task Manager.
2. Add map rendering and geospatial backend (Supabase/PostGIS).
3. Add authentication + cloud persistence.
4. Add social graph (follows/comments) and moderation controls.
