```dataviewjs
// ⚠️ 以下のファイル名を、分析したい元のノートファイル名に置き換えてください。
const SOURCE_FILE_NAME = "000_Publish/02.Study/G検定/G検定問題集";

// --- 設定 ---
const h2Regex = /^##\s+(.+)$/;  // H2見出し検出
const errorRegex = /❌/;         // 「❌」の検出

// ファイルの内容を読み込み
const file = app.vault.getAbstractFileByPath(`${SOURCE_FILE_NAME}.md`);
if (!file) {
    // 既に上のブロックでエラーメッセージを出しているためここでは処理をスキップ
    return;
}
const content = await app.vault.read(file);
const lines = content.split("\n");

// --- 抽出ロジック（前回のコードと同じ） ---
let mistakes = {};
let currentSection = "未分類";

for (let line of lines) {
    const h2Match = line.match(h2Regex);
    if (h2Match) {
        currentSection = h2Match[1].trim();
        if (!mistakes[currentSection]) {
            mistakes[currentSection] = [];
        }
        continue;
    }

    if (errorRegex.test(line)) {
        if (!mistakes[currentSection]) {
            mistakes[currentSection] = [];
        }
        
        // リストのマーク（- や - [ ]）を取り除いてテキストだけ綺麗にする
        let cleanLine = line.replace(/^\s*[-*]\s+(\[[ xX]\]\s+)?/, "").trim();
        
        mistakes[currentSection].push(cleanLine);
    }
}

// --- 表示処理 ---
dv.header(2, "⚠️ 復習リスト (❌のみ抽出)");

let hasMistakes = false;

for (const [section, items] of Object.entries(mistakes)) {
    if (items.length > 0) {
        hasMistakes = true;
        // セクション名を表示
        dv.header(3, section);
        // 間違えた問題をリスト表示
        dv.list(items);
    }
}

if (!hasMistakes) {
    dv.paragraph("全問正解です！素晴らしい！🎉");
}
```
