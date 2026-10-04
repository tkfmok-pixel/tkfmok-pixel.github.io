---
tags:
  - databox
  - dataviewjs
  - 進捗管理
  - 学習計画
  - タスク管理
  - OBSIDIAN
  - 生成AI
  - シラバス
  - ダタボーン
summary: "dataviewjsを用いて、今日の受講予定及び昨日以前に受講予定で受講完了していないものを一覧化しています。 dataviewjsを用いて、全科目の受講予定について、以下の状況を常時モニタリングしています。"
---

# 0.完成図
先に出来上がりのイメージから。

## 0-1.俯瞰
1枚のCanvas上にあらゆる情報を載せてしまいます。
左上に全体進捗及び受講予定（本日及び過日で未受講のもの）、右上に明日から9日間の受講予定をまとめています。
下段は科目別の情報をまとめています。
[![Image from Gyazo](https://i.gyazo.com/98398b5d609d13fd2b4bf76aaf7d383c.png)](https://gyazo.com/98398b5d609d13fd2b4bf76aaf7d383c)
## 0-2.全体進捗
dataviewjsを用いて、全科目の受講予定について、以下の状況を常時モニタリングしています。
1. 全タスク（受講予定）のうち、受講完了したものの割合
2. 全タスクのうち、受講予定日を超過しているのに未完了のものの割合
3. 全タスクのうち、受講期限日を超過しているのに未完了のものの割合
[![Image from Gyazo](https://i.gyazo.com/d2b449d7836e8c5d9e0a86961357e220.png)](https://gyazo.com/d2b449d7836e8c5d9e0a86961357e220)
## 0-3.受講予定
dataviewjsを用いて、今日の受講予定及び昨日以前に受講予定で受講完了していないものを一覧化しています。
[![Image from Gyazo](https://i.gyazo.com/1a5d5c0e7090731752141449374e97be.png)](https://gyazo.com/1a5d5c0e7090731752141449374e97be)
# 0-4.科目別進捗
## 0-4-1.科目別ノート
その科目の概要及び講義回ごとのノートへのリンクなどをまとめたノート
## 0-4-2.全体進捗
名前がいまいちですが、科目別の全タスク（受講予定）のうち、受講完了したものの割合を示しています。
## 0-4-3.進捗詳細
講義回ごとの進捗状況を示しています。
## 0-4-4.分析
予定超過している割合や期限超過している割合を分析。遅れていると下に一覧でタスクが出てきます。
[![Image from Gyazo](https://i.gyazo.com/1705ff71809cff1d1cf89cae94bb6871.png)](https://gyazo.com/1705ff71809cff1d1cf89cae94bb6871)

# 1.科目別の進捗管理の作り方
次に、各タスクやノート方法を書いていきます。
頭の中は全体→詳細へとドリルダウンしていますが、作成は詳細→全体へと進んでいきます。
## 1-1.科目別フォルダ＆ノートを作る
各科目は8回の講義回で構成されており、各講義回はさらに４講と1回の小テストに別れています。この４講と小テストをタスク化したいです。
### 1-1-1.シラバスの情報を生成AIで整形
情報を全て手入力していると発狂してしまうため、シラバスから情報をとってきます。シラバスには授業の目的・概要・担当講師・各講義回の内容・各講の内容が書かれています。これを生成AIにコピペして投げて、OBSIDIAN用に整形してもらいます。
どんなプロンプトを投げたか忘れました...
とりあえずいい感じに必要項目を書き出してくれました。
[![Image from Gyazo](https://i.gyazo.com/96863e2c9b9eaebe6f2a84b7c6e5a798.jpg)](https://gyazo.com/96863e2c9b9eaebe6f2a84b7c6e5a798)
### 1-1-2.講義回ごとにタスク化＆ノート化
各講に対して下記のように受講予定日＝scheduled date、受講期限日＝due dateとして設定していきます。いつどれを受講するかの検討はいったん割愛します。
[![Image from Gyazo](https://i.gyazo.com/170af1a37ecc4bc56d7d08c6c1e11ffc.png)](https://gyazo.com/170af1a37ecc4bc56d7d08c6c1e11ffc)
## 1-2.講義回別ノートを作る
前掲の科目別ノートのスクショの授業計画＆タスク管理の部分は、ここの工程でノートに切り出したあとの状態です。AIが整形した時点では各講義回の説明なども列挙されている状態でした。というわけで科目別ノートごとにNote Refactorプラグインで一括で切り出します。
これでタスク＆ノート作成はいったん完了です。
## 1-3.講義別進捗確認表・グラフを作る
ノートとタスクが完成したら、CANVASに進捗確認用のカードを作っていきます。
### 1-3-1.科目別全体進捗グラフ
```c
// --- 設定：対象のフォルダと除外するファイル名 ---
const folderName = "(科目名)";
const folderPath = `（学期のフォルダパス）/${folderName}`;

// --- データの集計 ---
const pages = dv.pages(`"${folderPath}"`).where(p => p.file.name !== folderName);
const allTasks = pages.file.tasks;

// total: 予定日(scheduled)があり、かつキャンセルされていないタスク
const targetTasks = allTasks.where(t => t.scheduled && t.status !== "-");

const total = targetTasks.length;
const completed = targetTasks.where(t => t.completed).length;
const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
const remaining = 100 - percent;

// --- 円グラフ（SVG）の生成 ---
const strokeDash = `${percent} ${remaining}`;
const color = "#2196f3"; 

const svgChart = `
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin: 20px 0;">
    <div style="position: relative; width: 300px; height: 300px;">
        <svg width="300" height="300" viewBox="0 0 42 42" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eee" stroke-width="3"></circle>
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="${color}" stroke-width="3" stroke-dasharray="${strokeDash}" stroke-dashoffset="0" stroke-linecap="round"></circle>
        </svg>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-weight: bold; font-size: 3em; line-height: 1;">${percent}<span style="font-size: 0.5em;">%</span></div>
            <div style="font-size: 1.1em; color: gray; margin-top: 10px;">${completed} / ${total} 完了</div>
        </div>
    </div>
</div>
`;

// --- 出力 ---
dv.paragraph(svgChart);
```

### 1-3-2.講義回別進捗詳細グラフ
```c
// --- 設定：対象のフォルダと除外するファイル名 ---
const folderName = "（科目名）";
const folderPath = `（学期のフォルダパス）/${folderName}`;

// ファイル名が「第n回」で始まるものだけを抽出し、ソート
const pages = dv.pages(`"${folderPath}"`)
    .where(p => p.file.name.startsWith("第") && p.file.name.includes("回"))
    .where(p => p.file.name !== folderName)
    .sort(p => p.file.name);

const stats = pages.map(p => {
    // 予定日(scheduled)があり、かつキャンセルされていないタスクのみを抽出
    const targetTasks = p.file.tasks.where(t => t.scheduled && t.status !== "-");
    
    const total = targetTasks.length;
    const completed = targetTasks.where(t => t.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // 進捗バー（HTMLのprogressタグ）
    const bar = `<progress value="${percent}" max="100" style="width:100%; height:10px;"></progress>`;

    return [p.file.link, bar, `**${percent}%**` ];
});

// テーブル表示
dv.table(["ノート（各回）", "進捗グラフ", "数値"], stats);
```

### 1-3-3.科目別遅れ分析
```c
const folderName = "(科目名)";
const folderPath = `（学期のフォルダパス）/${folderName}`;
const today = dv.date("today");

// データの取得（フォルダ内のIndexノート以外）
const pages = dv.pages(`"${folderPath}"`).where(p => p.file.name !== folderName);
const allTasks = pages.file.tasks;

// 分母：予定日(scheduled)があり、且つキャンセルされていないタスク
const baseTasks = allTasks.where(t => t.scheduled && t.status !== "-");
const totalCount = baseTasks.length;

// ① 予定日あり 且つ 予定日超過（未完了）
const overdueScheduled = baseTasks.where(t => !t.completed && t.status === " " && t.scheduled < today);

// ② 期限日(due)あり 且つ 期限切れ（未完了・キャンセル除外）
const overdueDue = allTasks.where(t => !t.completed && t.status === " " && t.due && t.due < today);

// ③ 日付設定なし（未完了・キャンセル除外）
const anytimeTasks = allTasks.where(t => !t.completed && t.status === " " && !t.scheduled && !t.due);

// 割合の計算（分母は予定日があるタスクの総数）
const sRatio = totalCount > 0 ? Math.round((overdueScheduled.length / totalCount) * 100) : 0;
const dRatio = totalCount > 0 ? Math.round((overdueDue.length / totalCount) * 100) : 0;

dv.header(2, `📊 ${folderName} 分析`);

// 状況サマリーをテーブルで表示
dv.table(["分類", "件数", "全体比"], [
    ["⏳ 予定超過", overdueScheduled.length, `${sRatio}%`],
    ["🚨 期限超過", overdueDue.length, `${dRatio}%`],
    ["📅 日付指定なし(未完了)", anytimeTasks.length, "-"]
]);

// リスト表示
if (overdueScheduled.length > 0) {
    dv.header(3, "🟡 遅れてるよ🐷");
    dv.taskList(overdueScheduled, false);
}

if (overdueDue.length > 0) {
    dv.header(3, "🔴 期限切れ🐱");
    dv.taskList(overdueDue, false);
}
```

# 2.全体の管理
## 2-1.全体の進捗グラフ
該当学期に履修した科目の全体の受講状況を表示するコードを（GEMINIが）書きます。
```c
// 1. データの集計
const semesterPath = "（学期のフォルダパス）";
const allTasks = dv.pages(`"${semesterPath}"`).file.tasks;

const total = allTasks.where(t => t.status !== "-").length;
const completed = allTasks.where(t => t.completed).length;
const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
const remaining = 100 - percent;

// 2. 円グラフ（SVG）の生成
// 扇形の計算（Dasharray）
const strokeDash = `${percent} ${remaining}`;

const svgChart = `
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
    <svg width="500" height="500" viewBox="0 0 42 42" style="transform: rotate(-90deg); filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.2));">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e6e6e6" stroke-width="6"></circle>
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#4caf50" stroke-width="6" 
                stroke-dasharray="${strokeDash}" stroke-dashoffset="0" stroke-linecap="round" style="transition: stroke-dasharray 0.5s ease;"></circle>
    </svg>
    <div style="text-align: center;">
        <div style="font-size: 1.5em; font-weight: bold;">${percent}%</div>
        <div style="font-size: 0.9em; color: gray;">${completed} / ${total} Tasks Done</div>
    </div>
</div>
`;

// 3. 出力
dv.header(2, "📅 20261st 学期全体進捗");
dv.paragraph(svgChart);
```

## 2-2.遅れの確認
タスクプラグインを使っている前提です。タスクには締め切りと予定日の両方を登録しています。
```c 
const semesterPath = "（学期のフォルダパス）";
const today = dv.date("today");

// 全タスクを取得
const allTasks = dv.pages(`"${semesterPath}"`).file.tasks;

// total: 予定日(scheduled)があり、かつキャンセルされていないタスク
const scheduledTasks = allTasks.where(t => t.scheduled && t.status !== "-");
const total = scheduledTasks.length;

// 超過タスクの抽出（未完了かつステータスが半角スペースのもの）
const overdueS = scheduledTasks.where(t => !t.completed && t.status === " " && t.scheduled < today);
const overdueD = scheduledTasks.where(t => !t.completed && t.status === " " && t.due && t.due < today);

// 割合の計算
const sRatio = total > 0 ? ((overdueS.length / total) * 100).toFixed(1) : "0.0";
const dRatio = total > 0 ? ((overdueD.length / total) * 100).toFixed(1) : "0.0";

// SVG円グラフ生成関数
function createPie(percent, color, label, count) {
    const p = parseFloat(percent);
    const r = 100 - p;
    return `
    <div style="text-align:center;">
        <svg width="500" height="500" viewBox="0 0 42 42" style="transform: rotate(-90deg);">
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eee" stroke-width="6"></circle>
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="${color}" stroke-width="6" stroke-dasharray="${p} ${r}" stroke-dashoffset="0"></circle>
        </svg>
        <div style="font-weight:bold; margin-top:5px;">${label}</div>
        <div style="font-size:1.2em;">${percent}%</div>
        <div style="font-size:0.7em; color:gray;">(${count} / ${total})</div>
    </div>`;
}

dv.header(2, "🌍 20261st 学期：アラート状況");

// グラフ表示エリア
dv.el("div", `
<div style="display: flex; justify-content: space-around; padding: 20px 0;">
    ${createPie(sRatio, "#ffa500", "予定超過", overdueS.length)}
    ${createPie(dRatio, "#ff4d4d", "期限超過", overdueD.length)}
</div>`, { raw: true });

// メッセージ表示エリア
if (overdueD.length > 0) {
    dv.paragraph("🟥 期限超過があります。最優先で対応してください！");
} 
if (overdueS.length > 0) {
    dv.paragraph("🟨 予定日超過があります。リカバリーを計画しましょう。");
}
if (overdueD.length === 0 && overdueS.length === 0) {
    dv.paragraph("✨ すべての期限を守れています！素晴らしいペースです。");
}
```

## 2-3.今日の受講予定
```c
const today = dv.date("today");
const semesterPath = "(学期のフォルダパス)";

const todaysTasks = dv.pages(`"${semesterPath}"`)
    .where(p => p.file.name !== p.file.folder)
    .file.tasks
    .where(t => !t.completed && t.scheduled && t.scheduled.ts === today.ts);

dv.header(2, "📅 本日の受講予定");

if (todaysTasks.length > 0) {
    // 1. まず科目名（パスの特定の階層）でグループ化
    const groupedBySubject = todaysTasks.groupBy(t => {
        const pathParts = t.path.split("/");
        const semesterPathParts = semesterPath.split("/");
        // semesterPath直下のフォルダ名を科目名として取得
        return pathParts[semesterPathParts.length] || "その他";
    });

    for (let subjectGroup of groupedBySubject) {
        // 科目名を強調表示
        dv.header(3, "📚 " + subjectGroup.key);

        // 2. 科目内でノート（ファイルリンク）ごとにグループ化してタスクを表示
        dv.taskList(subjectGroup.rows.groupBy(t => t.link), false);
    }
} else {
    dv.paragraph("本日の予定はありません。ゆっくり休みましょう！☕");
}
```

## 関連ノート
- [[進捗率]]
- [[データサイエンティストお仕事図鑑]]
