---
name: git-commits
description: >-
  Write git commits as a step narrative — many small conventional commits that
  show how we got here. Use when the user asks to commit, split commits, write
  a commit message, or review commit history style, and when planning work so
  the plan includes the commit chain. Covers monorepo app scopes (feat(web),
  feat(mobile)), tickets as scope when the repo does that (feat(JH-142)), and
  repos that keep the ticket on the branch and pull request title.
license: MIT
metadata:
  author: 1chooo
  version: "1.3.0"
---

# Git Commits

Each commit is a **step**. `git log` should reconstruct the path — not one opaque dump. Why over what. No fluff.

Use when the user asks to commit, amend (only if allowed), draft a message, split a diff into reviewable steps, or write a plan.

## Format

```
type(scope): imperative summary

optional body

optional footer
```

Scope may be omitted:

```
type: imperative summary
```

Ticket known, and this repo puts tickets in scope:

```
type(<TICKET-NUM>): <imperative verb> rest of summary
```

Types: `feat` `fix` `refactor` `perf` `docs` `test` `chore` `style` `build` `ci` `revert`

- Scope: ticket ID when the repo uses tickets as scope; else the app/package (monorepo) or area. Omit when the ticket stays on the branch and pull request, or when nothing more specific than the type exists. Infer from `git log`.
- Subject: imperative, lowercase after the colon, no trailing period. ≤50 chars when possible, hard cap 72.
- Body: skip when the subject is enough. Why / intent — not a file inventory.
- Breaking: `type(scope)!:` plus a `BREAKING CHANGE:` footer.

Validate: allowed type; imperative verb (`add` not `added` / `adds`); body and footer only when they earn the lines.

## Scope

Read `git log` and the repo's rules before placing a ticket. Do not invent ticket IDs. Prefer one ID per commit.

**Ticket is the scope** when that repo already writes `feat(JH-142):`. Ticket wins over the app name. If both matter, name the app in the summary (`feat(JH-142): add web member checkout`) or the body.

**Ticket stays off the subject** when the repo keeps it on the branch and the pull request title. Write `type:` or `type(area):`. Do not start the subject with the key, and do not put the key in scope.

```
fix: soften the press ripple
```

Not `PROJ-12: soften the press ripple`.

**No ticket** → scope is the app / package, not a restatement of the type:

```
feat(web): ...
feat(mobile): ...
fix(api): ...
```

**Do not duplicate type as scope.** `docs(docs):`, `test(test):`, `chore(chore):` add nothing.

| Situation | Use | Not |
|-----------|-----|-----|
| Feature in the web app | `feat(web):` | `feat(feat):` |
| Docs about the web app | `docs(web):` | `docs(docs):` |
| Repo-wide docs, or a `docs` package with no better target | `docs:` | `docs(docs):` |
| Tests for mobile | `test(mobile):` | `test(test):` |

Scope the thing documented or tested, not the `docs`/`test` folder. Omit scope when nothing more specific than the type exists.

| Repo | Typical scopes |
|------|----------------|
| JustHold | `web`, `api`, `tokens`, `agents`, `mobile` |
| 1chooo.com | `bio`, `projects`, `services`, `admin`, `articles` |

## Subject and body

Skip the body when the subject is self-explanatory.

**Always** include a body for: breaking changes, security fixes, data migrations, reverts. Future readers need the context.

**Never** put in the message:

- "This commit does X", "I", "we", "now", "currently" — the diff says what
- AI attribution (`Generated with …`, Co-authored-by an AI)
- Emoji, unless the repo already uses it
- Filenames the scope already names
- Customer names, emails, support-ticket contents, secrets, or PII — describe the technical symptom

## Footers

- `Closes #42` / `Fixes #42` closes an extra issue. `Refs #17` links without closing.
- Ticket already in scope (`feat(JH-142):`) → do **not** also `Closes JH-142`.
- Breaking: `BREAKING CHANGE: <what callers must do>`.

## Plan the commits

