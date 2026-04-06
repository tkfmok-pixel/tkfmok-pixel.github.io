```dataviewjs
// ⚠️ 以下のファイル名を、分析したい元のノートファイル名に置き換えてください。
const SOURCE_FILE_NAME = "000_Publish/02.Study/G検定/G検定問題集"; 

// --- 設定 ---
const threshold = 70; // 基準値(%)
const successColor = 'rgba(54, 162, 235, 0.6)'; // 青色（合格）
const successBorder = 'rgba(54, 162, 235, 1)';
const dangerColor = 'rgba(255, 99, 132, 0.6)';  // 赤色（不合格）
const dangerBorder = 'rgba(255, 99, 132, 1)';

// ファイルの内容を読み込み
const file = app.vault.getAbstractFileByPath(`${SOURCE_FILE_NAME}.md`);
if (!file) {
    dv.paragraph(`⚠️ ファイルが見つかりません: **${SOURCE_FILE_NAME}.md** を確認してください。`);
    return;
}
const content = await app.vault.read(file);
const lines = content.split("\n");

// --- 集計ロジック（前回のコードと同じ） ---
let sectionCounts = [];
let currentSection = null;
const h2Regex = /^##\s+(.+)$/;
const listRegex = /^\s*[-*]\s/;
const correctRegex = /⭕/;

for (let line of lines) {
    const h2Match = line.match(h2Regex);
    if (h2Match) {
        currentSection = h2Match[1].trim();
        sectionCounts.push({ name: currentSection, total: 0, correct: 0 });
        continue;
    }
    if (currentSection && listRegex.test(line)) {
        let secObj = sectionCounts[sectionCounts.length - 1];
        secObj.total++;
        if (correctRegex.test(line)) {
            secObj.correct++;
        }
    }
}

// --- グラフ用データ作成 ---
const labels = [];
const dataPoints = [];
const bgColors = [];
const borderColors = [];

sectionCounts.forEach(s => {
    // 問題数が0のセクションはグラフから除外
    if (s.total === 0) return; 

    labels.push(s.name);
    
    let rate = (s.correct / s.total) * 100;
    dataPoints.push(rate.toFixed(1));

    // 色の判定ロジック
    if (rate < threshold) {
        bgColors.push(dangerColor);
        borderColors.push(dangerBorder);
    } else {
        bgColors.push(successColor);
        borderColors.push(successBorder);
    }
});

// --- グラフ描画 ---
dv.header(2, `📊 ${SOURCE_FILE_NAME} - セクション別 正解率`);
const chartData = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '正解率 (%)',
            data: dataPoints,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: `正解率 (${threshold}%未満は赤)` }
        },
        scales: {
            x: { min: 0, max: 100, ticks: { stepSize: 20 } }
        }
    }
};

window.renderChart(chartData, this.container);

// --- 詳細テーブル表示（赤字装飾付き） ---
dv.header(4, "集計詳細");
const tableRows = sectionCounts
    .filter(s => s.total > 0) // 問題数0のセクションを除外
    .map(s => {
    let rateVal = (s.correct / s.total) * 100;
    let rateStr = rateVal.toFixed(1) + "%";
    
    // 文字色の判定ロジック
    if (rateVal < threshold) {
        rateStr = `<span style="color: #ff6384; font-weight: bold;">${rateStr} ⚠️</span>`;
    }

    return [s.name, `${s.correct} / ${s.total}`, rateStr];
});

dv.table(["セクション名", "正解数 / 総数", "正解率"], tableRows);
```
