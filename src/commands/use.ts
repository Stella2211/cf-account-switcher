import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
	accountExists,
	getAccountConfigPath,
	getWranglerConfigPath,
} from "../config.js"

export function useAccount(name: string): void {
	if (!name || name.trim() === "") {
		console.error("Error: Account name is required")
		console.error("Usage: cf-account-switcher use <name>")
		process.exit(1)
	}

	const safeName = name.trim()

	if (!accountExists(safeName)) {
		console.error(`Error: Account '${safeName}' not found`)
		console.error("Use 'cf-account-switcher list' to see available accounts")
		process.exit(1)
	}

	const accountPath = getAccountConfigPath(safeName)
	const wranglerPath = getWranglerConfigPath()

	const wranglerDir = dirname(wranglerPath)
	mkdirSync(wranglerDir, { recursive: true })

	const configContent = readFileSync(accountPath, "utf-8")
	writeFileSync(wranglerPath, configContent)

	console.log(`Switched to account '${safeName}'`)
}
