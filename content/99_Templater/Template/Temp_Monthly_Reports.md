---
savings:
---

# 🔄 今月の振り返り（{{date:YYYY-MM}}）
## 📊Important Index📊
```dataviewjs
// === 1. 対象月の設定 ===
const targetMonth = "{{date:YYYY-MM}}"; 
const startOfMonth = moment(targetMonth + "-01", "YYYY-MM-DD");
const endOfMonth = startOfMonth.clone().endOf("month");

// === 2. 対象ノート取得 ===
const pages = dv.pages("#dailyjournal")
  .filter(p => {
    const d = moment(p.file.name, "YYYY-MM-DD");
    return d.isValid() && d.isSameOrAfter(startOfMonth, 'day') && d.isSameOrBefore(endOfMonth, 'day');
  });

// === 3. フィールド定義 ===
const fields = [
  { key: "sleep", title: "SLEEP" },
  { key: "ExerciseTime", title: "EXERCISE" },
  { key: "StudyTime", title: "STUDY" },
  { key: "WorkTime", title: "WORK" },
  { key: "weight", title: "WEIGHT" },
  { key: "FatRate", title: "FAT RATE" },
];

// === 4. 睡眠計算 ===
function getSleepDuration(p) {
  if (!p.SleepFrom || !p.SleepTo) return null;
  const s = moment(p.SleepFrom.toString());
  const e = moment(p.SleepTo.toString());
  if (!s.isValid() || !e.isValid()) return null;
  const diff = moment.duration(e.diff(s)).asHours();
  return (diff > 0 && diff < 24) ? Math.round(diff * 10) / 10 : null;
}

// === 強力なデータ取得関数（大文字小文字を無視） ===
function getFlexibleValue(page, searchKey) {
  // pageオブジェクトの全キーを確認
  const actualKey = Object.keys(page).find(k => k.toLowerCase() === searchKey.toLowerCase());
  return actualKey ? page[actualKey] : null;
}

// === 5. 週別データのマッピング ===
const weekMap = {}; 

pages.forEach(p => {
  const date = moment(p.file.name, "YYYY-MM-DD");
  const weekLabel = date.format("GGGG-[W]WW");

  if (!weekMap[weekLabel]) weekMap[weekLabel] = {};

  fields.forEach(field => {
    let val = null;
    if (field.key === "sleep") {
      val = getSleepDuration(p);
    } else {
      // 大文字小文字を無視して値を取得
      let raw = getFlexibleValue(p, field.key);
      if (raw != null && raw !== "") {
        let clean = String(raw).replace(/[^\d.]/g, '');
        val = clean !== "" ? parseFloat(clean) : null;
      }
    }

    if (val !== null && !isNaN(val)) {
      if (!weekMap[weekLabel][field.key]) weekMap[weekLabel][field.key] = [];
      weekMap[weekLabel][field.key].push(val);
    }
  });
});

const sortedWeeks = Object.keys(weekMap).sort();

// === 6. 表データ構築 ===
const tableData = fields.map(field => {
  let totalSum = 0;
  let totalCount = 0;
  const row = [field.title];

  sortedWeeks.forEach(week => {
    const vals = weekMap[week][field.key] || [];
    if (vals.length > 0) {
      totalSum += vals.reduce((a, b) => a + b, 0);
      totalCount += vals.length;
    }
  });

  row.push(totalCount > 0 ? (Math.round(totalSum * 10) / 10) : "0");
  row.push(totalCount > 0 ? (totalSum / totalCount).toFixed(2) : "0");

  sortedWeeks.forEach(week => {
    const vals = weekMap[week][field.key] || [];
    const avg = vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "-";
    row.push(avg);
  });

  return row;
});

// === 7. 出力 ===
if (sortedWeeks.length > 0) {
    const header = ["TITLE", "SUM", "MONTH AVG", ...sortedWeeks];
    dv.table(header, tableData);
} else {
    dv.paragraph("⚠️ 2026年のデータはまだありません。");
}

```
## ☀️DailyConditions
 ![[daily_conditions_2026#WEEKLY]]
## ⏳TIME CONSUMPTION⏳
### CHARTS
```dataviewjs
// 1. 対象月の設定
const targetMonth = "{{date:YYYY-MM}}"; 
const startOfMonth = moment(targetMonth + "-01", "YYYY-MM-DD");
const endOfMonth = startOfMonth.clone().endOf("month");

const pages = dv.pages("#dailyjournal").filter(p => {
  const d = moment(p.file.name, "YYYY-MM-DD");
  return d.isSameOrAfter(startOfMonth, 'day') && d.isSameOrBefore(endOfMonth, 'day');
});

function getSleepDuration(p) {
  if (!p.SleepFrom || !p.SleepTo) return 0;
  const s = moment(p.SleepFrom.toString());
  const e = moment(p.SleepTo.toString());
  if (!s.isValid() || !e.isValid()) return 0;
  const hours = moment.duration(e.diff(s)).asHours();
  return (hours > 0 && hours < 24) ? Math.round(hours * 10) / 10 : 0;
}

let totalMetrics = { SLEEP: 0, WORK: 0, STUDY: 0, EXERCISE: 0, OTHERS: 0 };
pages.forEach(p => {
  const sleep = getSleepDuration(p);
  const work = p.WorkTime || 0;
  const study = p.StudyTime || 0;
  const exercise = p.ExerciseTime || 0;
  totalMetrics.SLEEP += sleep;
  totalMetrics.WORK += work;
  totalMetrics.STUDY += study;
  totalMetrics.EXERCISE += exercise;
  totalMetrics.OTHERS += Math.max(0, 24 - (sleep + work + study + exercise));
});

const sortedPairs = Object.entries(totalMetrics).map(([l, v]) => [l, Math.round(v * 10) / 10]).sort((a, b) => b[1] - a[1]);
const labels = sortedPairs.map(p => p[0]);
const values = sortedPairs.map(p => p[1]);

// --- 6. レイアウト作成（無限ループ防止・超堅牢版） ---

// 表示用のIDを作成（ノート内で一意にする）
const chartId = "monthly-analysis-chart-" + targetMonth;

// すでに器があるか確認し、なければ作成、あれば中身を捨てる
let mainWrapper = this.container.querySelector(`#${chartId}`);
if (!mainWrapper) {
    mainWrapper = this.container.createEl("div", { id: chartId });
} else {
    mainWrapper.innerHTML = "";
}

// スタイル設定（横並び50%）
mainWrapper.style.width = "50%";
mainWrapper.style.minWidth = "600px";
mainWrapper.style.display = "flex";
mainWrapper.style.gap = "15px";

const barDiv = mainWrapper.createEl("div", { style: "flex: 1; height: 250px;" });
const pieDiv = mainWrapper.createEl("div", { style: "flex: 1; height: 250px;" });

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#C9CBCF"]; 

// --- 7. 描画実行 ---
const render = () => {
    window.renderChart({
        type: 'bar',
        data: { labels: labels, datasets: [{ data: values, backgroundColor: colors }] },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: 'Time Share (h)', font: { size: 10 } } },
            responsive: true
        }
    }, barDiv);

    window.renderChart({
        type: 'pie',
        data: { labels: labels, datasets: [{ data: values, backgroundColor: colors }] },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 }, padding: 5 } } },
            responsive: true
        }
    }, pieDiv);
};

