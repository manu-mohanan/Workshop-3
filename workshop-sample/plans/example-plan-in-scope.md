# Plan: Add date-of-birth validation to client intake

**Ticket:** PCIS-1042
**Owner:** (developer name)
**Approach:** Add a check in `ClientIntakeService.validate()` that rejects
a `dateOfBirth` in the future, in addition to the existing required-field
check. Add a corresponding test in `client-intake.service.spec.ts`.

**Scope:** `src/app/features/client-intake/` only.

**Check:** `npm test` passes, including a new test case for a future date
of birth being rejected.

**Size:** One story, one day.

---
Run this through the four questions before it starts:
1. Is this the right approach? — yes, it's a small addition to an existing pure function.
2. Is it too big for one session? — no, single file plus its test.
3. Does it name its check? — yes, `npm test`, with a named new case.
4. Does it touch anything it shouldn't? — no, scope is one folder.
