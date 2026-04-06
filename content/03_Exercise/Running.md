<div style="text-align: left;">
  <img src="https://thumb.photo-ac.com/2d/2db5d1cb04a8f5e9499e47951026c8af_t.jpeg" width="400" height="200">
</div>

# なぜ走るのか
どちらかというと室伏広治型の体系（大げさ）なので長距離走はとにかく苦手です。
しかし歳をとって瞬発力が落ちてきた代わりに、少し長距離を走れるようになってきました。
とはいえ向いてないのは変わらないので、ゆっくりマイペースに走っています。

じゃあなんで向いてないのに走るのかというと、運動しないととにかく体調が悪いからというだけです。
なので大会に出たこともありません。ぼちぼちハーフマラソンくらいは記念に出てもいいかなと思いつつ。

# ラン友が欲しい
走り始めて2年近く経ち、途中仕事が忙しすぎて半年くらい走れない時期もありつつ、細々と走り続けています。
2024年は月間160kmくらい走る月もありましたが、最近はそんなに時間を取れないのもあり、良くて80kmくらいです。
100kmは目指したいなあ。
ひとりだとどうしても忙しいからとか理由をつけてサボってしまうので、ラン友が欲しいこの頃です。

<div style="text-align: left;">
  <img src="https://thumb.photo-ac.com/1a/1a98a824f7112e6ecf6855dcd93b1eee_t.jpeg" width="400" height="200">
</div>


# 実績
```dataviewjs
const folder = "000_Publish/05.Running";

// ノート取得 & "Running" を除外
let pages = dv.pages(`"${folder}"`)
    .where(p => p.file.name && p.file.name != "Running")
    .sort(p => {
        let match = p.file.name.match(/(\d{4})W(\d{1,2})/);
        if (match) return Number(match[1]) * 100 + Number(match[2]);
        else return 0;
    }, "asc");

// ラベル・データ抽出
let labels = [];
let distances = [];
let times = [];
let cumDistances = [];
let cumTimes = [];
let paceKmh = [];

let totalDist = 0;
let totalTime = 0;

for (let p of pages) {
    let match = p.file.name.match(/(\d{4}W\d{1,2})/);
    let label = match ? match[1] : p.file.name;
    labels.push(label);

    let dist = p.distance ? Number(String(p.distance).replace(/[^\d.]/g,"")) : 0;
    let time = p.time ? Number(String(p.time).replace(/[^\d.]/g,"")) : 0;

    distances.push(dist);
    times.push(time);

    totalDist += dist;
    totalTime += time;
    cumDistances.push(totalDist);
    cumTimes.push(totalTime);

    // 平均ペース km/h
    let pace = time > 0 ? (dist / time) * 60 : 0;
    paceKmh.push(pace);
}

// Canvas作成
let canvas = dv.el("canvas", "", { width: 800, height: 450 });

// Chart.js 描画
await loadChartJS();

new Chart(canvas, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            // 左軸
            { label: 'Distance (km)', data: distances, borderColor: 'blue', fill: false, tension: 0.2, yAxisID: 'yAxisLeft' },
            { label: 'Cumulative Distance (km)', data: cumDistances, borderColor: 'blue', borderDash: [5,5], fill: false, tension: 0.2, yAxisID: 'yAxisLeft' },
            
            // 右軸1
            { label: 'Time (min)', data: times, borderColor: 'red', fill: false, tension: 0.2, yAxisID: 'yAxisRight1' },
            { label: 'Cumulative Time (min)', data: cumTimes, borderColor: 'red', borderDash: [5,5], fill: false, tension: 0.2, yAxisID: 'yAxisRight1' },
            
            // 右軸2（Pace）
            { label: 'Average Pace (km/h)', data: paceKmh, borderColor: 'green', fill: false, tension: 0.2, yAxisID: 'yAxisRight2' }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
            yAxisLeft: { type: 'linear', position: 'left', title: { display: true, text: 'Distance (km)' }, beginAtZero: true },
            yAxisRight1: { type: 'linear', position: 'right', title: { display: true, text: 'Time (min)' }, beginAtZero: true, grid: { drawOnChartArea: false } },
            yAxisRight2: { type: 'linear', position: 'right', title: { display: true, text: 'Average Pace (km/h)' }, beginAtZero: true, grid: { drawOnChartArea: false } }
        }
    }
});

// Chart.js ローダー
async function loadChartJS() {
    if (window.Chart) return;
    await loadScript("https://cdn.jsdelivr.net/npm/chart.js");
}
async function loadScript(src) {
    return new Promise((res, rej) => {
        let s = document.createElement("script");
        s.src = src;
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
    });
}
```
```dataview
TABLE without id
link(file.path, regexreplace(file.name, "RunLog_(\\d{4})W(\\d+)", "$1_W$2")) AS "週",
distance AS "距離（km）",
time AS "時間（分）",
times AS "回数"
FROM "000_Publish/05.Running"
WHERE file.path != this.file.path
SORT file.mtime ASC
```