// 少しだけ遅延させて描画（Obsidianのレンダリング競合を避ける）
setTimeout(render, 50);
```
### In Detail
```dataviewjs
// 1. 対象月の設定（今月と先月）
const targetMonth = "{{date:YYYY-MM}}"; 
const startThisMonth = moment(targetMonth + "-01", "YYYY-MM-DD");
const endThisMonth = startThisMonth.clone().endOf("month");

const startLastMonth = startThisMonth.clone().subtract(1, 'month');
const endLastMonth = startLastMonth.clone().endOf("month");

// 2. データ集計関数
function getMonthlyMetrics(start, end) {
    const pages = dv.pages("#dailyjournal").filter(p => {
        const d = moment(p.file.name, "YYYY-MM-DD");
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day');
    });

    let metrics = { sleep: 0, work: 0, study: 0, exercise: 0, others: 0, count: 0 };
    
    pages.forEach(p => {
        const s = p.SleepFrom && p.SleepTo ? (() => {
            const start = moment(p.SleepFrom.toString());
            const end = moment(p.SleepTo.toString());
            return (start.isValid() && end.isValid()) ? Math.max(0, moment.duration(end.diff(start)).asHours()) : 0;
        })() : 0;
        
        metrics.sleep += s;
        metrics.work += p.WorkTime || 0;
        metrics.study += p.StudyTime || 0;
        metrics.exercise += p.ExerciseTime || 0;
        metrics.others += Math.max(0, 24 - (s + (p.WorkTime || 0) + (p.StudyTime || 0) + (p.ExerciseTime || 0)));
        metrics.count++;
    });
    return metrics;
}

