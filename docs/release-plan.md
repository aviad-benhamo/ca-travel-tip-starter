# TravelTip Release Plan

This document outlines the release versioning policy, release notes format, and the step-by-step process for releasing versions of the TravelTip application.

## Versioning Policy

TravelTip follows **Semantic Versioning (SemVer)** for all public releases and tags.

- **Initial State (Experimental/Starter)**:
  - The initial release is designated as `v0.1.0`.
  - All early public and starter releases use the `0.y.z` format. These are considered experimental and portfolio-ready only after completion of hardening issues.
- **Stable Releases**:
  - Once the application is stabilized, hardened, and explicitly approved by the repository owner, it will transition to `v1.0.0`.
- **Subsequent Releases**:
  - **PATCH** (`0.1.x`): Internal refactorings, bug fixes, maintenance tasks, and GRS-only standard updates.
  - **MINOR** (`0.x.0`): New user-facing features, major documentation updates, or new tool configurations.
  - **MAJOR** (`x.0.0`): Breaking changes, major redesigns, or transition to stable production.

## Release Notes Format

For every GitHub Release, the release notes must be drafted in English using the following template:

```markdown
# TravelTip v[MAJOR].[MINOR].[PATCH]

[Brief 1-2 sentence high-level summary of the release's objective and context]

## What's Changed

[Paste the compiled list of changes from the corresponding section in CHANGELOG.md]

## Verification
[Brief list of validation steps performed, e.g., static checks passing, manual verification]
```

## Step-by-Step Release Process

This checklist outlines the steps required to finalize a release. **Do not execute steps that write to the remote origin or create GitHub Releases unless explicitly approved.**

### 1. Pre-Release Validation
- Ensure all static validation checks pass locally:
  ```bash
  npm run check
  ```
- Ensure the version in `package.json` matches the intended release version (e.g., `"version": "0.1.0"`).
- Ensure all recent changes are documented under the corresponding version section in `CHANGELOG.md`, and that the `[Unreleased]` section is clean.

### 2. Create the Local Tag
- On the `main` branch, create a signed or annotated Git tag:
  ```bash
  git tag -a v0.1.0 -m "Release v0.1.0 - Initial starter release with GRS integration"
  ```

### 3. Push and Publish (Pending Explicit Approval)
- Push the release tag to the origin repository:
  ```bash
  git push origin v0.1.0
  ```
- Navigate to GitHub or use the GitHub CLI to draft a new release:
  - Target: `v0.1.0`
  - Release Title: `TravelTip v0.1.0`
  - Description: [Paste the generated Release Notes]
  - Publish the release.
