Mermaid（Mermaid.js）は、テキストベースで図を作成できる軽量マークアップ記法です。主にドキュメントやコード内でフローチャート、シーケンス図、ガントチャートなどを簡単に記述するために使われます。以下はMermaidでできることと、各記法の詳細な書き方です。

  

  

  

  

✅ Mermaidでできること一覧（対応している図の種類）

  

|                                  |                                         |
| -------------------------------- | --------------------------------------- |
| 図の種類                             | 説明                                      |
| Flowchart（フローチャート）               | 決定や処理の流れを図で表現                           |
| Sequence diagram（シーケンス図）         | オブジェクト間の時系列的なやりとりを表現                    |
| Gantt chart（ガントチャート）             | プロジェクトや工程のスケジュール管理                      |
| Class diagram（クラス図）              | クラス構造と関係性を図式化                           |
| State diagram（状態遷移図）             | オブジェクトやシステムの状態遷移を図式化                    |
| Entity Relationship diagram（ER図） | データベースの構造を表現                            |
| Journey diagram（ユーザージャーニー図）      | ユーザーの行動や感情を可視化                          |
| Pie chart（円グラフ）                  | 割合を円グラフで表示                              |
| Requirement diagram（要件図）         | システム要件や関係性を図式化（Mermaid 10以降）            |
| Git graph（Git図）                  | Gitのブランチやコミット履歴の視覚化<br><br><br><br><br> |

  

  

  

  

🧾 各記法の詳細と使用例

  

  

  

  

  

① Flowchart（フローチャート）

  

  

  

書き方

  

flowchart TD

  A[開始] --> B{条件}

  B -- はい --> C[処理1]

  B -- いいえ --> D[処理2]

  C --> E[終了]

  D --> E

  

解説

  

  

- TD：Top to Down（上から下）
- 他に LR（左→右）, RL, BT（下→上）など
- 四角 []、丸角 ()、菱形 {} などでノードの形を変えられる

  

  

  

  

  

② Sequence Diagram（シーケンス図）

  

  

  

書き方

  

sequenceDiagram

  participant A as ユーザー

  participant B as サーバー 

  

  A->>B: リクエスト送信

  B-->>A: レスポンス返却

  

解説

  

  

- participant：登場人物（エージェント）
- ->>：同期メッセージ、-->>：非同期メッセージ

  

  

  

  

  

③ Gantt Chart（ガントチャート）

  

  

  

書き方

  

gantt

  title プロジェクト計画

  dateFormat  YYYY-MM-DD

  section 準備

  仕様検討        :done,  task1, 2025-01-01, 2025-01-07

  設計            :active, task2, 2025-01-08, 10d

  section 実装

  実装フェーズ1   :        task3, after task2, 5d

  テスト          :        task4, after task3, 5d

  

解説

  

  

- section：セクション名
- :done, :active でステータス表現可
- after taskX で依存関係も指定可

  

  

  

  

  

④ Class Diagram（クラス図）

  

  

  

書き方

  

classDiagram

  class Animal {

    +String name

    +eat()

    +sleep()

  }

  

  class Dog {

    +bark()

  }

  

  Animal <|-- Dog

  

解説

  

  

- class クラス名：クラス定義
- +（public）、-（private）、#（protected）
- <|--（継承）, --（関連）

  

  

  

  

  

⑤ State Diagram（状態遷移図）

  

  

  

書き方

  

stateDiagram-v2

  [*] --> Idle

  Idle --> Loading

  Loading --> Success

  Loading --> Error

  Error --> Idle

  

解説

  

  

- [＊]：開始状態
- -->：状態遷移

  

  

  

  

  

⑥ ER Diagram（ER図）

  

  

  

書き方

  

