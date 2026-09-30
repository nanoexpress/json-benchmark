# PR: Modernize toolchain — bun, latest deps, Biome + rumdl + lefthook

## Changes

### 1. bun as package manager

- Added `packageManager: bun@1.4.2`; `bun.lock` regenerated.

### 2. All dependencies upgraded to latest

| Package | Before | After |
|---|---|---|
| vitest | ^4.1.2 | ^5.0.3 |
| fast-json-stringify | ^6.3.0 | ^7.0.1 |
| msgpackr | ^1.11.9 | ^2.1.0 |
| bson | ^7.2.0 | ^7.3.3 |
| protobufjs | ^8.0.1 | ^8.8.0 |
| @msgpack/msgpack / avsc / bser / js-binary | already latest | unchanged |

- Bench suites migrated to the Vitest 5 bench API (`bench` is no longer a top-level export; now a test-context fixture with `.run(config)`).
- Added `msgpackr-extract` to `trustedDependencies` so its native postinstall runs (previously silently blocked).

### 3. New toolchain (drop Prettier)

- **Removed:** `prettier`, `prettier-config-airlight`, `.prettierrc.cjs`, `.prettierignore` (2 packages).
- **Added:** Biome 2.5 (`biome.json` matching airlight prettier config: single quotes, 80 width, no trailing commas, bracketSameLine), rumdl 0.2 (`rumdl.toml`; MD013/MD033 off for long benchmark output + badge HTML), lefthook 2.1 (`lefthook.yml` pre-commit: `biome check --write` on staged JS/JSON, `rumdl check` on staged Markdown).
- Code fixes from first `biome check`: `node:` protocol imports, sorted imports, removed `return this` from constructor, formatting applied.

## Verification

- `bun run benchmark`: **18/18 tests pass** (9 serialize + 9 deserialize benches) on vitest 5.

## Metrics (measured on this machine, cold start)

| Operation | Before | After | Δ |
|---|---|---|---|
| format check (27 files) | `prettier -c .` **0.36s** | `biome check .` **0.12s** | **3.1x faster** (also lints now) |
| markdown lint | none | `rumdl check .` 0.09s | new |
| install (cold) | 1.06s | ~1.1s | ≈equal (deps upgraded + 3 dev tools added) |
| benchmark suite | 52.0s (vitest 4) | 51.4s (vitest 5) | ≈equal, all 18 pass |
| git hooks | none | lefthook pre-commit auto-fix + markdown gate | new |
