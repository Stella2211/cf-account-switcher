import { readFileSync, writeFileSync } from "node:fs"
import {
	accountExists,
	ensureConfigDirs,
	getAccountConfigPath,
	getWranglerConfigPath,
	wranglerConfigExists,
} from "../config.js"

export function addAccount(name: string): void {
	if (!name || name.trim() === "") {
		console.error("Error: Account name is required")
		console.error("Usage: cf-account-switcher add <name>")
		process.exit(1)
	}

	const safeName = name.trim()

	if (!/^[\w-]+$/.test(safeName)) {
		console.error(
			"Error: Account name can only contain alphanumeric characters, underscores, and hyphens",
		)
		process.exit(1)
	}

	if (!wranglerConfigExists()) {
		console.error("Error: Wrangler config not found")
		console.error("Please run 'wrangler login' first to create a config file")
		process.exit(1)
	}

	if (accountExists(safeName)) {
		console.error(`Error: Account '${safeName}' already exists`)
		console.error("Use a different name or remove the existing account first")
		process.exit(1)
	}

	ensureConfigDirs()

	const wranglerPath = getWranglerConfigPath()
	const accountPath = getAccountConfigPath(safeName)

	const configContent = readFileSync(wranglerPath, "utf-8")
	writeFileSync(accountPath, configContent)

	console.log(`Account '${safeName}' saved successfully`)
}
