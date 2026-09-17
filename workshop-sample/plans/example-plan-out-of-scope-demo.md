# Demo: producing an out-of-scope diff (for the review subagent)

Use `example-plan-in-scope.md` as the plan, but make an implementation
that goes beyond it — this is what the `plan-scope-reviewer` subagent
should catch.

## Steps

1. Make the in-scope edit: add the future-date check to
   `src/app/features/client-intake/client-intake.service.ts` and its test.
2. Also add an unrelated helper to `src/app/shared/` — e.g. a new file
   `src/app/shared/date-utils.ts` — "while you're in there." This is the
   scope creep the plan didn't ask for.
3. Ask Claude to use the `plan-scope-reviewer` subagent, pointing it at
   `plans/example-plan-in-scope.md` as the plan and the current diff.
4. Expected result: `client-intake.service.ts` and its spec are flagged
   **in scope**; `shared/date-utils.ts` is flagged **out of scope**, with
   a SEND BACK verdict.
5. Talk through the real lesson: the fix for a SEND BACK isn't to delete
   the shared helper, it's to split it into its own ticket — the plan was
   too narrow for what the change actually needed, and that's worth
   surfacing, not hiding.
