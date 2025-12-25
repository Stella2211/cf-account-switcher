import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const CONFIG_DIR_NAME = "stella2211/cf-account-switcher"

export function getAppConfigDir(): string {
	const home = homedir()
	return join(home, ".config", CONFIG_DIR_NAME)
}

export function getAccountsDir(): string {
	return join(getAppConfigDir(), "accounts")
}

export function getAccountConfigPath(accountName: string): string {
	return join(getAccountsDir(), `${accountName}.toml`)
}

function fileExists(path: string): boolean {
	try {
		return existsSync(path) && statSync(path).isFile()
	} catch {
		return false
	}
}

function getAuthConfigFileName(): string {
	// Support WRANGLER_API_ENVIRONMENT for different environments
	const environment = process.env.WRANGLER_API_ENVIRONMENT ?? "production"

	if (environment === "production") {
		return "default.toml"
	}

	return `${environment}.toml`
}

function getWranglerConfigCandidates(): string[] {
	const home = homedir()
	const platform = process.platform
	const fileName = getAuthConfigFileName()

	const legacyConfigDir = join(home, ".wrangler")

	// Wrangler checks legacy path first, then XDG-compliant path
	// We check all possible paths and return the first one that exists

	if (platform === "darwin") {
		return [
			// Legacy path (checked first by wrangler)
			join(legacyConfigDir, "config", fileName),
			// XDG-compliant path: ~/Library/Preferences/.wrangler/config/
			join(home, "Library", "Preferences", ".wrangler", "config", fileName),
		]
	}

	if (platform === "win32") {
		const appData = process.env.APPDATA ?? join(home, "AppData", "Roaming")
		return [
			// Legacy path
			join(legacyConfigDir, "config", fileName),
			// XDG-compliant path: %AppData%\.wrangler\config\
			join(appData, ".wrangler", "config", fileName),
		]
	}

	// Linux
	return [
		// Legacy path
		join(legacyConfigDir, "config", fileName),
		// XDG-compliant path: ~/.config/.wrangler/config/
		join(home, ".config", ".wrangler", "config", fileName),
	]
}

export function getWranglerConfigPath(): string {
	const candidates = getWranglerConfigCandidates()

	// Return the first path where the config file exists
	for (const candidate of candidates) {
		if (fileExists(candidate)) {
			return candidate
		}
	}

	// If no config exists, return the first candidate (legacy path)
	// This is consistent with wrangler's behavior
	return candidates[0] ?? ""
}

export function ensureConfigDirs(): void {
	const accountsDir = getAccountsDir()
	mkdirSync(accountsDir, { recursive: true })
}

export function listSavedAccounts(): string[] {
	const accountsDir = getAccountsDir()

	try {
		const files = readdirSync(accountsDir)
		return files
			.filter((file) => file.endsWith(".toml"))
			.map((file) => file.replace(".toml", ""))
			.sort()
	} catch {
		return []
	}
}

export function accountExists(name: string): boolean {
	const configPath = getAccountConfigPath(name)
	return existsSync(configPath)
}

export function wranglerConfigExists(): boolean {
	const configPath = getWranglerConfigPath()
	return existsSync(configPath)
}