In plan mode, name the commit chain before any code. The goal is what we are building. The chain is how a later reader replays the work. Recording that process is part of the developer experience, so it belongs in the plan — not as a cleanup after the diff.

Each step is one subject, in the order it will land. When implementation starts, commit that step as it finishes. Split an existing diff only when the user asks.

```
feat: parse stored markup into blocks
feat: render formatted bodies on the detail screen
feat: preview bodies as plain text in the list
fix: keep hyphenated words on one line
test: cover each markup mark
fix: handle links the device cannot open
```

A workspace of several repos gets one chain per repo. Commit inside the repo that owns the files. Stay local until the user asks to push.

## Split into steps

When the tree mixes concerns, and no plan already named the chain:

1. Group **one step** (one UI surface, one API layer, one docs pass). Independently reviewable.
2. Stage only that group; commit with a message that names the step.
3. Repeat until the tree is clean.
4. Prefer a short chain over one mega-commit.

## When committing

Only after the user explicitly asks. Stay on the current branch, including `main`.

1. `git status` and `git diff --staged` (else `git diff`).
2. If a plan already named the chain, take the next step on that list. Otherwise pick one step. Stage that group only.
3. Write the message. Subject must stand alone in `git log --oneline`.
4. Commit with HEREDOC — never literal `\n` in `-m`:

```bash
git commit -m "$(cat <<'EOF'
type(scope): imperative summary

Optional body: why this step matters.

Optional footer
EOF
)"
```

5. If a hook fails or auto-modifies files: fix, then a **new** commit. Do not amend unless the user asked and HEAD is ours and unpushed.

## Safety

- Commit only when the user asks. Do not invent a commit.
- Commit inside the repo that owns the files. Stay local until the user asks to push.
- Never stage secrets (`.env`, credentials, private keys).
- Never skip hooks (`--no-verify`) unless the user asks.
- Never update git config, force-push to main/master, or run destructive git unless explicitly requested.

## Anti-patterns

| Avoid | Prefer |
|-------|--------|
| `update stuff` / `misc fixes` | Named step + scope |
| `docs(docs):` / `test(test):` | `docs(web):` or `docs:` |
| `feat(web): JH-142 add checkout` | `feat(JH-142): add checkout` |
| `feat(JH-142): checkout flow` (no verb) | `feat(JH-142): add checkout flow` |
| One commit for 5 pages | One commit per page/step |
| Plan that only states the goal | Plan that also names the commit chain |
| `PROJ-12: soften the press ripple` | `fix: soften the press ripple` |
| Body that lists every file | Body that states intent |
| Squashing steps before PR (unless asked) | Keep the narrative |

## Examples

Diff: member desktop nav, split into steps — not one dump.

```
feat(web): add member desktop top-nav item list
feat(web): make member account menu header-ready
feat(web): add desktop top navbar to member site header
feat(web): switch member shell from sidebar to top navbar
docs(web): document member desktop top-nav shell
```

Diff: drop intro copy the nav already labels.

```
refactor(web): drop Tools page desktop intro

Start with the tool cards; nav already labels the page.
```

Diff: work tied to tickets.

```
feat(JH-142): add member checkout
fix(MOB-88): prevent double tap on submit
```

```
fix(API-12): reject stale webhook signatures

Replay window is 5 minutes; unsigned retries were still accepted.
```

Diff: 1chooo.com surfaces.

```
feat(bio): restyle work history with company logos
fix(cursor): scale heatmap to the content column
chore(services): remove big money from the navbar
docs: add contributing guide
```

```
fix(cursor): scale /cursor heatmap to the content column

The year grid was a fixed-width HTML layout clipped by overflow-x-hidden.
```

Diff: rename a public route.

```
feat(api)!: rename /v1/orders to /v1/checkout

BREAKING CHANGE: clients on /v1/orders must migrate to /v1/checkout.
Old route returns 410.
```

**Bad**

```
chore: cleanup
docs(docs): update readme
feat(web): JH-142 add checkout
refactor(web): remove headers and fix layout and update docs
```
