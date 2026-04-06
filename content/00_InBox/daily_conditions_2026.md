---
tags:
  - dataviewjs
  - data-visualization
  - chart-generation
  - dailyjournal
  - mood-tracking
  - sleep-tracking
  - weight-tracking
  - weather-tracking
  - line-chart
  - bar-chart
  - data-analysis
  - javascript
  - dataview
  - monthly-data
  - weekly-data
  - daily-data
---
# MONTHLY
```dataviewjs
function getSleep(p) {
  if (!p.SleepFrom || !p.SleepTo) return null;
  const s = moment(p.SleepFrom.toString()), e = moment(p.SleepTo.toString());
  if (!s.isValid() || !e.isValid()) return null;
  const h = moment.duration(e.diff(s)).asHours();
  return (h > 0 && h < 24) ? Math.round(h * 10) / 10 : null;
}

const pages = dv.pages('#dailyjournal')
  .filter(p => p.file.name >= "2026-01-01" && p.file.name <= "2026-12-31")
  .sort(p => p.file.name);

function getMonthlyAvg(pages) {
  const map = new Map();
  // 1月〜12月をあらかじめ初期化
  for(let i=1; i<=12; i++) {
    const m = `2026-${String(i).padStart(2, '0')}`;
    map.set(m, { mood: [], sleep: [], weight: [] });
  }
  for (const p of pages) {
    const month = moment(p.file.name).format("YYYY-MM");
    if (map.has(month)) {
      const s = getSleep(p);
      if (s !== null) map.get(month).sleep.push(s);
      if (p.mood != null) map.get(month).mood.push(Number(p.mood));
      if (p.weight != null) map.get(month).weight.push(Number(p.weight));
    }
  }
  return map;
}

const monthlyMap = getMonthlyAvg(pages);
const labels = Array.from(monthlyMap.keys()).sort();

const chartData = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      { label: 'Sleep', data: labels.map(m => {const d = monthlyMap.get(m).sleep; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), borderColor: 'rgba(255, 99, 132, 1)', yAxisID: 'y' },
      { label: 'Mood', data: labels.map(m => {const d = monthlyMap.get(m).mood; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), type: 'bar', backgroundColor: 'rgba(75, 148, 78, 0.5)', yAxisID: 'y1' },
      { label: 'Weight', data: labels.map(m => {const d = monthlyMap.get(m).weight; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), borderColor: 'rgba(54, 162, 235, 1)', borderDash: [5,5], yAxisID: 'y2' }
    ]
  },
  options: {
    scales: {
      y: { position: 'left', min: 0, max: 12 },
      y1: { position: 'right', min: 0, max: 10, grid: { drawOnChartArea: false } },
      y2: { position: 'right', grid: { drawOnChartArea: false } }
    }
  }
};
window.renderChart(chartData, this.container);
```

# WEEKLY

```dataviewjs
function getSleep(p) {
  if (!p.SleepFrom || !p.SleepTo) return null;
  const s = moment(p.SleepFrom.toString()), e = moment(p.SleepTo.toString());
  const h = moment.duration(e.diff(s)).asHours();
  return (h > 0 && h < 24) ? Math.round(h * 10) / 10 : null;
}

const pages = dv.pages('#dailyjournal')
  .filter(p => p.file.name >= "2026-01-01" && p.file.name <= "2026-12-31")
  .sort(p => p.file.name);

function getWeeklyAvg(pages) {
  const map = new Map();
  for (const p of pages) {
    const week = moment(p.file.name).format("GGGG-[W]WW");
    if (!map.has(week)) map.set(week, { mood: [], sleep: [], weight: [] });
    const s = getSleep(p);
    if (s !== null) map.get(week).sleep.push(s);
    if (p.mood != null) map.get(week).mood.push(Number(p.mood));
    if (p.weight != null) map.get(week).weight.push(Number(p.weight));
  }
  return map;
}

const weeklyMap = getWeeklyAvg(pages);
const labels = Array.from(weeklyMap.keys()).sort();

const chartData = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      { label: 'Sleep', data: labels.map(w => {const d = weeklyMap.get(w).sleep; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), borderColor: 'rgba(255, 99, 132, 1)', yAxisID: 'y' },
      { label: 'Mood', data: labels.map(w => {const d = weeklyMap.get(w).mood; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), type: 'bar', backgroundColor: 'rgba(75, 148, 78, 0.5)', yAxisID: 'y1' },
      { label: 'Weight', data: labels.map(w => {const d = weeklyMap.get(w).weight; return d.length ? (d.reduce((a,b)=>a+b)/d.length).toFixed(1) : null}), borderColor: 'rgba(54, 162, 235, 1)', borderDash: [5,5], yAxisID: 'y2' }
    ]
  },
  options: {
    scales: {
      y: { position: 'left', min: 0, max: 12 },
      y1: { position: 'right', min: 0, max: 10, grid: { drawOnChartArea: false } },
      y2: { position: 'right', grid: { drawOnChartArea: false } }
    }
  }
};
window.renderChart(chartData, this.container);
```
# DAILY
```dataviewjs
const pages = dv.pages('#dailyjournal')
  .filter(p => p.file.name >= "2026-01-01" && p.file.name <= "2026-12-31")
  .sort(p => p.file.name)
  .array()
  .slice(-30); // 2026年内の直近30日

function getSleep(p) {
  if (!p.SleepFrom || !p.SleepTo) return 0;
  const s = moment(p.SleepFrom.toString()), e = moment(p.SleepTo.toString());
  const h = moment.duration(e.diff(s)).asHours();
  return (h > 0 && h < 24) ? Math.round(h * 10) / 10 : 0;
}

const labels = pages.map(p => moment(p.file.name).format("MM/DD"));
const sleep = pages.map(p => getSleep(p));
const mood = pages.map(p => p.mood || null);
const weight = pages.map(p => p.weight || null);

const chartData = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      { label: 'Sleep', data: sleep, borderColor: 'rgba(255, 99, 132, 1)', yAxisID: 'y', tension: 0.3 },
      { label: 'Mood', data: mood, type: 'bar', backgroundColor: 'rgba(75, 148, 78, 0.5)', yAxisID: 'y1' },
      { label: 'Weight', data: weight, borderColor: 'rgba(54, 162, 235, 1)', borderDash: [5,5], yAxisID: 'y2', spanGaps: true }
    ]
  },
  options: {
    scales: {
      y: { position: 'left', min: 0, max: 12 },
      y1: { position: 'right', min: 0, max: 10, grid: { drawOnChartArea: false } },
      y2: { position: 'right', grid: { drawOnChartArea: false } }
    }
  }
};
window.renderChart(chartData, this.container);

```