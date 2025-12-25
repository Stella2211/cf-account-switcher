# github:Stella2211/cf-account-switcher

English | [日本語](./README.ja.md)

Cloudflare account switcher for wrangler - easily switch between multiple Cloudflare accounts without running `wrangler login` each time.

## Disclaimer

This tool is **unofficial** and is not affiliated with Cloudflare, Inc. in any way. The author is not an employee of Cloudflare, and this tool is not endorsed, sponsored, or otherwise associated with Cloudflare, Inc.

This tool only provides functionality to copy and manage wrangler configuration files (`default.toml`). It does not modify or redistribute wrangler or any other Cloudflare software.

## Installation

```bash
# Using bunx (recommended)
bunx github:Stella2211/cf-account-switcher

# Using npx
npx github:Stella2211/cf-account-switcher

# Global installation
bun add -g github:Stella2211/cf-account-switcher
```

## Usage

### Save current account

First, login to your Cloudflare account using wrangler:

```bash
wrangler login
```

Then save the account configuration:

```bash
cf-account-switcher add personal
```

### Switch between accounts

```bash
cf-account-switcher use personal
cf-account-switcher use work
```

### List saved accounts

```bash
cf-account-switcher list
```

### Remove a saved account

```bash
cf-account-switcher remove personal
```

## How it works

This tool manages wrangler configuration files by copying them to `~/.config/stella2211/cf-account-switcher/accounts/`.

### Wrangler config file locations

This tool checks multiple paths and uses the first one where a config file exists:

| OS | Legacy Path | XDG-Compliant Path |
|----|-------------|-------------------|
| **macOS** | `~/.wrangler/config/` | `~/Library/Preferences/.wrangler/config/` |
| **Windows** | `%USERPROFILE%\.wrangler\config\` | `%AppData%\.wrangler\config\` |
| **Linux** | `~/.wrangler/config/` | `~/.config/.wrangler/config/` |

### Config file names

- **Production (default)**: `default.toml`
- **Staging**: `staging.toml` (when `WRANGLER_API_ENVIRONMENT=staging` is set)

## Commands

| Command | Shorthand | Description |
|---------|-----------|-------------|
| `add <name>` | `a` | Save current wrangler account with the given name |
| `use <name>` | `u` | Switch to a saved account |
| `list` | `ls`, `l` | List all saved accounts |
| `remove <name>` | `rm`, `r` | Remove a saved account |
| `help` | `h` | Show help message |
| `version` | `v` | Show version number |

## Requirements

- [Bun](https://bun.sh) >= 1.0.0 or [Node.js](https://nodejs.org) >= 18.0.0
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) installed and logged in

## Development

### Using Bun

```bash
# Install dependencies
bun install

# Run locally
bun run src/index.ts

# Lint
bun run lint

# Type check with tsgo
bun run typecheck
```

### Using npm / Node.js

```bash
# Install dependencies
npm install

# Run locally
npx tsx src/index.ts

# Lint
npm run lint

# Type check with tsgo
npm run typecheck
```

## License

MIT
