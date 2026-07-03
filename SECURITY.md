# Security Policy

## Supported Versions

This project is a small educational application and does not currently publish
separate supported release lines. Security fixes are applied on the latest
version in the default branch when maintenance is available.

## Reporting a Vulnerability

Please do not open public GitHub issues for suspected vulnerabilities, exposed
keys, or other sensitive security reports.

Report security concerns privately to the repository owner through GitHub
private channels or another agreed private contact method. Include:

- A short description of the issue
- Steps to reproduce or verify it
- The affected files or features
- Any suggested mitigation, if known

The maintainer will review the report, confirm the impact, and coordinate a
fix before any public disclosure.

## Secrets and Credentials

Do not commit API keys, `.env` files, generated runtime config with real keys,
or other credentials to this repository.

## Google Maps Browser Key Guidance

This project injects the Google Maps API key into `js/config.js` for browser
use during local or demo runs. That means the key is visible to the client by
design and must be protected with Google Cloud configuration rather than by
repository secrecy alone.

Required safeguards for any public demo:

- Keep `.env` and `js/config.js` untracked and out of commits
- Use a dedicated browser key, not a broader development or owner key
- Restrict the key with exact HTTP referrer rules for the intended demo origins
- Enable only the Google Maps APIs that the demo actually needs

If those restrictions are not in place, do not publish or promote a public
demo that depends on the real key.
