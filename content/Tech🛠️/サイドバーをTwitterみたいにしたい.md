---
tags:
  - Obsidian
  - CSSスタイル
  - Twitter風UI
  - QuickAddプラグイン
  - Commanderプラグイン
  - Tweet投稿
  - DailyNote
  - カスタマイズ
summary: "とにかくTwitterみたいに気軽に投げて気軽に振り返る作業を自分だけの世界でやりたいんじゃ！ Obsidianでちょっと思ったことを書くのは意外と難しくないですか。 ということで、CSSでなんとかできないかとGEMINIに聞いてみた。"
---

# WHY
Obsidianでちょっと思ったことを書くのは意外と難しくないですか。なんかかしこまってしまうし。デイリーノートに書いてもいいけど、後で振り返るのも面倒だし。
とにかくTwitterみたいに気軽に投げて気軽に振り返る作業を自分だけの世界でやりたいんじゃ！
# HOW
ということで、CSSでなんとかできないかとGEMINIに聞いてみた。
何回かやりとりして、以下のようなCSSを吐いてきた。
割と良さそうだったので共有します。プロじゃないので、適用は自己責任でお願いします。
```CSS
/* --- Old Twitter like (Revised & Balanced) --- */

.twitter-layout {
    --tw-border: #e6ecf0;
    --tw-bg: #ffffff;
    --tw-bg-subtle: #f5f8fa;
    --tw-text-main: #0f1419;
    --tw-text-sub: #536471;
}

/* 全体：窮屈さを解消するために幅を少し確保 */
.markdown-source-view.mod-cm6.twitter-layout .cm-content,
.markdown-rendered.twitter-layout {
  /*  max-width: 650px !important; */
    margin: 0 auto !important;
    background-color: var(--tw-bg-subtle);
    padding: 16px 0;
}

/* リスト */
.twitter-layout .markdown-rendered ul {
    padding-left: 0;
}

/* カード：修正前のスタイルを復元しつつ、アイコン分の左余白を正しく設定 */
.twitter-layout li {
    list-style: none !important;
    background: var(--tw-bg);
    border: 1px solid var(--tw-border);
    border-radius: 12px;
    
    /* 左右のパディングを増やして「窮屈さ」を解消 */
    padding: 16px 20px 16px 76px; 
    margin: 12px 16px;
    
    color: var(--tw-text-main);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    position: relative; /* アイコンを置く基準 */
    
    /* 本文の読みやすさ */
    line-height: 1.6;
    white-space: pre-wrap;
    min-height: 80px;
}

/* アイコン：絶対配置ですが、パディングで避けているので重なりません */
.twitter-layout li::before {
    content: "";
    position: absolute;
    top: 16px;
    left: 16px;
    width: 48px;
    height: 48px;
    background-color: #eee;
    background-image: url('yourURL');
    background-size: cover;
    border-radius: 50%;
}

/* タイムスタンプ・ヘッダー部分 */
.twitter-layout li::first-line {
    font-size: 0.9em;
    font-weight: bold;
    color: var(--tw-text-sub);
}

/* ホバー効果 */
.twitter-layout li:hover {
    background-color: #f7f9f9;
    border-color: #cfd9de;
    transition: 0.2s ease;
}

/* 画像がある場合 */
.twitter-layout li img {
    margin-top: 10px;
    border-radius: 8px;
    max-width: 100%;
}

```

# WHAT
## 0.完成イメージ
[![Image from Gyazo](https://i.gyazo.com/34d4a24373f84540e7c59ee096bc86be.png)](https://gyazo.com/34d4a24373f84540e7c59ee096bc86be)
## 1.CSSの適用
上記CSSを有効にします。

## 2.Obsidianのどこからでも投稿できるようにする
### QuickAddプラグイン+Commanderプラグインを使う
#### QuickAddプラグインの設定
1. Capture toを選択
2. ノートを指定
3. Insert Afterを選択して、挿入場所を# 🪽Tweets🪽に指定。
4. Capture Formatに以下を指定。（投稿日時＋投稿内容＋区切り線）
```
- [[{{DATE:YYYY-MM-DD}}]] {{DATE:HH:mm:ss}}
{{VALUE}}
---

```

#### Commanderプラグインの設定
Tabbarにquickaddのコマンドを登録するだけ。

### Twitterノートをサイドバーに移動＋Buttonプラグインでボタンを押したら投稿できるようにする
#### QuickAdd
上記と同じものでOK
#### Buttonの設定
ノートの最初にコマンドでボタンを挿入。名前や色はご自由に。

# 完了
以上です。

## 関連ノート
- [[PKM現状分析_2026-06-07]]
- [[【第3講】ノートとその問題点]]
- [[情報セキュリティⅡ]]
