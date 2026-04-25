## Linear ticket
<!-- Closes GIZ-XXX  or  Part of GIZ-XXX  — required for Linear sync. Branch must be named GIZ-XXX-description. -->
Closes GIZ-

---

## Summary
<!-- What changed and why. One bullet per meaningful change. -->
-

## Type of change
- [ ] Bug fix
- [ ] New feature / story
- [ ] Chore / refactor / dependency update
- [ ] Documentation only

---

## Analytics events
<!-- Every new posthog.capture() call added or modified in this PR. "None" is only valid for chores/docs. -->
- [ ] No new user-facing behavior — no events needed
- [ ] Events added:
  - `event_name` — where triggered, properties: `{ key: value }`

---

## Test plan
**Core paths — check every one that applies:**
- [ ] Auth: login, logout, session persists on hard refresh
- [ ] RLS: your data is visible; another user's data is not accessible
- [ ] Core value action works end-to-end (add, edit, or view the primary thing)
- [ ] eBay pricing modal: opens, returns data, one-click accept updates the item
- [ ] Edit history: field change shows amber border and logs correctly

**New code:**
- [ ] New components have `data-testid` attributes on interactive elements
- [ ] No TypeScript/ESLint errors (`npm run lint`)
- [ ] No unhandled promise rejections or console errors in the browser
- [ ] Keyboard navigable — tab order is logical, focus indicators visible
- [ ] Tested at mobile width (375px)

**If DB changes:**
- [ ] Migration file added and runs clean locally
- [ ] RLS policies reviewed and updated for any new table or column
- [ ] No raw user data (email, id, PHI) exposed in API response shape

---

## Deploy checklist
- [ ] No hardcoded API keys or secrets in source
- [ ] New environment variables added to Vercel (production + preview)
- [ ] Vercel preview URL opened and tested before requesting review
- [ ] Screenshots attached if UI changed

---

## Resources
- Linear workspace: https://linear.app/gizmobuild
- DocVault Notion runbook: https://www.notion.so/34b3af2930d681ddbafce6c0c539049b
- PostHog event taxonomy: https://www.notion.so/34c3af2930d6818fa084dfea99faf43f
- Branch naming: `GIZ-XXX-short-description`
