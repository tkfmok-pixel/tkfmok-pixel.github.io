# 📝 Quartz 1日1回自動更新・同期設定ガイド

Mac miniを「基地局」として、MacBook AirやiPhoneからの更新を1日1回、深夜に自動でWebサイト（Quartz）へ反映させるための全手順です。

---

## STEP 1: スクリプトの作成・修正
Mac mini内にあるシェルスクリプトを、最新の同期フロー（PullしてからPushする）に書き換えます。

### ファイルパスの確認
まず、スクリプトを保存する場所を決めてください（例: `/Users/okamiyatakashi/deploy_quartz.sh`）。

### スクリプトの内容
以下の内容をエディタで開き、中身をまるごと書き換えて保存します。
```
#!/bin/bash
# ---------------------------------------------------------
# Quartz Daily Auto-Sync Script
# ---------------------------------------------------------

# 1. Quartzのリポジトリディレクトリに移動
cd /Users/okamiyatakashi/GitHub/tkfmok-pixel.github.io

# 2. MacBook AirやiPhoneからの変更をGitHubから取り込む
# これによりMac mini側のファイルが最新になります
/usr/bin/git pull origin v4

# 3. 未コミットの変更があればステージングに追加
/usr/bin/git add .

# 4. 変更がある場合のみコミット（日付をメッセージに入れる）
# 変更がない場合にエラーで止まらないよう "|| true" を付与
/usr/bin/git commit -m "Daily auto-update: $(date +'%Y-%m-%d')" || true

# 5. GitHub(v4ブランチ)へPush
# これによりGitHub Actionsが走り、Webサイトが更新されます
/usr/bin/git push origin v4
````
---

## STEP 2: 自動実行の予約 (crontab)
Mac miniのシステムに、上記スクリプトを毎日深夜に実行するよう予約します。

### 設定手順
1. Mac miniの **ターミナル** を開き、以下のコマンドを入力します。
```bash
   crontab -e
```
- キーボードの i を押して入力モードにする。
- 以下の1行を一番下に貼り付ける。
```
02 * * * /bin/bash /Users/okamiyatakashi/deploy_quartz.sh >> /Users/okamiyatakashi/sync_log.log 2>&1
```
(意味: 毎日深夜 02:00 に実行し、結果を sync_log.log に記録する)
- Esc キーを押し、続けて :wq と入力して Enter で保存終了。

STEP 3: 運用ルールの確認

• MBA / iPhone: 好きな時に記事を書いてPush。

• Mac mini: 毎日深夜 02:00 に自動でPull & Pushを実行。

• Webサイト: 毎日深夜 02:05 頃に最新状態へ更新。

動かない時のログ確認コマンド

cat ~/sync_log.log
