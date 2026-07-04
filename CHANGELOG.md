# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this repository follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for tagged releases.

## [Unreleased]

## [0.1.0] - 2026-07-04

### Added

- Foundational structure for the TravelTip location bookmarking application.
- Interactive map integration using the Google Maps JavaScript API.
- Dialog modal for adding and updating locations (names, ratings, and coordinates).
- Geolocation detection and calculation of distance from the user's position to bookmarks.
- Filter search to search bookmarked locations by address/name.
- Sorting functionality to sort locations by creation time.
- Status/Stats dashboard displaying total location counts and average ratings.
- UI theme switching toggle (light/dark mode).
- Dialog confirmation prompts before deleting locations.
- Local browser storage integration for persistent bookmark data.
- Required GRS baseline files: `LICENSE`, `.gitattributes`, `.editorconfig`, `SECURITY.md`, and `CHANGELOG.md`.
- Static validation checks (`npm run check`) and GitHub Actions workflow for syntax checks.
- Repository-specific AI agent guidelines (`AGENTS.md`).
- App preview screenshot (`assets/screenshots/demo.png`) for visual README.

### Changed

- Transitioned Google Maps API key loading to use local environment config (`.env` and generated config).
- Cleaned up `package.json` metadata (MIT license, node runtime policy, and local start scripts).
- Enhanced layout styling for the locations list and components.
- Refactored documentation in `README.md` and `SECURITY.md` for referrer restrictions and safe keys.
