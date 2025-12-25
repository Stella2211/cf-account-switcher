import { listSavedAccounts } from "../config.js"

export function listAccounts(): void {
	const accounts = listSavedAccounts()

	if (accounts.length === 0) {
		console.log("No saved accounts found")
		console.log("Use 'cf-account-switcher add <name>' to save an account")
		return
	}

	console.log("Saved accounts:")
	for (const account of accounts) {
		console.log(`  - ${account}`)
	}
}