// 3. 集計実行
const thisM = getMonthlyMetrics(startThisMonth, endThisMonth);
const lastM = getMonthlyMetrics(startLastMonth, endLastMonth);

// 4. 分析インサイトの生成
const diffFree = thisM.others - lastM.others;
const diffWork = thisM.work - lastM.work;
const diffStudy = thisM.study - lastM.study;

let insights = [];
if (thisM.count > 0 && lastM.count > 0) {
    // 自由時間の変化
    if (Math.abs(diffFree) > 10) {
        insights.push(diffFree > 0 
            ? `🟢 自由時間が先月より **${diffFree.toFixed(1)}h** 増加しました。自分を労わる時間が増えています。` 
            : `🟠 自由時間が先月より **${Math.abs(diffFree).toFixed(1)}h** 減少しています。タスクが過密かもしれません。`);
    }
    // 投資時間（勉強・仕事）の変化
    if (diffStudy > 5) insights.push(`📚 勉強時間が **${diffStudy.toFixed(1)}h** アップ！自己投資が加速しています。`);
    if (diffWork > 15) insights.push(`💼 仕事の比重が **${diffWork.toFixed(1)}h** 増加しました。ハードな月でしたね。`);
}

// 5. 表示 (UI)
const insightContainer = this.container.createEl("div", {
    style: "background-color: rgba(100, 100, 100, 0.05); padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid rgba(100,100,100,0.2);"
});

insightContainer.createEl("h3", { text: `🌙 ${targetMonth} 月間インサイト`, style: "margin-top: 0; color: var(--text-accent);" });

if (insights.length > 0) {
    const list = insightContainer.createEl("ul", { style: "margin-bottom: 0;" });
    insights.forEach(text => list.createEl("li", { text: text, style: "margin-bottom: 8px;" }));
} else {
    insightContainer.createEl("p", { text: "先月とほぼ同じリズムを維持できました。安定した1ヶ月です。", style: "font-style: italic;" });
}

// --- 以下、既存のグラフ描画コード ---
const totalHours = thisM.sleep + thisM.work + thisM.study + thisM.exercise + thisM.others;
const sortedData = [
    ["SLEEP", thisM.sleep], ["WORK", thisM.work], ["STUDY", thisM.study], ["EXERCISE", thisM.exercise], ["OTHERS", thisM.others]
].sort((a, b) => b[1] - a[1]);

// (以下、sortedDataを使ってグラフを描画...)

```
## 🔥💣UNCOMPLETED TASKS💣🔥
```tasks
happens before today
not done
sort by description 
short mode
```

## 🏃進捗
- [p] 
## ✒️課題
- [f] 

---

## 🌓Last Month
> ![[{{date-1M:YYYY-MM}}#📅 来月のやることリスト({{date:YYYY-MM}})]]

# 📅 来月のやることリスト({{date +1M:YYYY-MM}})
## 🎯 主要目標
- [*] 
- [*] 
