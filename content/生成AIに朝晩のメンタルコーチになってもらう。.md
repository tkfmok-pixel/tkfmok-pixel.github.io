---
tags:
  - ai-coach
  - ai-automation
  - python-scripting
  - daily-check-in
  - weekly-insights
  - ai
  - google-gemini
  - mental-health
  - data-analysis
  - Obsidian
---

# あらまし
## 経緯
つい体力や精神力を120%使ってしまう性格なので、無理をしないようにGeminiにカウンセラーになってもらうことにしました。

## Gemでやっていること
今はGemを作って、「おはよう」または「こんばんは」と呼びかけると、それに応じて会話が始まるようになっています。

Gemがシステムプロンプトで指示しておいた項目を聞き終えると、その時のメンタルのスコアを10段階評価で判定したり、いちにちの過ごし方のアドバイスをくれたりします。

そして、それをobsidianのデイリーノートに記録しておいて、週末に１週間分のデータを改めて別のGemに投げると、１週間のメンタルの推移などを分析して翌週のアドバイスをくれるようになっています。そのあたりの詳しいことは[[日々のデータを変態的に分析する]]でまとめようと思います。

で、今回はこの日々のフローをもっと簡単にできないかしらと思ったので、Geminiと壁打ちしてみました。以下がそのまとめです。ちゃんとできるんかな。

# 🤖 Gemini x Obsidian 自動化プロジェクト・コンプリートガイド

## 📋 実施タスクリスト
- [ ] **1. Google AI StudioでAPIキーを取得**
	- [Google AI Studio](https://aistudio.google.com/) にアクセスし、「Get API key」からキーを生成してメモする。
- [ ] **2. Python環境の準備 (Mac)**
    - ターミナルで以下を実行：
        - `python3 --version`（インストールを確認）
        - `pip3 install -U google-generativeai`（ライブラリ導入）
- [ ] **3. フォルダとプロンプトファイルの作成**
    - `Documents`の中に `Gemini_Prompts` フォルダを作成。
    - 中に `mindful_coach.txt` を作成し、前述のシステムプロンプトを貼り付ける。
- [ ] **4. Pythonスクリプトの作成**
    - 下記の `mindful_cli.py` を作成し、パスとAPIキーを書き換える。
- [ ] **5. Macでの「即起動」設定**    
    - 「スクリプトエディタ」でAppleScriptを書き、アプリケーションとしてデスクトップに保存。
---

[[🐍 1. 朝晩のコーチ用スクリプト (`mindful_cli.py`)]]    

---
[[🍎 3 デスクトップ即起動アイコン]]
