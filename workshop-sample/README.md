# Workshop 3 Sample Repo — Technical Lead & Team Lead track

A small, actually-runnable repo built for Workshop 3 demos. It mirrors the
shape of a typical Angular feature module, but the test command runs on
plain Jest so you can `npm install && npm test` and demo the blocking
hook without a full Angular toolchain installed.

You handle `git init` / `git add` / `git commit` yourself — this archive
is just the file tree to commit.

## What's in here

| Path | What it's for |
|---|---|
| `CLAUDE.md` | The committed instruction file — already filled in for this sample repo |
| `.claude/settings.json` | Wires up the blocking hook |
| `.claude/hooks/block-red-commit.sh` | Blocks `git commit` when tests are red |
| `.claude/agents/plan-scope-reviewer.md` | The review subagent — flags files a diff touches outside the plan |
| `src/app/features/client-intake/` | A small feature module with a real, passing Jest test — this is what you break/fix live to demo the hook |
| `src/app/shared/`, `src/app/core/` | Empty placeholders matching the folder map in `CLAUDE.md` |
| `legacy/` | Placeholder for the "never touch" section of `CLAUDE.md` |
| `plans/` | Two example plans (format only) for demoing the review subagent — swap for real attendee plans in the actual workshop |

## Quick start

```bash
npm install
npm test          # should pass — this proves the hook has something real to check
```

Turn this into your repo:

```bash
git init
git add .
git commit -m "Initial commit: Workshop 3 sample repo"
```

## Demo the blocking hook

1. Open `src/app/features/client-intake/client-intake.service.spec.ts`.
2. Change one expectation so it fails (e.g. flip an `expect(...).toEqual([])` to expect a non-empty array).
3. Ask Claude Code to commit: *"commit this with message 'test'"* — it should be blocked, with the failing test output shown as the reason.
4. Revert the change (or fix it properly), commit again — it should go through.

## Demo the review subagent

1. Open `plans/example-plan-in-scope.md` — this is the plan a "developer" was given.
2. Make an edit inside `src/app/features/client-intake/` (in scope) **and** an edit inside `src/app/shared/` (out of scope, not mentioned by the plan).
3. Ask Claude to use the `plan-scope-reviewer` subagent to check the diff against the plan.
4. It should flag the `shared/` file and return a SEND BACK verdict.

## Notes

- `npm run lint` and `npm run build` are stubs (they just print a message)
  — this is a demo repo, not a shippable app. Wire up real ESLint/Angular
  build commands when you adapt these files for an actual project repo.
- For your real Angular repo, swap the Jest-based `npm test` in
  `CLAUDE.md` and `.claude/hooks/block-red-commit.sh` back to the real
  Angular command (`ng test --watch=false --browsers=ChromeHeadless`) —
  this sample uses Jest only so the demo runs without installing the full
  Angular CLI.
- Facilitator instructions for the workshop this repo supports live in
  `HOW-TO-RUN-WORKSHOP-3.md` and `README-toolkit-overview.md` (the wider
  toolkit you already have).
