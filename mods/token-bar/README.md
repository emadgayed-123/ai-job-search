# token-bar

A Claude Code mod that draws a live context-window bar above the prompt:

```
Context ██████████░░░░░░░░░░░░░░ 42% · 84k/200k tokens · $1.37
```

- Refreshes after every turn from the engine's own usage figures (same as the status line and `/context`).
- Green under 60%, amber from 60%, red from 85%; a one-time toast at 85% suggests `/compact`.
- `/token-bar` hides or shows the bar.

## Install

In a Claude Code terminal session:

```
/plugin install token-bar --marketplace emadgayed-123/ai-job-search
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session).

## Develop

```
claude --plugin-dir mods/token-bar
claude plugin validate mods/token-bar
claude plugin test mods/token-bar
```
