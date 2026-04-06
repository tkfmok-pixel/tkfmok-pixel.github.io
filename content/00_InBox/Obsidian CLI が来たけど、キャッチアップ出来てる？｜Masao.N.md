![見出し画像](https://assets.st-note.com/production/uploads/images/263885445/rectangle_large_type_2_405b05bda284f1c7b37ad871099a1e64.png?width=1280)

## Obsidian CLI が来たけど、キャッチアップ出来てる？

---

## はじめに

2026年2月、Obsidian公式が CLI をリリースされました。

最初のニュースを見たとき、正直「これ、本当に使えるのか？」と思いました。  
実際に自分の3,100ファイルのVaultで試してみたら——孤立ノート2,201件、未完了タスク4,814件が一瞬で可視化された。  
「なんとなくヤバいと思ってたけど、数字にするとマジでヤバかった」というのが正直な感想です。

この記事では、Obsidian CLI で何ができるのかを **コマンド別のユースケース** で具体的に紹介します。  
特に「AI エージェントに操作させる」という観点を軸に、日本語圏の活用事例も交えて解説していきます。

---

## 課題と背景

Obsidianを「知識財産の中心」に据えようとすると、必ず壁にぶつかります。

- Vaultの中身が見えにくい。
- 孤立したノートがどんどん増える。
- タスクの棚卸しをしようにも、ノートを一枚一枚開いて確認するしかない。
- バッチ処理なんてもってのほか。

GitHub Actions や Claude Code のような自動化パイプラインと接続しようとすると、そのたびに独自スクリプトを書く羽目になるし、エージェントは勝手に書く。

要は、 **Vault が外部から少し触りづらい状態だった** んです。

CLI の登場はそこを変えます。  
ターミナルから直接Vaultを操作できる。スクリプトに組み込める。AI エージェントと接続できる。  
Obsidianという「知識のサイロ」に、初めてパイプが通った感覚です。

XDA Developers の記事はこれを  
「 **"great editor" から "programmable knowledge OS" へのシフト** 」  
と表現しています。まさにそう。

以下のBeforeとAfterを見ると、変化の構造がわかります。

```python
#mermaid-0{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;fill:#1E3A5F;}#mermaid-0 .error-icon{fill:#E8F5E9;}#mermaid-0 .error-text{fill:#170a16;stroke:#170a16;}#mermaid-0 .edge-thickness-normal{stroke-width:2px;}#mermaid-0 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-0 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-0 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-0 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-0 .marker{fill:#A5B4C4;stroke:#A5B4C4;}#mermaid-0 .marker.cross{stroke:#A5B4C4;}#mermaid-0 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;}#mermaid-0 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#1E3A5F;}#mermaid-0 .cluster-label text{fill:#170a16;}#mermaid-0 .cluster-label span,#mermaid-0 p{color:#170a16;}#mermaid-0 .label text,#mermaid-0 span,#mermaid-0 p{fill:#1E3A5F;color:#1E3A5F;}#mermaid-0 .node rect,#mermaid-0 .node circle,#mermaid-0 .node ellipse,#mermaid-0 .node polygon,#mermaid-0 .node path{fill:#DBEAFE;stroke:#93C5FD;stroke-width:1px;}#mermaid-0 .flowchart-label text{text-anchor:middle;}#mermaid-0 .node .label{text-align:center;}#mermaid-0 .node.clickable{cursor:pointer;}#mermaid-0 .arrowheadPath{fill:#0b0b0b;}#mermaid-0 .edgePath .path{stroke:#A5B4C4;stroke-width:2.0px;}#mermaid-0 .flowchart-link{stroke:#A5B4C4;fill:none;}#mermaid-0 .edgeLabel{background-color:#FDE8E0;text-align:center;}#mermaid-0 .edgeLabel rect{opacity:0.5;background-color:#FDE8E0;fill:#FDE8E0;}#mermaid-0 .labelBkg{background-color:rgba(253, 232, 224, 0.5);}#mermaid-0 .cluster rect{fill:#E8F5E9;stroke:hsl(124.6153846154, 0%, 83.5294117647%);stroke-width:1px;}#mermaid-0 .cluster text{fill:#170a16;}#mermaid-0 .cluster span,#mermaid-0 p{color:#170a16;}#mermaid-0 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:#E8F5E9;border:1px solid hsl(124.6153846154, 0%, 83.5294117647%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-0 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#1E3A5F;}#mermaid-0 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}After: CLI + AIエージェントAIが分析・分類CLIで一括取得自動でタグ付け・リンク追加結果をVaultに書き戻すBefore: GUIオンリーノートを1枚ずつ確認Vaultを手動で開くタスク・孤立を目視確認手動で修正
```

---

## 重要ポイント3つ

### 1\. 100以上のコマンドで、Vaultが「操作対象」になった

v1.12.0 で早期アクセス、v1.12.7 で全ユーザーに無料開放。  
対応コマンドは100以上。v1.12.7 で Electron 経由の実行から専用バイナリに置き換えられ、大幅に高速化されています。

構造的には、Git コマンドと同じパターンです。  
人間がGUIで触っていた操作を、全部コマンドに落とし込んだ。  
一度コマンドで書けると、スクリプト化できる。スクリプト化できると、自動化できる。  
この連鎖が今後の使い方を根本から変えます。

### 2\. Vault診断が「一発」でできるようになった

実際に3,100ファイルのVaultで \`orphans\`・\`deadends\`・\`unresolved\`・\`tasks todo\` を走らせた結果がこれです。

- 孤立ノート（被リンクなし）: **2,201件**
- 行き止まりノート（発リンクなし）: **2,454件**
- 未解決リンク: **1,038件**
- 未完了タスク: **4,814件**

全部コマンド一発。合計10秒もかかっていない。

これ、今まで「なんとなく多そう」で放置していた問題を、 **数値で直視させてくれる** んですよ。  
数値にならないと人間は動かない。この可視化機能だけでも、導入する価値があると思います。

### 3\. AIエージェントとの接続が「公式に想定されている」

ここが一番大きい。

Obsidian CEO の kepano（Steph Ango）本人が [obsidian-skills](https://github.com/kepano/obsidian-skills) というリポジトリを公開しています。  
GitHub スター18,600超。MIT ライセンス。

これは Claude Code や Codex CLI などの AI エージェントに「Obsidianの正しい操作方法を教える」スキルファイル集です。  
つまり **公式が「AIエージェントにVaultを操作させること」を前提にしている** 。

従来のプラグインエコシステムとは次元が違う話で、CLI とスキルの組み合わせにより、AI エージェントがVaultに対して自律的に読み書きできる世界が公式にサポートされたわけです。

---

## コマンド別ユースケース：AIエージェントに何をさせるか

ここからが本題です。  
主要コマンドを「AI エージェントに操作させる」観点でカテゴリ別に紹介します。

### ノートの読み書き：\`read\` / \`create\` / \`append\` / \`prepend\`

最も基本的な操作群。AI エージェントがVaultを「読んで」「書く」ための手足になります。

```python
# ノートの内容を読む
obsidian read path="02_Project/my-project.md"

# 新規ノート作成（テンプレート適用付き）
obsidian create name="weekly-report-2026-W14" \
  path="04_Diary/2026" \
  template="weekly-template"

# 既存ノートの末尾に追記
obsidian append path="04_Diary/2026/daily.md" \
  content="## 自動追記\n- arXiv収集完了: 5件"

# ノートの先頭に追記
obsidian prepend path="009_Inbox/today.md" \
  content="> [!info] AIによる自動整理\n> 以下のノートは未分類です"
```

**AIエージェント活用例**:  
エージェントが \`read\` でノート内容を取得 → 内容を分析 → \`append\` で要約やタグ候補を追記。  
この **search → read → append** のパイプラインが、AI エージェントによる RAG（検索拡張生成）の基本パターンになります。

> 参考: [Claude CodeからObsidian CLIを操作する — AIエージェントにナレッジベースを持たせる実践ガイド](https://qiita.com/ProgrammingForEver/items/e78d656b8aac45296709) （Qiita）

---

### 検索：\`search\` / \`search:context\`

Vault全体を横断するテキスト検索。  
AI エージェントの「目」になるコマンドです。

```python
# キーワード検索（ファイルパス + マッチ行を表示）
obsidian search query="Claude Code" limit=10 format=json

# コンテキスト付き検索（前後の行も表示）
obsidian search:context query="プロンプトエンジニアリング" \
  path="03_Prompts" format=json
```

**AIエージェント活用例**:  
ユーザーが「Claude Codeについてまとめて」と指示  
→ エージェントが \`search:context\` で関連ノートを収集  
→ \`summarizer\` エージェントで要約  
→ \`create\` で新規ノートとして書き出す。

[note.com](http://note.com/) の事例では、\`obsidian eval\` コマンドで RSS 配下の記事を取得し、frontmatter のプロパティで最新順にソートする自動化が紹介されています。

> 参考: [Obsidian CLIで情報収集を加速させる](https://note.com/shotovim/n/n050abda074af) （ [note.com](http://note.com/) ）

---

### デイリーノート：\`daily\` / \`daily:append\` / \`daily:read\`

毎日のルーティンを自動化する鍵。AI エージェントが「秘書」として機能する起点です。

```python
# 今日のデイリーノートを開く
obsidian daily

# デイリーノートの内容を読む
obsidian daily:read

# デイリーノートに追記
obsidian daily:append content="## 朝のタスク確認\n- [ ] Inbox整理\n- [ ] arXiv確認\n- [ ] メール返信"

# デイリーノートの先頭に追記
obsidian daily:prepend content="---\n> [!success] 自動生成セクション"
```

**AIエージェント活用例**:  
毎朝、エージェントが以下を自動実行する「モーニングルーティン」を組める。

1. **\`daily:append\` でその日のタスクテンプレートを追記**
2. **\`tasks todo\` で昨日からの持ち越しタスクを取得**
3. **\`search\` で直近の更新ノートを検索**
4. **まとめをデイリーノートに書き込む**

[note.com](http://note.com/) では、Claude Code と Gemini CLI を使って365日分のデイリーノート + 月間 MOC + 年間 MOC を一括生成した事例も報告されています。平日・休日・祝日を自動判定してタスクリストを動的に切り替える仕組みまで実装。

> 参考: [Obsidian日記を完全自動化！365日分のデイリーノートとMOC管理を一瞬で構築した話](https://note.com/persona_1/n/n1efa65b0c1ce) （ [note.com](http://note.com/) ）

---

### タスク管理：\`tasks\` / \`task\`

散らばったタスクを一元管理。AI エージェントによる「棚卸し」が可能に。

```python
# 未完了タスク一覧（ファイル別に詳細表示）
obsidian tasks todo verbose

# 特定フォルダのタスクだけ
obsidian tasks todo path="02_Project"

# 完了タスクの件数
obsidian tasks done total

# タスクのトグル（完了 ↔ 未完了）
obsidian task path="02_Project/ebay.md" line=15 toggle

# JSON形式で取得（プログラム処理向け）
obsidian tasks todo format=json
```

**AIエージェント活用例**:  
エージェントが週次で \`tasks todo format=json\` を実行 → プロジェクト別に集計 → 「期限切れ」「未着手」「持ち越し」を自動分類 → 優先度レポートをデイリーノートに書き込む。

数千件（著者のローカルファイル数）もの膨大な未完了タスクを人間が手で棚卸しするのは現実的じゃない。でも AI に丸投げすれば、分類と優先度付けまで自動でやってくれる。

---

### プロパティ操作：\`property:set\` / \`property:read\` / \`properties\`

frontmatter の読み書き。AI エージェントによるメタデータ管理の基盤。

```cs
# プロパティの読み取り
obsidian property:read name="tags" path="009_Inbox/new-note.md"

# プロパティの設定
obsidian property:set name="tags" value="ai, inbox" path="009_Inbox/new-note.md"
obsidian property:set name="status" value="review" path="02_Project/my-pj.md"

# プロパティの削除
obsidian property:remove name="draft" path="outputs/content/article.md"

# Vault全体のプロパティ集計（出現回数順）
obsidian properties sort=count counts
```

**AIエージェント活用例**:  
\`009\_Inbox/\` の未分類ノートに対して、エージェントが \`read\` で内容を読み → 内容を分析 → \`property:set\` で適切なタグ・ステータスを自動設定。

[note.com](http://note.com/) の事例では、AI にノート内容を解析させて \`tags\`、\`aliases\`、\`status\`、\`project\` などを自動生成するワークフローが紹介されています。

> 参考: [Obsidian CLIの可能性](https://note.com/tripbird/n/ne9ed0c4689a8) （ [note.com](http://note.com/) ）

---

### リンク分析：\`orphans\` / \`deadends\` / \`unresolved\` / \`backlinks\`

知識グラフの「健康状態」を測る。Vault衛生管理の中核コマンド群。

```python
# 孤立ノート（被リンクゼロ）一覧
obsidian orphans

# 行き止まりノート（発リンクゼロ）一覧
obsidian deadends

# 未解決リンク（リンク先が存在しない）
obsidian unresolved counts verbose format=json

# 特定ノートへのバックリンク
obsidian backlinks file="Claude Code" counts format=json

# 特定ノートからのアウトリンク
obsidian links file="Claude Code"
```

**AIエージェント活用例**:  
定期的にエージェントが \`orphans\` と \`unresolved\` を実行 → 「孤立しているが内容が豊富なノート」を特定 → 関連ノートとのリンク候補を提案 → 承認後に \`append\` でリンクを追加。

未解決リンク1,038件に対して、エージェントが「このリンクは \`\[\[ノートA\]\]\` のことでは？」と候補を出してくれるだけで、修復作業が劇的に楽になる。

---

### プラグイン管理：\`plugin:install\` / \`plugin:enable\` / \`plugins\`

複数マシン間でのVault環境統一。開発者のプラグインデバッグにも。

```python
# インストール済みプラグイン一覧
obsidian plugins versions format=json

# 有効なプラグインだけ
obsidian plugins:enabled filter=community

# プラグインのインストール + 有効化
obsidian plugin:install id="dataview" enable

# プラグインの無効化
obsidian plugin:disable id="calendar"

# プラグインのリロード（開発者向け）
obsidian plugin:reload id="my-plugin"
```

**AIエージェント活用例**:  
「新しいマシンにVault環境を複製して」と指示 → エージェントが \`plugins:enabled format=json\` で現環境のプラグインリストを取得 → 新マシンで \`plugin:install\` を順次実行。

---

### 開発者向け：\`eval\` / \`dev:screenshot\` / \`dev:dom\`

JavaScript の直接実行、スクリーンショット、DOM 操作。上級者向けだが強力。

```php
# JavaScriptを実行して結果を取得
obsidian eval code="app.vault.getFiles().length"

# スクリーンショットを保存
obsidian dev:screenshot path="vault-screenshot.png"

# DOM要素のテキスト取得
obsidian dev:dom selector=".workspace-leaf-content" text
```

**AIエージェント活用例**:  
\`eval\` コマンドは CLI の標準コマンドでカバーしきれない操作を補完する。  
たとえば、特定のプラグイン API を叩いてデータを取得したり、Dataview クエリの結果をプログラムから取得したりできる。

事例では、\`obsidian eval\` で RSS プラグイン配下の記事を JavaScript で取得し、プロパティでソートする高度な自動化が実現されています。

---

## 実践者たちの声：日本語圏の活用事例

すでに多くの人が試し始めています。日本語圏の記事をいくつか紹介します。

### 「AIエージェントにナレッジベースを持たせる」

Claude Code から CLI 経由でVaultを操作し、search → read → append のパイプラインで AI エージェントが自律的にナレッジを活用する実践ガイド。  
エージェントが知識を「消費する」だけでなく「生産する」——書き戻すことでVault全体の知識が成長するという考え方が面白い。

> [Claude CodeからObsidian CLIを操作する — AIエージェントにナレッジベースを持たせる実践ガイド](https://qiita.com/ProgrammingForEver/items/e78d656b8aac45296709) （Qiita）

### 「個人ナレッジベースの自動運用」

Claude Code × Obsidian CLI で、個人のナレッジベースを自動運用する実践記録。  
複数の AI エージェント（Claude Code、Codex CLI、Gemini CLI）を使い分けるケースで、Obsidian Vaultを共有ナレッジベースとして使うことでエージェント間の知識共有を実現。

> [Claude Code × Obsidian CLI で個人ナレッジベースを自動運用してみた](https://qiita.com/toki_mwc/items/7eb399986245524919e7) （Qiita）

### 「あいまい検索スキルを作ってみた」

CLI のリリースを受けて、すぐにあいまい検索スキルを Claude Code 用に作成した記録。  
「微妙だった」という正直な結論も含めて、試行錯誤のリアルが参考になる。

> [Obsidian CLIがリリース! とりあえずノートをあいまい検索するskillsを作ってみたが微妙だった話](https://qiita.com/sigma_devsecops/items/f70fa5497ece6a8b8fb7) （Qiita）

### 「CLIを試したら、Claude Codeの異常さに気づいた」

実際に CLI コマンドを手で叩いてみた体験記。  
「CLI のコマンドを覚える手間がある一方、Claude Code がすでに自然言語で同じことをやっていた」という気づきが核心。  
AI 時代の「便利さの基準」が変わっている、という視点が鋭い。

> [ObsidianのCLIを試したら、私には使いこなせなかった。でもその体験が、Claude Codeの"異常さ"を教えてくれた話](https://note.com/gyoii/n/n29922b8453c9) （ [note.com](http://note.com/) ）

### 「全ユーザー無料開放 + Claude Code用スキル導入」

v1.12.7 で全ユーザーに開放された後の実践セットアップガイド。kepano 公式スキルの導入手順も含む。

> [Obsidian CLI が全ユーザーに無料開放されたので Claude Code 用スキルと一緒にセットアップした](https://zenn.dev/kairininja/articles/zenn-obsidian-cli-agent-skills-setup) （Zenn）

### 「公式版 vs コミュニティ版、どちらを選ぶ？」

公式 CLI とコミュニティ製 NotesMD CLI（旧 Obsidian CLI）の比較記事。  
それぞれの特徴・機能・導入方法を整理していて、選定時の判断材料になる。

> [Obsidian CLI入門：公式版とコミュニティ版、どちらを選ぶ？ターミナル自動化の全貌](https://note.com/eiji71/n/nb48f3787d101) （ [note.com](http://note.com/) ）

---

## AIエージェント連携の全体像

ここまでの話を構造的にまとめると、AI エージェント × Obsidian CLI の連携パターンは大きく3つあります。

```python
#mermaid-1{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;fill:#1E3A5F;}#mermaid-1 .error-icon{fill:#E8F5E9;}#mermaid-1 .error-text{fill:#170a16;stroke:#170a16;}#mermaid-1 .edge-thickness-normal{stroke-width:2px;}#mermaid-1 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1 .marker{fill:#A5B4C4;stroke:#A5B4C4;}#mermaid-1 .marker.cross{stroke:#A5B4C4;}#mermaid-1 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;}#mermaid-1 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#1E3A5F;}#mermaid-1 .cluster-label text{fill:#170a16;}#mermaid-1 .cluster-label span,#mermaid-1 p{color:#170a16;}#mermaid-1 .label text,#mermaid-1 span,#mermaid-1 p{fill:#1E3A5F;color:#1E3A5F;}#mermaid-1 .node rect,#mermaid-1 .node circle,#mermaid-1 .node ellipse,#mermaid-1 .node polygon,#mermaid-1 .node path{fill:#DBEAFE;stroke:#93C5FD;stroke-width:1px;}#mermaid-1 .flowchart-label text{text-anchor:middle;}#mermaid-1 .node .label{text-align:center;}#mermaid-1 .node.clickable{cursor:pointer;}#mermaid-1 .arrowheadPath{fill:#0b0b0b;}#mermaid-1 .edgePath .path{stroke:#A5B4C4;stroke-width:2.0px;}#mermaid-1 .flowchart-link{stroke:#A5B4C4;fill:none;}#mermaid-1 .edgeLabel{background-color:#FDE8E0;text-align:center;}#mermaid-1 .edgeLabel rect{opacity:0.5;background-color:#FDE8E0;fill:#FDE8E0;}#mermaid-1 .labelBkg{background-color:rgba(253, 232, 224, 0.5);}#mermaid-1 .cluster rect{fill:#E8F5E9;stroke:hsl(124.6153846154, 0%, 83.5294117647%);stroke-width:1px;}#mermaid-1 .cluster text{fill:#170a16;}#mermaid-1 .cluster span,#mermaid-1 p{color:#170a16;}#mermaid-1 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:#E8F5E9;border:1px solid hsl(124.6153846154, 0%, 83.5294117647%);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#1E3A5F;}#mermaid-1 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}パターン3: スキルファイルSKILL.mdAI Agentkepano/obsidian-skillsVaultパターン2: プラグインでエージェント埋込Agent Client PluginClaude Code / Gemini CLIVaultパターン1: エージェントからCLIBash経由obsidian search/read/appendClaude CodeVault
```

1. **CLI経由** （エージェント → Vault）: バッチ処理・スクリプト組み込みに強い。定期実行や大量操作向き
2. **プラグイン** （Vault → エージェント）: GUI 内で対話的に使える。リアルタイム質問応答向き
3. **スキルファイル** （知識注入）: エージェントにObsidianの作法を教える。出力品質の向上

実際のところ、 **3つを組み合わせる** のが最も効果的です。

kepano のスキルファイルでエージェントに作法を教え、CLI 経由でバッチ操作を自動化し、プラグインで対話的にやり取りする。この3層構造が2026年時点での最適解だと思います。

> 参考: [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) （GitHub — 13.9k+ Stars）

---

## この先の読み方ガイド

ここからは実践編です。

「とりあえず自分のVaultで試してみたい」という人は次の「現場に持ち込むなら」へ。  
他の手法と比べて位置づけを整理したい人は「他の手法との比較」へ。  
制約を先に把握したい慎重派は「導入時の注意点」から読んでください。

---

## 現場に持ち込むなら

これを現場に入れるなら、 **まずVault診断1本だけ走らせる** ところから始めるのが正解です。

```python
obsidian orphans total
obsidian deadends total
obsidian unresolved total
obsidian tasks todo total
```

この4行で、自分のVaultの「健康診断結果」が数値で出てくる。  
ここから始めないと、何を自動化するかも決まらない。

構造的には、Git に \`git status\` があるのと同じ発想です。  
状態を見える化することが、全ての出発点。

### ステップ1: 診断（5分）

上記のコマンドを実行して、現状を把握する。

### ステップ2: デイリーノート自動化（15分）

```python
# 朝のルーティンスクリプト
obsidian daily
obsidian daily:append content="## 今日のタスク"
obsidian daily:append content="$(obsidian tasks todo path='02_Project' total) 件の未完了タスクあり"
```

### ステップ3: AIエージェント連携（30分）

kepano/obsidian-skills を \`.claude/\` に配置し、Claude Code から \`obsidian\` コマンドを使えるようにする。

```ruby
# kepano スキルのインストール
npx skills add git@github.com:kepano/obsidian-skills.git
```

これで Claude Code が Obsidian の \`\[\[wikilink\]\]\` 記法、callout、frontmatter を正しく扱えるようになります。

たぶん最初に詰まるのは frontmatter の一括操作です。  
\`property:set\` は1ノートずつの処理なので、大量のノートに対してバッチで書き換えようとすると逐次実行で遅い。  
大量処理は直接ファイル操作と組み合わせるか、割り切りが必要です。

---

## あなたのAIエージェントにこのまま渡せるプロンプト

ここまで読んで「やってみたい」と思った方へ。

以下のプロンプトを、あなたが使っている **AIエージェントにそのまま渡す** だけで、あなたの環境を分析し、Obsidian CLI で何ができるか・何から始めるべきかを具体的に提案してくれます。

対応するAIエージェントの例:

- Claude Code / Claude Desktop（Anthropic）
- Codex CLI（OpenAI）
- Gemini CLI（Google）
- Antigravity
- ChatGPT（Web / API）
- その他、ファイル読み込みが可能なAIエージェント全般

スクリプトを書かせるのではなく、 **あなた専用の導入プランをAIエージェントに作らせる** のがこのプロンプトの目的です。

---

### 事前準備: Vaultフォルダをエージェントに渡す

このプロンプトの効果を最大化するには、 **AIやAIエージェントがあなたのVaultのファイル・フォルダ構造を読める状態** にしてから実行してください。

エージェントが実際のVault構造を把握していると、「あなたの \`009\_Inbox/\` には未分類ノートが200件ある」「\`02\_Project/\` のタスクが滞留している」といった **具体的で的を射た提案** が返ってきます。  
逆に、環境情報だけだと一般的なアドバイスに留まりがちです。

**環境情報セクションを埋める  
環境情報セクション** は、フォルダ連携ができない場合（ChatGPT Web版など）のフォールバックです。  
\`{{変数}}\` を埋めるだけで、エージェントがあなたの環境に特化した提案を返してくれる。  
「Windows で3,000ファイルのVaultを Claude Code と使っている人」と「macOS で200ファイルの日記Vaultを Antigravity で使っている人」では、当然やるべきことが違う。その差分をAIエージェントに判断させるのがポイントです。

---

### プロンプト本文

```php
あなたはObsidian CLIとAIエージェント連携に精通したナレッジマネジメントの専門家です。

以下の参考記事の内容と、私の環境情報をもとに提案をしてください。
※ 私のVaultフォルダにアクセスできる場合は、実際のフォルダ構成・ファイル数・ノート内容も参照して、より具体的な提案を出してください。

## 参考記事

Obsidian v1.12.7 で全ユーザーに無料開放された公式CLIの解説記事です。
100以上のコマンドでターミナルからVaultを操作でき、AIエージェントとの連携が公式に想定されています。

詳細はこちら: {{この記事のURL、またはこの記事全文を貼り付け}}

## 私の環境

- OS: {{Windows / macOS / Linux}}
- Obsidianバージョン: {{obsidian version の結果}}
- Vaultの用途: {{個人メモ / 業務ナレッジ / 技術ドキュメント / 日記 / プロジェクト管理 / その他}}
- Vault内のファイル数: {{おおよその数、または obsidian files total の結果}}
- 現在使っているAIエージェント: {{Claude Code / Codex CLI / Antigravity / Gemini CLI / ChatGPT / 使っていない / その他}}
- Obsidian CLIの導入状況: {{未導入 / 導入済み・未活用 / 活用中}}
- Vaultフォルダへのアクセス: {{エージェントからアクセス可能 / 不可（環境情報のみで判断してください）}}

## 依頼内容

上記の情報をもとに、以下の3つを提案してください。

### 1. 私の環境で何ができるか（複数観点で提案）

以下の観点から、私の環境に合った活用方法を3〜5個提案してください。

- 日常の効率化（デイリーノート、タスク管理、Inbox整理）
- Vault品質の可視化（孤立ノート、未解決リンク、タグの整理）
- AIエージェント連携（自動要約、自動分類、ナレッジ生成）
- チーム・複数環境（プラグイン統一、Headless Sync）
- 開発・高度な自動化（eval、スクリプト連携、定期実行）

各提案には「具体的に使うCLIコマンド」と「期待される効果」を含めてください。
Vaultフォルダを参照できる場合は、実際のフォルダ名・ファイル数・タグ状況を使って提案してください。

### 2. 導入ステップ（順番と所要時間の目安）

未導入の場合はセットアップから、導入済みの場合は活用開始から、
ステップバイステップで示してください。各ステップに所要時間の目安を付けてください。

### 3. 私が用意するもの + オススメ実装の提案

- 私が事前に準備・確認すべきもの（ソフトウェア、設定、ライセンス等）
- 最初に実装すべきオススメの自動化（1つに絞って具体的に）
- そのオススメ実装の具体的なコマンドまたはスクリプト

## 出力形式

日本語で、見出し付きの構造化された形式で出力してください。
```

---

### プロンプトの読み解き

このプロンプトは「スクリプトを生成させる」のではなく、 **あなた専用のコンサルティングをAIエージェントにさせる** 設計になっています。

**Vaultフォルダの連携が最大のポイント** です。  
Claude Code や Codex CLI のようなAIエージェントは、ワーキングディレクトリのファイルを直接読み書きできます。  
  
Vaultフォルダをエージェントに渡した状態でこのプロンプトを実行すると、エージェントが \`obsidian files total\` や \`obsidian orphans\` を自分で叩いて現状を把握し、 **あなたのVaultの実態に即した提案** を返してくれる。  
  
「一般的なベストプラクティス」ではなく「あなたの \`009\_Inbox/\` に溜まった未分類ノートをこう整理しよう」という具体的な提案が出てくるのは、フォルダ連携があってこそです。

**3つの依頼構造** （何ができるか → 導入ステップ → 用意するもの + オススメ実装）は、「知る → 準備する → やる」の順番に対応しています。  
AIエージェントの出力をそのまま上から実行していけば、Obsidian CLI が動き出す状態になります。

**注意**: \`{{変数}}\` の部分はご自身の状況に置き換えてお使いください。記事URLの代わりに記事全文を貼り付けても動作します。

---

## 他の手法との比較

Vault外部操作のアプローチは、以前からいくつかありました。

サードパーティ製の非公式ツール（\`obsidian-export\` 等）は、ファイルのエクスポートや変換には使えても、Vault内への書き戻しや frontmatter 操作は弱かった。  
公式 API（Obsidian Local REST API プラグイン）は読み書き両方できますが、REST 経由なので設定が一手間。

コミュニティ製の NotesMD CLI（旧 Obsidian CLI）もありますが、公式 CLI のリリースに伴い名称変更されています。

```python
#mermaid-2{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;fill:#1E3A5F;}#mermaid-2 .error-icon{fill:#E8F5E9;}#mermaid-2 .error-text{fill:#170a16;stroke:#170a16;}#mermaid-2 .edge-thickness-normal{stroke-width:2px;}#mermaid-2 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-2 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-2 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-2 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-2 .marker{fill:#A5B4C4;stroke:#A5B4C4;}#mermaid-2 .marker.cross{stroke:#A5B4C4;}#mermaid-2 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:20px;}#mermaid-2 .edge{stroke-width:3;}#mermaid-2 .section--1 rect,#mermaid-2 .section--1 path,#mermaid-2 .section--1 circle,#mermaid-2 .section--1 polygon,#mermaid-2 .section--1 path{fill:hsl(214.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section--1 text{fill:#1E3A5F;}#mermaid-2 .node-icon--1{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge--1{stroke:hsl(214.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth--1{stroke-width:17;}#mermaid-2 .section--1 line{stroke:rgb(160.0540540541, 93.3648648649, 4.4459459459);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-0 rect,#mermaid-2 .section-0 path,#mermaid-2 .section-0 circle,#mermaid-2 .section-0 polygon,#mermaid-2 .section-0 path{fill:hsl(16.5517241379, 87.8787878788%, 68.5294117647%);}#mermaid-2 .section-0 text{fill:#1E3A5F;}#mermaid-2 .node-icon-0{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-0{stroke:hsl(16.5517241379, 87.8787878788%, 68.5294117647%);}#mermaid-2 .edge-depth-0{stroke-width:14;}#mermaid-2 .section-0 line{stroke:rgb(9.7272727273, 111.8636363637, 150.7727272728);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-1 rect,#mermaid-2 .section-1 path,#mermaid-2 .section-1 circle,#mermaid-2 .section-1 polygon,#mermaid-2 .section-1 path{fill:hsl(124.6153846154, 39.3939393939%, 68.5294117647%);}#mermaid-2 .section-1 text{fill:#1E3A5F;}#mermaid-2 .node-icon-1{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-1{stroke:hsl(124.6153846154, 39.3939393939%, 68.5294117647%);}#mermaid-2 .edge-depth-1{stroke-width:11;}#mermaid-2 .section-1 line{stroke:rgb(111.8636363636, 48.6363636364, 107);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-2 rect,#mermaid-2 .section-2 path,#mermaid-2 .section-2 circle,#mermaid-2 .section-2 polygon,#mermaid-2 .section-2 path{fill:hsl(244.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-2 text{fill:#1E3A5F;}#mermaid-2 .node-icon-2{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-2{stroke:hsl(244.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-2{stroke-width:8;}#mermaid-2 .section-2 line{stroke:rgb(148.9391891893, 160.0540540541, 4.4459459459);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-3 rect,#mermaid-2 .section-3 path,#mermaid-2 .section-3 circle,#mermaid-2 .section-3 polygon,#mermaid-2 .section-3 path{fill:hsl(274.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-3 text{fill:#1E3A5F;}#mermaid-2 .node-icon-3{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-3{stroke:hsl(274.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-3{stroke-width:5;}#mermaid-2 .section-3 line{stroke:rgb(71.1351351352, 160.0540540541, 4.4459459459);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-4 rect,#mermaid-2 .section-4 path,#mermaid-2 .section-4 circle,#mermaid-2 .section-4 polygon,#mermaid-2 .section-4 path{fill:hsl(304.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-4 text{fill:#1E3A5F;}#mermaid-2 .node-icon-4{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-4{stroke:hsl(304.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-4{stroke-width:2;}#mermaid-2 .section-4 line{stroke:rgb(4.4459459459, 160.0540540541, 15.5608108108);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-5 rect,#mermaid-2 .section-5 path,#mermaid-2 .section-5 circle,#mermaid-2 .section-5 polygon,#mermaid-2 .section-5 path{fill:hsl(334.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-5 text{fill:#1E3A5F;}#mermaid-2 .node-icon-5{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-5{stroke:hsl(334.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-5{stroke-width:-1;}#mermaid-2 .section-5 line{stroke:rgb(4.4459459459, 160.0540540541, 93.3648648649);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-6 rect,#mermaid-2 .section-6 path,#mermaid-2 .section-6 circle,#mermaid-2 .section-6 polygon,#mermaid-2 .section-6 path{fill:hsl(4.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-6 text{fill:#1E3A5F;}#mermaid-2 .node-icon-6{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-6{stroke:hsl(4.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-6{stroke-width:-4;}#mermaid-2 .section-6 line{stroke:rgb(4.4459459459, 148.9391891893, 160.0540540541);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-7 rect,#mermaid-2 .section-7 path,#mermaid-2 .section-7 circle,#mermaid-2 .section-7 polygon,#mermaid-2 .section-7 path{fill:hsl(64.2857142857, 94.5945945946%, 75%);}#mermaid-2 .section-7 text{fill:#1E3A5F;}#mermaid-2 .node-icon-7{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-7{stroke:hsl(64.2857142857, 94.5945945946%, 75%);}#mermaid-2 .edge-depth-7{stroke-width:-7;}#mermaid-2 .section-7 line{stroke:rgb(12.0608108108, 3.4459459459, 124.0540540541);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-8 rect,#mermaid-2 .section-8 path,#mermaid-2 .section-8 circle,#mermaid-2 .section-8 polygon,#mermaid-2 .section-8 path{fill:hsl(124.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-8 text{fill:#1E3A5F;}#mermaid-2 .node-icon-8{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-8{stroke:hsl(124.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-8{stroke-width:-10;}#mermaid-2 .section-8 line{stroke:rgb(160.0540540541, 4.4459459459, 148.9391891893);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-9 rect,#mermaid-2 .section-9 path,#mermaid-2 .section-9 circle,#mermaid-2 .section-9 polygon,#mermaid-2 .section-9 path{fill:hsl(154.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-9 text{fill:#1E3A5F;}#mermaid-2 .node-icon-9{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-9{stroke:hsl(154.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-9{stroke-width:-13;}#mermaid-2 .section-9 line{stroke:rgb(160.0540540541, 4.4459459459, 71.1351351352);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-10 rect,#mermaid-2 .section-10 path,#mermaid-2 .section-10 circle,#mermaid-2 .section-10 polygon,#mermaid-2 .section-10 path{fill:hsl(184.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-10 text{fill:#1E3A5F;}#mermaid-2 .node-icon-10{font-size:40px;color:#1E3A5F;}#mermaid-2 .section-edge-10{stroke:hsl(184.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .edge-depth-10{stroke-width:-16;}#mermaid-2 .section-10 line{stroke:rgb(160.0540540541, 15.5608108108, 4.4459459459);stroke-width:3;}#mermaid-2 .disabled,#mermaid-2 .disabled circle,#mermaid-2 .disabled text{fill:lightgray;}#mermaid-2 .disabled text{fill:#efefef;}#mermaid-2 .section-root rect,#mermaid-2 .section-root path,#mermaid-2 .section-root circle,#mermaid-2 .section-root polygon{fill:hsl(214.2857142857, 94.5945945946%, 67.7450980392%);}#mermaid-2 .section-root text{fill:#1E3A5F;}#mermaid-2 .icon-container{height:100%;display:flex;justify-content:center;align-items:center;}#mermaid-2 .edge{fill:none;}#mermaid-2 .mindmap-node-label{dy:1em;alignment-baseline:middle;text-anchor:middle;dominant-baseline:middle;text-align:center;}#mermaid-2 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}Vault外部操作公式CLI100以上のコマンド公式サポート・高速バイナリTUIモードHeadless SyncAIスキル公式対応Local REST API読み書き双方向REST経由プラグイン設定が必要リアルタイム連携向きNotesMD CLIコミュニティ製Obsidian起動不要機能は限定的直接ファイル操作最速・制約なしObsidian機能は使えないリンク解決なし
```

今回の公式 CLI が違うのは、 **公式サポートであること** 、 **コマンド体系が100以上あること** 、 **AIスキルが公式に提供されていること** の3点です。  
非公式ツールはObsidianのバージョンアップで壊れるリスクが常にある。その不安がなくなる。

ただし、Local REST API は外部アプリとのリアルタイム連携に向いています。  
直接ファイル操作は大量処理で最速。  
用途に応じて使い分けるのが現実的です。

---

## 導入時の注意点

### Obsidianアプリの起動が必須

**起動していないと動きません** 。デスクトップ専用で、サーバー上での単独実行はできない（Headless Sync は例外）。

ただし、CLI コマンドを実行した際にアプリが起動していなければ自動起動する仕組みがあります。  
初回コマンドだけ起動待ちが入る点に注意。

### CI/CDパイプラインとの制約

GitHub Actions から直接叩くのは難しい。  
ローカルマシン上でObsidianを起動した状態でのみ実行可能と割り切る必要があります。  
cron で定期実行する場合も、Obsidianが起動していることが前提。

### 大量処理の遅さ

1ファイルずつの逐次実行なので、数千ノートへの一括 frontmatter 更新などは時間がかかる。  
大量処理は直接ファイル操作と CLI を組み合わせるハイブリッドが現実的。

### Windows最大のハマりポイント

**管理者権限での起動は IPC 通信を無言で壊します** 。

エラーメッセージが出ない。ただ「何も表示されない」。  
これがWindows環境での最大の罠です。

Zenn のセットアップガイドでは「最大のハードルは間違いなく管理者権限の罠」と明記されています。

> 参考: [Obsidian CLI セットアップ完全ガイド ── Windows環境でハマった全記録](https://zenn.dev/sora_biz/articles/obsidian-cli-setup-guide) （Zenn）

---

## まとめ

まず1つだけやるとすれば、\`obsidian orphans total\` を打って、自分のVaultの孤立ノート数を見てみることです。

その数字を見た瞬間に、次にやることが見えてきます。

そこから自動化のスコープを決めていけばいい。  
AI エージェントとの連携は、「Vaultの今の状態を知る」ところから始まります。

Obsidianが「エディタ」から「プログラマブルな知識OS」に変わった。  
CLI はその入口です。

---

## おわりに

最後まで読んでいただき、ありがとうございます。

プロンプトを試してみた結果、「こう変えたらもっとうまく動いた」「Windows環境でこういうハマり方をした」みたいな話があれば、ぜひコメントや X で教えてください。  
うまくいかなくても全然OKです。その「ここが微妙だった」の情報が一番ありがたい。

---

### 参考リンク集

**公式**

- [Obsidian CLI 公式ページ](https://obsidian.md/cli)
- [Obsidian CLI 公式ヘルプ](https://help.obsidian.md/cli)
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — 公式AIエージェントスキル集（GitHub 13.9k+ Stars）

**セットアップ**

- [Obsidian CLI セットアップ完全ガイド](https://zenn.dev/sora_biz/articles/obsidian-cli-setup-guide) （Zenn — Windows環境のハマりポイント詳細）
- [Obsidian CLI 全ユーザー無料開放 + Claude Codeスキル導入](https://zenn.dev/kairininja/articles/zenn-obsidian-cli-agent-skills-setup) （Zenn）

**活用事例**

- [Claude CodeからObsidian CLIを操作する — AIエージェントにナレッジベースを持たせる実践ガイド](https://qiita.com/ProgrammingForEver/items/e78d656b8aac45296709) （Qiita）
- [Claude Code × Obsidian CLI で個人ナレッジベースを自動運用してみた](https://qiita.com/toki_mwc/items/7eb399986245524919e7) （Qiita）
- [Obsidian CLIがリリース! あいまい検索スキルを作ってみた話](https://qiita.com/sigma_devsecops/items/f70fa5497ece6a8b8fb7) （Qiita）
- [Obsidian CLIで情報収集を加速させる](https://note.com/shotovim/n/n050abda074af) （ [note.com](http://note.com/) ）
- [Obsidian CLIの可能性](https://note.com/tripbird/n/ne9ed0c4689a8) （ [note.com](http://note.com/) ）
- [ObsidianのCLIを試したら、Claude Codeの"異常さ"を教えてくれた話](https://note.com/gyoii/n/n29922b8453c9) （ [note.com](http://note.com/) ）
- [Obsidian CLI入門：公式版とコミュニティ版の比較](https://note.com/eiji71/n/nb48f3787d101) （ [note.com](http://note.com/) ）
- [Obsidian日記を完全自動化！365日分のデイリーノートとMOC管理](https://note.com/persona_1/n/n1efa65b0c1ce) （ [note.com](http://note.com/) ）
- [Obsidian CLI is the new best way to automate your notes](https://www.xda-developers.com/obsidian-cli-is-the-new-best-way-to-automate-your-notes/) （XDA Developers）

---

対象バージョン：Obsidian v1.12.7