erDiagram

  CUSTOMER ||--o{ ORDER : places

  ORDER ||--|{ LINE_ITEM : contains

  CUSTOMER {

    string name

    string address

  }

  

解説

  

  

- ||--o{：1対多（1:N）、||--||：1対1、}|--|{：多対多（N:M）
- エンティティ内にフィールド定義可能

  

  

  

  

  

⑦ Journey Diagram（ユーザージャーニー図）

  

  

  

書き方

  

journey

  title ユーザージャーニー：新規登録

  section 初期体験

    入力フォーム記入: 5: ユーザー

    メール確認      : 4: ユーザー

    登録完了画面    : 3: ユーザー

  

解説

  

  

- 数字は満足度（1～5）

  

  

  

  

  

⑧ Pie Chart（円グラフ）

  

  

  

書き方

  

pie

  title 市場シェア

  "A社" : 40

  "B社" : 30

  "C社" : 30

  

  

  

  

⑨ Requirement Diagram（要件図）

  

  

※ Mermaid v10以降でサポートされています

requirementDiagram

  requirement req1 {

    id: 1

    text: 要件A

  }

  

  requirement req2 {

    id: 2

    text: 要件B

  }

  

  req1 --> req2

  

  

  

  

⑩ Git Graph（Git履歴図）

  

gitGraph

  commit

  commit

  branch feature

  checkout feature

  commit

  checkout main

  merge feature

  

  

  

  

🎨 スタイルのカスタマイズ

  

  

- :::className や classDef で色や形をカスタマイズ可能

  

flowchart TD

  A[Start]:::start

  B{Decision}

  A --> B

  classDef start fill:#f96,stroke:#333,stroke-width:2px;

  

  

  

  

🧪 Mermaidを使える環境例

  

  

- Obsidian（プラグイン不要で標準対応）
- VSCode（Markdown Preview Mermaid Support 拡張）
- GitHub（READMEやIssueコメントでサポート）
- Docusaurus, MkDocs, Notion, JupyterLabなど

  

  

  

  

  

📚 公式リファレンス

  

  

Mermaid公式ドキュメント: [https://mermaid.js.org](https://mermaid.js.org/)

  

  

  

必要であれば、各図の「テンプレート一覧」や「自動生成スクリプト例」も提供できます。どの図について詳しく見たいですか？

おっしゃる通り、Mermaid には「カンバンボード」など、比較的新しく追加された図も存在します。以下に2025年時点でMermaidが対応している全ての図の種類を、公式＋αのリソースを元に網羅的に列挙し、それぞれの用途・対応状況・サンプルコードをまとめます。

  

  

  

  

🧾 Mermaidで作成できる図一覧（完全版・2025年最新版）

  

|   |   |   |   |   |
|---|---|---|---|---|
|No|図の種類|キーワード|説明|対応状況|
|1|フローチャート|flowchart|処理や判断の流れを図式化する|✅ 安定|
|2|シーケンス図|sequenceDiagram|登場人物間の時系列なやりとりを表現|✅ 安定|
|3|ガントチャート|gantt|プロジェクトの進行状況を可視化|✅ 安定|
|4|クラス図|classDiagram|オブジェクト指向のクラス構造を表現|✅ 安定|
|5|状態遷移図|stateDiagram or stateDiagram-v2|状態の変化と遷移を示す|✅ 安定（v2推奨）|
|6|ER図（エンティティリレーション図）|erDiagram|データベース設計に使う|✅ 安定|
|7|ユーザージャーニー図|journey|ユーザーの行動・感情を時間軸で表現|✅ 安定|
|8|円グラフ|pie|比率をグラフで表示|✅ 安定|
|9|要件図|requirementDiagram|システム要件・相互関係の可視化|✅ v10以降|
|10|Gitグラフ|gitGraph|Gitのブランチやコミット履歴を図示|✅ 安定|
|11|タイムライン図|timeline|イベントの時間的経過を視覚化|✅ v10以降|
|12|カンバンボード|kanban|タスク管理・進行状況のボード|✅ v10以降|
|13|Mindmap（マインドマップ）|mindmap|階層的アイデア整理|✅ 実験的|
|14|Quadrant Chart（4象限図）|quadrantChart|要素を4象限でマッピング|✅ 実験的|
|15|Sankey Diagram（サンキー図）|sankey|フローと比率を可視化（エネルギー/コスト分析等）|✅ 実験的|
|16|XY Chart（散布図）|xychart|X-Y軸の値をグラフ化|✅ 実験的|
|17|Requirement Graph（拡張要件図）|requirementGraph|要件相関図（Graph構造）|🔬 実験的（オプション）|

  

  

  

  

🔍 詳細とサンプル（未紹介のもの）

  

  

  

  

  

⑪ Timeline（タイムライン図）

  

timeline

    title 製品リリースまでの流れ

    2025-01-01 : 要件定義開始

    2025-02-15 : 実装開始

    2025-04-01 : ベータ版公開

    2025-06-01 : 正式リリース

  

  

  

  

⑫ Kanban（カンバンボード）

  

kanban

    title プロジェクト進行

    columns

        Todo

        Doing

        Done

    cards

        Todo : タスクA, タスクB

        Doing : タスクC

        Done : タスクD

カードの移動は静的。インタラクティブな操作は未対応（Mermaid上では）

  

  

  

  

⑬ Mindmap（マインドマップ）

  

mindmap

  root

    アイデア1

      子アイデア1.1

      子アイデア1.2

    アイデア2

mindmap は現在もベータまたはexperimentalとして扱われています。

  

  

  

  

⑭ Quadrant Chart（4象限図）

  

quadrantChart

    title 戦略マッピング

    x-axis 重要性

    y-axis 実現性

    quadrant-1 実行せよ

    quadrant-2 要検討

    quadrant-3 重要でない

    quadrant-4 後回し

    "改善策A": [0.7, 0.8]

    "アイデアB": [0.2, 0.3]

  

  

  

  

⑮ Sankey Diagram（サンキー図）

  

sankey

  エネルギー供給 [100] --> 発電所

  発電所 --> 送電 [80]

  発電所 --> 熱損失 [20]

  

  

  

  

⑯ XY Chart（散布図）

  

xychart

    title 製品比較

    x-axis パフォーマンス

    y-axis コスト

    point A[製品A] (0.8, 0.6)

    point B[製品B] (0.4, 0.9)

  

  

  

  

⑰ Requirement Graph（要件グラフ）

  

requirementGraph

  R1[ユーザー認証]

  R2[データ保存]

  R3[セキュリティ対策]

  

  R1 --> R3

  R2 --> R3

  

  

  

  

⚠ 注意点

  

  

- v10以降でないと動作しない図が多い（特にカンバン、タイムライン、クアドラントなど）
- 実験的図（experimental）は今後仕様変更の可能性あり
- Mermaidを使うアプリ側（例：Obsidian, GitHub）によっては一部の図がまだ非対応

  

  

  

  

  

📎 活用補足

  

  

- Mermaidはあくまで「静的な構造図」を対象としているため、動的インタラクション（カード移動、編集など）には非対応です。
- 「カンバンボードをインタラクティブに動かしたい」場合は、Mermaidよりも Trello / Obsidian Kanban Plugin などが向いています。

  

  

  

  

  

🧭 今後の拡張が予定されている図

  

  

- Activity Diagram（UML的なアクティビティ図）
- Use Case Diagram（ユースケース図）
- Network Diagram（ネットワーク構成図）

  

  

※現時点では未正式対応

  

  

  

必要であれば、それぞれの図の「テンプレート」「カスタマイズ方法」「Obsidianでの活用例」もご案内できます。どれを詳しく見たいですか？

はい、MermaidはObsidianのデイリーノートを有機的（≒構造的・意味的につながりのある形）に活用するのに非常に有効です。ただし、「そのままでは動的にはならない」ため、TemplaterやDataviewと組み合わせると効果が最大化します。

  

  

  

  

🎯 結論：Mermaidは「思考・行動・状態の可視化」によって、デイリーノートを“意味あるまとまり”として育てる力を持っている。

  

  

以下に具体的な使い方と組み合わせ例を紹介します。

  

  

  

  

🧠 Mermaid × デイリーノート 活用パターン7選

  

  

  

  

  

① ✅ 毎日のタスクの流れをフローチャートで可視化

  

  

  

🧾 用途：

  

  

- 朝の時点で「やるべきこと」と「その順序」を意識づけ
- 毎日のルーチンや意思決定パターンを図示

  

```mermaid

flowchart TD

  A[朝食] --> B[タスク確認]

  B --> C{優先度判断}

  C -->|高| D[重要タスク処理]

  C -->|低| E[軽作業]

📌 → 習慣の固定化や改善に役立つ

  

---

  

## ② 🔄 状態遷移図で「1日をどう過ごしたか」をモデリング

  

### 🧾 用途：

- 自分の「集中力・感情・行動状態」の遷移ログとして使う

  

```markdown

```mermaid

stateDiagram-v2

  [*] --> 起床

  起床 --> 集中作業

  集中作業 --> 休憩

  休憩 --> 集中作業

  集中作業 --> 離脱

  離脱 --> [*]

📌 → これを毎日追記していくと、**パターン分析に繋がる**

  

---

  

## ③ 📅 タイムラインで日内イベントの可視化

  

### 🧾 用途：

- 予定／実績のタイムライン記録  

- 過去の振り返りにも役立つ

  

```markdown

```mermaid

timeline

  title 2025-05-31 の行動ログ

  07:30 : 起床

  08:00 : 散歩

  09:00 : タスクA 開始

  12:00 : 昼食

  13:00 : 会議

  15:00 : タスクB

  18:00 : 終了

📌 → 終業後に追記すれば「1日を俯瞰」できる

  

---

  

## ④ 🔁 ジャーニー図で行動×感情の変遷を記録

  

```markdown

```mermaid

journey

  title 1日の感情トラッキング

  section 午前

    起床: 3: 自分

    タスクA: 4: 自分

  section 午後

    会議: 2: 自分

    散歩: 5: 自分

📌 → 感情と行動の関係を視覚化でき、自己洞察が深まる

  

---

  

## ⑤ 📦 Kanbanでその日のToDoを一目で整理

  

```markdown

```mermaid

kanban

  title 今日のタスク

  columns

    Todo

    Doing

    Done

  cards

    Todo : メール対応, レポート作成

    Doing : 会議準備

    Done : 朝会参加

📌 → インタラクティブではないが、**「見える化」には有効**

  

---

  

## ⑥ 🧠 Mindmapで「その日のアイデア・思考展開」を記録

  

```markdown

```mermaid

mindmap

  今日の気づき

    タスク管理の改善

      午前集中型

      Pomodoro再開

    読書メモ

      ○○について

📌 → 自己内省の構造化や、「その日だけの知的地図」として機能

  

---

  

## ⑦ 🛠 Templaterと連携してMermaidテンプレを自動挿入

  

例：デイリーノートテンプレートに以下を追加

  

```markdown

## 🗺 今日の流れ（自動挿入）

  

```mermaid

flowchart TD

  起床 --> タスク開始

  タスク開始 --> 昼休み

  昼休み --> 午後の作業

  午後の作業 --> 終了

📌 → 毎日同じ形式のフローチャートを自動で挿入できる

  

---

  

# 🧩 Dataviewやタグと連携するとさらに強力

  

### 例）特定のタグを持つタスクだけMermaidでフローチャート化する  

（※これはDataviewJS＋テンプレ＋Mermaidの連携が必要）

  

```js

const tasks = dv.pages("#習慣/朝").file.tasks

  .where(t => !t.completed)

  .map(t => `A --> ${t.text}`)

  

dv.paragraph("```mermaid\nflowchart TD\n" + tasks.join("\n") + "\n```")

📌 → Dataviewで抽出 → Mermaidで図示化＝自動的な構造図

  

  

  

  

🎁 まとめ

  

|   |   |   |
|---|---|---|
|目的|Mermaid図の種類|メリット|
|行動の流れ|flowchart|直感的な視覚化|
|状態の変化|stateDiagram|習慣・思考パターンの分析|
|タイムスケジュール|timeline|計画と実績の比較|
|感情の推移|journey|心理的傾向の可視化|
|タスク管理|kanban|簡易ToDoの視覚化|
|思考整理|mindmap|構造的思考の記録|

  

  

  

  

🧩 補足

  

  

- Obsidianのプレビュー表示でのみMermaidは機能します（エディタではコードのまま）
- スマホでは表示できない場合もあるので注意
- Templater, Dataview, Buttons, Kanban プラグインと組み合わせると真価発揮！

  

  

  

  

「自動でその日のタスクをMermaid化したい」

「毎日のテンプレで図を入れたい」

など、さらに自動化や応用例が知りたい場合は、その内容に応じて具体的なコードも用意できますよ。どれを深掘りしますか？