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

## 🐍 1. 朝晩のコーチ用スクリプト (`mindful_cli.py`)

このコードは「今日のノート」を読み込み、会話後に末尾へ追記します。

Python

```
import os
import datetime
import google.generativeai as genai

# --- 【要書き換え】設定項目 ---
API_KEY = "ここに取得したAPIキーを入力"
VAULT_PATH = os.path.expanduser("~/Documents/YourVaultName") # 保管庫のパス
DAILY_FOLDER = "DailyNotes" # デイリーノートのフォルダ名
PROMPT_FILE = os.path.expanduser("~/Documents/Gemini_Prompts/mindful_coach.txt")

genai.configure(api_key=API_KEY)

def get_today_content():
    today = datetime.date.today().strftime("%Y-%m-%d")
    path = os.path.join(VAULT_PATH, DAILY_FOLDER, f"{today}.md")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

def run_session():
    previous_context = get_today_content()
    with open(PROMPT_FILE, "r", encoding="utf-8") as f:
        system_instruction = f.read()

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=system_instruction + f"\n\n【今日のこれまでの記録】:\n{previous_context}"
    )
    
    chat = model.start_chat(history=[])
    print("🧘 マインドフルネス・コーチ起動中...")
    print("（'exit' と入力すると終了して保存します）\n")
    
    while True:
        user_input = input("あなた: ")
        if user_input.lower() in ["exit", "終了"]: break
            
        response = chat.send_message(user_input)
        print(f"\nコーチ: {response.text}\n")

        if "```" in response.text:
            today = datetime.date.today().strftime("%Y-%m-%d")
            path = os.path.join(VAULT_PATH, DAILY_FOLDER, f"{today}.md")
            with open(path, "a", encoding="utf-8") as f:
                f.write(f"\n\n{response.text}")
            print("\n✅ デイリーノートに記録しました。")
            break

if __name__ == "__main__":
    run_session()
```

---

## 🛠 2. Macの自動化設定 (cron)

土曜日の夜22時に自動実行させる手順：

1. ターミナルで `crontab -e` を実行。
    
2. キーボードの `i` を押して編集モードにし、以下を貼り付け（パスは適宜修正）：
    
    Bash
    
    ```
    0 22 * * 6 /usr/bin/python3 /Users/YourName/Documents/weekly_analysis.py
    ```
    
3. `esc` キーを押し、`:wq` と入力して `Enter` で保存。
    

---

## 🍎 3 デスクトップ即起動アイコン

1. **「スクリプトエディタ」**を起動。
    
2. 以下を貼り付け：
    
    AppleScript
    
    ```
    tell application "Terminal"
        do script "python3 ~/Documents/mindful_cli.py"
        activate
    end tell
    ```
    
3. 「ファイル」＞「書き出し」＞ファイルフォーマットを**「アプリケーション」**にして保存。
    

---

このガイドをObsidianに貼っておけば、いつでも作業を再開できます。まずは **Step 1 & 2** の環境準備から始めてみてください！

準備ができたら、次は**「週次分析で具体的にどんな項目を抽出してほしいか（分析用プロンプト）」**を詰めましょうか？