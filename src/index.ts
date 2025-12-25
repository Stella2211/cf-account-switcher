#!/usr/bin/env node
import { addAccount } from "./commands/add.js"
import { listAccounts } from "./commands/list.js"
import { removeAccount } from "./commands/remove.js"
import { useAccount } from "./commands/use.js"

const VERSION = "1.0.0"

function showHelp(): void {
	console.log(`
cf-account-switcher v${VERSION}

Cloudflare account switcher for wrangler

Usage:
  cf-account-switcher <command> [options]

Commands:
  add, a <name>      Save current wrangler account with the given name
  use, u <name>      Switch to a saved account
  list, ls, l        List all saved accounts
  remove, rm, r <name>  Remove a saved account
  help, h            Show this help message
  version, v         Show version number

Examples:
  cf-account-switcher add personal
  cf-account-switcher add work
  cf-account-switcher use personal
  cf-account-switcher list
  cf-account-switcher remove work
`)
}

function showVersion(): void {
	console.log(`cf-account-switcher v${VERSION}`)
}

function main(): void {
	const args = process.argv.slice(2)
	const command = args[0]
	const arg = args[1]

	switch (command) {
		case "add":
		case "a":
			addAccount(arg ?? "")
			break
		case "use":
		case "u":
			useAccount(arg ?? "")
			break
		case "list":
		case "ls":
		case "l":
			listAccounts()
			break
		case "remove":
		case "rm":
		case "r":
		case "delete":
			removeAccount(arg ?? "")
			break
		case "version":
		case "v":
		case "-v":
		case "--version":
			showVersion()
			break
		case "help":
		case "h":
		case "-h":
		case "--help":
		case undefined:
			showHelp()
			break
		default:
			console.error(`Unknown command: ${command}`)
			console.error("Run 'cf-account-switcher help' for usage information")
			process.exit(1)
	}
}

try {
	main()
} catch (error) {
	console.error("Error:", error instanceof Error ? error.message : error)
	process.exit(1)
}
