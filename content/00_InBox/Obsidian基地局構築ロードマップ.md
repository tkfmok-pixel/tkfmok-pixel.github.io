なんとか終わったか…？

https://docs.google.com/presentation/d/1_FnxUZB5jkOj67EDwq39cBk9vTbRSYh2-anKXfLGGnY/edit?usp=sharing
# Obsidian基地局構築ロードマップ：Mac mini (M2) × AIエージェント

## 1. コンセプト
- **Mac mini (M2/8GB):** 24時間稼働の「知の基地局」。AI処理、Git管理、Quartz公開、バックアップを担当。
- **MacBook Air (M5/24GB):** 「思考の最前線」。Tailscale経由でMac miniのVaultを直接マウントし、爆速で執筆・編集を行う。

---

## 2. インフラ構成（ストレージと接続）

### 接続方式
- **ネットワーク:** Tailscaleを活用したSMB接続。
- **編集環境:** MacBook Airから `smb://[Mac-mini-IP]/Vault` をマウントして直接編集する。

### ストレージ階層
1. **内蔵SSD (256GB):** `Hot Data`（Obsidian Vault本体, Quartz環境）。速度優先。
2. **外付けSSD (256GB):** `Warm Data`（AIエージェントのログ、スクリプト、作業用DB）。
3. **外付けHDD (3TB):** `Cold Data`（TimeMachine 2TB / アーカイブ 1TB）。

---

## 3. 運用システム（Git & AI）

### ① Gitによる「安全」と「自動化」
- **目的:** 変更履歴の保存、AIの誤操作からの復旧、Quartzへの自動デプロイ。
- **運用:** `Obsidian Git` プラグインを使用。1時間ごとの自動コミットを設定し、ユーザーはGit操作を意識しない環境を作る。

### ② AIエージェントによる「知的生産性の解放」
Gemini API (Free Tier) を活用し、Mac mini側で以下のバックグラウンド処理を実行する。

1. **Inbox自動交通整理 (Auto-Sorting):**
   - `00_Inbox` フォルダを監視。
   - 新規ノートをGeminiが解析し、内容に応じたフォルダへ自動移動。
2. **夜間自動タグ付け & プロパティ付与:**
   - 未整理のノートに対し、夜間に一括でタグ提案と要約をプロパティに追記。
3. **セレンディピティ・リンク:**
   - 既存ノートとの関連性をAIが見出し、関連ノートへのリンクを提案。

---

## 4. 構築アクションプラン

### Step 1: Git環境の整備（最優先）
- [ ] Mac miniのVaultディレクトリでGitを初期化。
- [ ] Obsidian Gitプラグインの設定（自動プル・自動プッシュ・自動コミット）。
- [ ] GitHubリポジトリと連携し、Quartzへの公開ラインを確定させる。

### Step 2: AIエージェント（整理担当）の導入
- [ ] PythonまたはShellによるフォルダ監視スクリプトの作成。
- [ ] Gemini APIを叩き、フォルダ移動を判断するロジックの実装。
- [ ] 無料枠を使い切らないための「フィルタリング条件（文字数やタグ）」の追加。

### Step 3: 夜間バッチ処理の実装
- [ ] `cron` や `launchd` を使い、深夜にタグ付け・要約を行う仕組みを構築。

---

## 5. メンテナンス・メモ
- **メモリ管理:** 8GBを圧迫しないよう、重い処理（Docker等）は最小限に留め、基本は軽量なスクリプトでGemini APIを叩く。
- **セキュリティ:** Vault内のプライベートな情報をQuartz公開フォルダ（Public）に誤って移動させないよう、AIの移動ルールを厳格化する。
# 実施報告
# 🚀 Obsidian基地局構築プロジェクト：技術実装ログ

## 1. 概要 (Context)

Mac mini (M2/8GB) を常時稼働サーバー（基地局）とし、Obsidianでの思考を「Gitによるバックアップ」と「Quartzによる自動Web公開」に繋げるインフラを構築した。

---

## 2. アーキテクチャ図 (AS-IS & TO-BE)

### ⏹️ AS-IS (開始前)

- Obsidianがただのローカルメモ帳として存在。
    
- 公開やバックアップは手動、あるいは未整備。
    
- デバイス間の同期が不安定。
    

### ✅ TO-BE (現在)

- **自動バックアップ:** Obsidian Gitにより1時間ごとに自動コミット。
    
- **自動公開:** `publish` フォルダへの変更が、Git Hookを通じて即座にQuartzサイトへ反映。
    
- **遠隔アクセス:** TailscaleによりMacBook AirからMac miniのVaultを直接操作。
    

---

## 3. 完了タスクリスト (Task List)

- [x] **Phase 01: 遠隔通信路の確保**
    
    - [x] Tailscaleの導入とMac mini / MacBook Airの接続。
        
    - [x] SMBによるネットワークドライブ化。
        
- [x] **Phase 02: 守りのGit構築**
    
    - [x] Vaultの `git init` と `main` ブランチ設定。
        
    - [x] Obsidian Gitプラグインの導入と自動保存設定。
        
- [x] **Phase 03: 攻めのQuartz自動化**
    
    - [x] デプロイスクリプト `deploy_quartz.sh` の作成。
        
    - [x] Git Hook (`post-commit`) による連動実装。
        
    - [x] フォルダ実体化によるGitHub Pagesの表示復旧。
        

---

## 4. 作業ログ：バグと修正内容 (Troubleshooting)

|現象・バグ|原因|修正内容|
|---|---|---|
|**Pushエラー**|スクリプトが `main` を指定したが、Quartz側が `v4`ブランチだった。|`deploy_quartz.sh` 内のブランチ名を `v4` に修正。|
|**RSS(XML)が表示される**|`index.html` が生成されず、GitHub Pagesが迷子になった。|ブラウザキャッシュのクリアとビルド成否を確認。|
|**404エラー (Page Not Found)**|`content` がシンボリックリンクだったため、GitHub側に実体ファイルが届かなかった。|`rm` でリンクを削除し、`rsync` を使って実体ファイルを同期する方式に変更。|

Google スプレッドシートにエクスポート

---

## 5. 実装済みコード一瞥

### 📜 `~/deploy_quartz.sh`

Bash

```
#!/bin/bash
cd /Users/okamiyatakashi/GitHub/tkfmok-pixel.github.io
rsync -av /Users/okamiyatakashi/Obsidian/ObsidianVault/publish/ ./content/
git add .
git commit -m "Quartz auto-update: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin v4
```

### 📜 `.git/hooks/post-commit`

Bash

```
#!/bin/bash
/Users/okamiyatakashi/deploy_quartz.sh
```

---

## 6. 次のフェーズ (Next Steps)

- [ ] **Phase 04: AIエージェント「Sorting-Hat」の導入**
    
    - `00_Inbox` に入ったメモを Gemini API で解析し、フォルダへ自動仕分けする。
        
    - `publish` フォルダに振り分けられた瞬間に世界へ公開されるフローを確立する。