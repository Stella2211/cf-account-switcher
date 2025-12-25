# github:Stella2211/cf-account-switcher

[English](./README.md) | 日本語

Cloudflareアカウント切り替えツール - `wrangler login`を毎回実行することなく、複数のCloudflareアカウントを簡単に切り替えられます。

## 免責事項

このツールは**非公式**であり、Cloudflare社とは一切関係ありません。作者はCloudflare社の社員ではなく、このツールはCloudflare社によって承認、後援、または関連付けられているものではありません。

このツールは、wranglerの設定ファイル（`default.toml`）をコピーして管理するだけの機能を提供します。wranglerやその他のCloudflareソフトウェアの改変・再配布は行っていません。

## インストール

```bash
# bunxを使用（推奨）
bunx github:Stella2211/cf-account-switcher

# npxを使用
npx github:Stella2211/cf-account-switcher

# グローバルインストール
bun add -g github:Stella2211/cf-account-switcher
```

## 使用方法

### 現在のアカウントを保存

まず、wranglerでCloudflareアカウントにログインします：

```bash
wrangler login
```

次に、アカウント設定を保存します：

```bash
cf-account-switcher add personal
```

### アカウントを切り替え

```bash
cf-account-switcher use personal
cf-account-switcher use work
```

### 保存されたアカウント一覧

```bash
cf-account-switcher list
```

### 保存されたアカウントを削除

```bash
cf-account-switcher remove personal
```

## 仕組み

このツールは、wranglerの設定ファイルを `~/.config/stella2211/cf-account-switcher/accounts/` にコピーして管理します。

### wrangler設定ファイルの場所

このツールは複数のパスをチェックし、設定ファイルが存在する最初のパスを使用します：

| OS | レガシーパス | XDG準拠パス |
|----|-------------|-------------------|
| **macOS** | `~/.wrangler/config/` | `~/Library/Preferences/.wrangler/config/` |
| **Windows** | `%USERPROFILE%\.wrangler\config\` | `%AppData%\.wrangler\config\` |
| **Linux** | `~/.wrangler/config/` | `~/.config/.wrangler/config/` |

### 設定ファイル名

- **本番環境（デフォルト）**: `default.toml`
- **ステージング環境**: `staging.toml` (`WRANGLER_API_ENVIRONMENT=staging`が設定されている場合)

## コマンド

| コマンド | 短縮形 | 説明 |
|---------|--------|------|
| `add <name>` | `a` | 現在のwranglerアカウントを指定した名前で保存 |
| `use <name>` | `u` | 保存されたアカウントに切り替え |
| `list` | `ls`, `l` | 保存されたすべてのアカウントを一覧表示 |
| `remove <name>` | `rm`, `r` | 保存されたアカウントを削除 |
| `help` | `h` | ヘルプメッセージを表示 |
| `version` | `v` | バージョン番号を表示 |

## 動作要件

- [Bun](https://bun.sh) >= 1.0.0 または [Node.js](https://nodejs.org) >= 18.0.0
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) がインストールされ、ログイン済みであること

## 開発

### Bunを使用する場合

```bash
# 依存関係のインストール
bun install

# ローカルで実行
bun run src/index.ts

# リント
bun run lint

# tsgoで型チェック
bun run typecheck
```

### npm / Node.jsを使用する場合

```bash
# 依存関係のインストール
npm install

# ローカルで実行
npx tsx src/index.ts

# リント
npm run lint

# tsgoで型チェック
npm run typecheck
```

## ライセンス

MIT
