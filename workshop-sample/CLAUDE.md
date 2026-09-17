# Project Instructions — Workshop 3 Sample Repo

> Sample/demo repo for Workshop 3 (Technical Lead & Team Lead track). This
> file is intentionally already filled in and correct for this repo — use
> it as the reference example, then write your own from a blank file live
> in the workshop demo.

## Build, run, test

- Install dependencies: `npm install`
- Unit tests: `npm test`
- Lint: `npm run lint` (stub in this sample repo — wire up ESLint for a real project)
- Build: `npm run build` (stub in this sample repo — wire up your real build step)

> For your real Angular repo, use the actual Angular commands instead:
> `ng serve`, `ng test --watch=false --browsers=ChromeHeadless`, `ng build --configuration production`.

## Folder map

- `src/app/features/<feature>/` — one folder per business capability (e.g. `client-intake`). Feature code stays inside its own folder.
- `src/app/shared/` — shared components/services. No feature-specific logic here.
- `src/app/core/` — singleton services, guards, interceptors.
- `src/environments/` — environment configuration. Never hardcode secrets or tokens here.
- `legacy/` — frozen code, scheduled for removal (see "Never touch" below).

## Patterns to follow

Example file: `src/app/features/client-intake/client-intake.service.ts`

- One class, one responsibility.
- Pure functions where possible — `validate()` takes data in, returns
  errors out, no hidden state.
- A matching `.spec.ts` file next to every service, testing both the
  happy path and at least one failure path.

## Definition of done

- [ ] Unit tests written and passing for new or changed logic.
- [ ] `npm test` is green.
- [ ] Nothing outside the ticket's stated scope was touched (check with the `plan-scope-reviewer` subagent).
- [ ] PR description names the ticket it closes.

## Never touch

- `legacy/` — frozen, scheduled for removal. Don't extend or fix it in place — flag it to the tech lead instead.
- `src/environments/environment.prod.ts` — owned by the release process.

## Keeping this file honest

Review this file every quarter. If a line hasn't been true for a month,
delete it. Test: a new joiner clones this repo, reads only this file, and
their first session behaves like everyone else's.
