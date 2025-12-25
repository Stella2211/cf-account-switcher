import { unlinkSync } from "node:fs"
import { accountExists, getAccountConfigPath } from "../config.js"

export function removeAccount(name: string): void {
	if (!name || name.trim() === "") {
		console.error("Error: Account name is required")
		console.error("Usage: cf-account-switcher remove <name>")
		process.exit(1)
	}

	const safeName = name.trim()

	if (!accountExists(safeName)) {
		console.error(`Error: Account '${safeName}' not found`)
		console.error("Use 'cf-account-switcher list' to see available accounts")
		process.exit(1)
	}

	const accountPath = getAccountConfigPath(safeName)
	unlinkSync(accountPath)

	console.log(`Account '${safeName}' removed successfully`)
}
