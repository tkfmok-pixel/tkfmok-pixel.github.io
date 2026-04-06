[@ProgrammingForEver(TW. Jpn)](https://qiita.com/ProgrammingForEver)

15

投稿日

## はじめに

2026年2月、Obsidianに公式CLI機能が搭載されました。

「Markdownエディターにコマンドラインインターフェースが必要なのか？」——多くの人がそう感じたかもしれません。しかし、この機能の本当の意味を理解するには、視点を変える必要があります。Obsidian CLIを使うのは人間ではなく、 **AIエージェント** です。

Claude CodeやCodex CLIといったAIコーディングエージェントは、ターミナル上で動作します。彼らはファイルを読み書きし、コマンドを実行し、コードを生成します。しかし、セッションが終わるたびにコンテキストは失われます。前回何を調べたのか、どんな判断をしたのか、次に何をすべきなのか——すべてが消えてしまいます。

Obsidian CLIは、この問題に対する解決策を提供します。AIエージェントがターミナルからObsidian Vaultに直接アクセスし、ノートを検索し、知識を読み出し、学んだことを書き戻す。Vaultが「AIの外部記憶」として機能するのです。

この記事では、Obsidian CLIのセットアップから、Claude Codeのスキルとして定義して実際に活用するまでの手順を解説します。読み終わるころには、あなたのAIエージェントがObsidian Vaultという「脳」を持つようになっているはずです。

なおClaude CodeとObsidianの連携方法としてMCP：obsidian-claude-code-mcpを利用する方法もありますが、MCP利用はトークンを多く消費し速度上の問題もあることから、シンプルにスキルを活用する方法を説明しています。

## Obsidian CLIの背景

### リリースの経緯

Obsidian CLIは、2026年2月10日にリリースされたObsidian v1.12でEarly Access機能として公開されました。その後、2月27日のv1.12.4アップデートで全ユーザーに無料で開放されています。

追加のインストールは不要です。Obsidian本体に内蔵されており、設定をONにするだけで使えます。

### なぜCLIが必要だったのか

Obsidianの設計思想は一貫しています。「データはローカルのMarkdownファイルである」——この原則のもと、プラグインエコシステムが発展してきました。しかし、GUIアプリケーションである以上、プログラムからの操作にはAPIが必要です。

この需要に最初に応えたのはコミュニティでした。 `notesmd-cli` というサードパーティ製CLIツールが登場し、爆発的な普及を見せました。AIエージェントとの連携ユースケースが急増する中、Obsidian開発チームは公式CLIの提供を決断します。

公式CLIの設計コンセプトはシンプルです。

> **GUIでできることは、すべてコマンドラインからもできる**

ノートの作成・読み取り・検索・タスク管理・タグ操作・プロパティ編集——Obsidianの全機能がターミナルから利用可能になりました。

### アーキテクチャ

Obsidian CLIは、スタンドアロンのツールではありません。起動中のObsidianアプリケーションと通信して動作するクライアント・サーバー型のアーキテクチャを採用しています。

この設計には重要な意味があります。CLIはObsidianのプラグインシステムを経由してVaultにアクセスするため、DataviewやTemplaterなどのプラグインとも連携可能です。直接ファイルを読み書きするのではなく、Obsidianの機能をフルに活用できるわけです。

ただし、 **Obsidianアプリが起動していないとCLIは動作しません** 。これは制約であると同時に、データの整合性を保証する仕組みでもあります。

## セットアップ手順（macOS）

### 前提条件

- **Obsidian v1.12.4以上** がインストールされていること
- Obsidianアプリが **起動中** であること（CLIはアプリと通信して動作します）

v1.12.4より前のバージョンをお使いの場合は、 [公式サイト](https://obsidian.md/download) から最新版をダウンロードしてください。

### CLIの有効化

Obsidianを開き、以下の手順でCLIを有効化します。

1. **Settings** を開く
2. **General** タブを選択
3. **Command line interface** セクションを見つける
4. **「Register CLI」** をクリック

これだけでCLIが有効になります。ターミナルを開いて `obsidian version` と入力してみてください。

### PATHの設定

環境によっては、Register CLIの自動登録がうまく機能しないケースがあります。 `command not found` と表示される場合は、手動でPATHを設定します。

**bashユーザーの場合：**

```bash
echo 'export PATH="$PATH:/Applications/Obsidian.app/Contents/MacOS"' >> ~/.bash_profile
source ~/.bash_profile
```

**zshユーザーの場合：**

```bash
echo 'export PATH="$PATH:/Applications/Obsidian.app/Contents/MacOS"' >> ~/.zprofile
source ~/.zprofile
```

### 動作確認

```bash
obsidian version
# → 1.12.4 (installer 1.12.4)
```

バージョン番号が表示されれば、セットアップ完了です。

### よくあるトラブル

| 症状 | 原因 | 対処 |
| --- | --- | --- |
| `command not found` | PATHが未設定 | 上記のPATH設定手順を実施 |
| インストーラーが古い警告 | .dmgから再インストールが必要 | [obsidian.md/download](https://obsidian.md/download) から最新版を取得 |
| Windowsで無言で失敗 | 管理者権限で実行している | 通常ユーザー権限のターミナルで実行 |

## TUIモードの使い方

Obsidian CLIには2つの使い方があります。

1. **コマンドモード** ： `obsidian <command>` で直接コマンドを実行
2. **TUIモード** ： `obsidian` （引数なし）で対話的なシェルを起動

TUIモードでは、まずVaultを選択し、その後 `[> ]` プロンプトにコマンドを入力していきます。

```text
$ obsidian
? Select a vault: ******
[> ] files
```

注意すべき点は、これはファイルブラウザではなくコマンドシェルだということです。ディレクトリを移動する操作はなく、すべてコマンドベースで操作します。

よく使うコマンド例：

```bash
[> ] files                           # ファイル一覧を表示
[> ] search query="Claude Code"      # キーワード検索
[> ] daily                           # 今日のデイリーノートを開く
[> ] tasks todo                      # 未完了タスクを一覧
[> ] tags counts sort=count          # タグを使用回数順に表示
```

TUIモードは人間が対話的に使う場面で便利ですが、AIエージェント連携ではコマンドモードを使います。次章でその設定方法を解説します。

## Claude Code スキルの設定

### スキルファイルの配置

Claude Codeでは、「スキル」と呼ばれる定義ファイルをプロジェクトに配置することで、エージェントに特定の能力を与えることができます。Obsidian CLIのスキルを作成し、エージェントがVaultを操作できるようにしましょう。

スキルファイルは以下のパスに配置します。

```text
.agent/skills/obsidian_cli/SKILL.md
```

### 主要コマンド一覧

スキルファイルに定義する主要コマンドを紹介します。

#### ノート操作

基本となる3つの操作——作成・読み取り・追記です。

```bash
# ノートを作成
obsidian create name="ノート名" content="# 見出し\n\n本文"

# ノートを読む
obsidian read file="ノート名"

# ノートに追記
obsidian append file="ノート名" content="追記内容"
```

`file=` にはWikilink方式の名前を指定します。拡張子は不要で、 `file="議事録/2026-03-03"` のようにフォルダパスも使えます。

#### デイリーノート

Obsidianのデイリーノート機能をCLIから操作できます。AIエージェントの自動ログ記録で最も活用するコマンド群です。

```bash
obsidian daily                        # 今日のデイリーノートを開く
obsidian daily:read                   # デイリーノートの内容を読む
obsidian daily:append content="メモ"  # デイリーノートに追記
obsidian daily:prepend content="メモ" # デイリーノートの先頭に追記
obsidian daily:path                   # デイリーノートのパスを取得
```

#### 検索

Vault内のノートを横断的に検索します。AIエージェントが過去の知識を引き出す際に使用します。

```bash
# キーワード検索
obsidian search query="キーワード"

# 前後の文脈付きで検索（コンテキストが分かりやすい）
obsidian search:context query="キーワード"

# 特定フォルダに限定して検索
obsidian search query="キーワード" path="Projects"
```

#### タスク・タグ管理

```bash
obsidian tasks todo                   # 未完了タスク一覧
obsidian tasks done                   # 完了タスク一覧
obsidian tags                         # タグ一覧
obsidian tags counts sort=count       # タグを使用回数でソート
obsidian backlinks file="ノート名"    # 被リンク（バックリンク）一覧
```

#### 出力フォーマット

多くのコマンドで `format=json` を指定すると、JSON形式で出力できます。AIエージェントがプログラム的に処理する場合に便利です。

```bash
obsidian search query="AI" format=json
obsidian tasks todo format=json
obsidian tags counts format=json
```

### CLAUDE.mdへの記述例

スキルファイルを配置したら、プロジェクトの `CLAUDE.md` （または `AGENTS.md` ）に以下のようなルールを追記しておくと、エージェントが自律的にObsidian CLIを使うようになります。

```markdown
## Obsidian CLI
Vaultへのアクセスには必ずObsidian CLIを使用すること。
直接ファイルを読み書きしない。
Vault名: *******
```

ポイントは「直接ファイルを読み書きしない」というルールです。AIエージェントはファイルシステムに直接アクセスする能力を持っていますが、Obsidian CLIを経由させることで、プラグインとの連携やメタデータの整合性が保たれます。

### スキルファイル全文

以下が実際に使用しているObsidian CLIスキルの全文です。そのままコピーして `.agent/skills/obsidian_cli/SKILL.md` に保存してください。Vault名は環境に合わせて変更してください。

SKILL.md（クリックで展開）

## \`\`\`markdown

## name: obsidian\_cli description: Obsidian CLI経由でノート操作を行うスキル

## Obsidian CLI スキル

## 概要

Obsidian v1.12.4以上に内蔵されたCLI機能を使い、ターミナルからVault内のノートを操作する。

## 前提条件

- Obsidian v1.12.4以上がインストール済み
- Obsidianアプリが起動中であること（CLIはアプリと通信して動作する）

## 実行コマンド

/Applications/Obsidian.app/Contents/MacOS/obsidian \[options\]

## 環境情報

- Vault名: `*******`
- 複数Vaultがある場合は `vault=<name>` オプションで指定

## 共通ルール

- `file=<name>` はWikilink方式の名前解決（拡張子不要）
- `path=<path>` は正確なパス指定（folder/note.md）
- スペースを含む値はクォートで囲む: `name="My Note"`
- 改行は `\n` 、タブは `\t` で表現
- file/path を省略すると現在アクティブなファイルが対象

## よく使うコマンド

### ノート作成

obsidian create name="ノート名" content="# 見出し\\n\\n本文" open

- `template=<name>`: テンプレートを使用
- `overwrite`: 既存ファイルを上書き
- `open`: 作成後にObsidianで開く
- `newtab`: 新しいタブで開く

### ノート読み取り

obsidian read file="ノート名"  
obsidian read path="folder/note.md"

### ノートに追記

obsidian append file="ノート名" content="追記内容"  
obsidian prepend file="ノート名" content="先頭に追加"

- `inline`: 改行なしで追記

### デイリーノート

obsidian daily # デイリーノートを開く  
obsidian daily:read # デイリーノートを読む  
obsidian daily:append content="内容" # デイリーノートに追記  
obsidian daily:prepend content="内容" # デイリーノートの先頭に追記  
obsidian daily:path # デイリーノートのパスを取得

### 検索

obsidian search query="検索語"  
obsidian search:context query="検索語" # 前後の文脈付き  
obsidian search query="検索語" path="folder" # フォルダ限定

### ファイル管理

obsidian files # ファイル一覧  
obsidian files folder="subfolder" # フォルダ内のファイル  
obsidian folders # フォルダ一覧  
obsidian move file="名前" to="新パス" # 移動  
obsidian rename file="名前" name="新名" # リネーム  
obsidian delete file="名前" # 削除（ゴミ箱へ）

### プロパティ（Frontmatter）操作

obsidian property:set name="tags" value="project" file="ノート名"  
obsidian property:read name="tags" file="ノート名"  
obsidian property:remove name="tags" file="ノート名"  
obsidian properties file="ノート名" # 全プロパティ表示

### タスク管理

obsidian tasks # 全タスク一覧  
obsidian tasks todo # 未完了タスク  
obsidian tasks done # 完了タスク  
obsidian tasks daily # デイリーノートのタスク  
obsidian task path="note.md" line=5 toggle # タスクのトグル

### タグ・リンク

obsidian tags # タグ一覧  
obsidian tags counts sort=count # タグを使用回数でソート  
obsidian links file="ノート名" # 発リンク一覧  
obsidian backlinks file="ノート名" # 被リンク一覧  
obsidian orphans # 孤立ノート  
obsidian unresolved # 未解決リンク

### Vault情報

obsidian vault # Vault情報  
obsidian vaults # 全Vault一覧  
obsidian version # Obsidianバージョン

## 出力フォーマット

多くのコマンドで `format=json|tsv|csv` が指定可能。プログラム的に処理する場合は `format=json` を推奨。

## 注意事項

- CLIはObsidianアプリのプロセスと通信するため、アプリが起動していないと動作しない
- `delete permanent` は復元不可。通常は `delete` でゴミ箱に移動させる
- 大量のコンテンツを `content=` で渡す場合、シェルのエスケープに注意  
	\`\`\`

## 活用例

ここからは、Obsidian CLIとClaude Codeを組み合わせた具体的な活用パターンを紹介します。

### AIエージェントによる自動ログ記録

最もシンプルで実用的な活用法は、AIエージェントの作業ログをデイリーノートに自動記録することです。

Claude Codeにこの運用を定着させるには、CLAUDE.mdに以下のようなルールを追加します。

```markdown
## 作業ログ
タスク完了時にデイリーノートに作業内容を追記すること。
フォーマット: \`## HH:MM タスク名\n- 実施内容\n- 結果\`
```

これだけで、Claude Codeはタスクを完了するたびにObsidian Vaultに記録を残すようになります。

### RAGパイプラインとの統合

Obsidian CLIの `search` → `read` → `append` の流れを使えば、AIエージェントがVaultを自律的に活用するRAG（Retrieval-Augmented Generation）パイプラインを構築できます。

具体的なコマンドの流れ：

```bash
# 1. 関連ノートを検索
obsidian search:context query="認証 OAuth" format=json

# 2. 見つかったノートを読み込む
obsidian read file="設計/認証フロー"

# 3. 新しい知見をノートに追記
obsidian append file="設計/認証フロー" content="\n## 2026-03-03 追記\n- JWTの有効期限を15分に短縮する方針に決定"
```

ポイントは、AIエージェントが **知識を消費するだけでなく、生産もする** という点です。調べて終わりではなく、得られた知見をVaultに書き戻すことで、Vault全体の知識が成長していきます。

### 複数AI環境でのナレッジ共有

現在のAI開発環境では、Claude Code、Codex CLI、Gemini CLIなど複数のエージェントを使い分けるケースが増えています。Obsidian Vaultを共有ナレッジベースとして使うことで、エージェント間の知識共有が実現します。

この構成では、2つのレイヤーが共存しています。

- **プロジェクト固有ファイル** （AGENTS.md / MEMORY.md / HANDOFF.md）：そのリポジトリに閉じた文脈情報。どのエージェントでも同じルールで動作する
- **Obsidian Vault** （共有ナレッジベース）：プロジェクトを横断する技術知見、設計判断、作業ログ。すべてのエージェントがCLI経由で読み書きする

たとえば、Claude Codeであるライブラリの使い方を調査した結果は、Vaultの技術知見ノートに記録されます。翌日、別のプロジェクトでGemini CLIを使うとき、同じ知見をVaultから引き出すことができるのです。

## まとめ

Obsidian CLIは、一見するとパワーユーザー向けのニッチな機能に見えます。しかしその本質は、 **AIエージェントにナレッジベースへのアクセス手段を提供する** ことにあります。

振り返ると、セットアップは3ステップで完了します。

1. **Obsidianを最新版に更新** する（v1.12.4以上）
2. **設定からCLIを有効化** する（Register CLI）
3. **PATHを設定** する（必要な場合のみ）

そしてClaude Codeのスキルとして定義することで、エージェントは自律的にVaultを操作できるようになります。検索して知識を引き出し、作業ログを記録し、新しい知見を書き戻す——Vaultが「AIの外部記憶」として機能し始めます。

AIエージェントのセッション記憶喪失は、多くの開発者が抱える課題です。MEMORY.mdやHANDOFF.mdといったプロジェクト内のファイルでセッション間の引き継ぎを行う手法に加えて、Obsidian Vaultという **プロジェクトを横断するナレッジベース** を持たせることで、AIエージェントの能力はさらに拡張されます。

まずはデイリーノートへの自動ログ記録から始めてみてください。AIエージェントが自分の作業を記録し、過去の知見を参照する姿を見ると、ツールとの付き合い方が変わるはずです。

[0](https://qiita.com/ProgrammingForEver/items/e78d656b8aac45296709#comments)

コメント一覧へ移動

新規登録して、もっと便利にQiitaを使ってみよう

1. あなたにマッチした記事をお届けします
2. 便利な情報をあとで効率的に読み返せます
3. ダークテーマを利用できます
[ログインすると使える機能について](https://help.qiita.com/ja/articles/qiita-login-user)