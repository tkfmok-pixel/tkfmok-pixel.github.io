```dataview
TABLE WITHOUT ID
  link(file.link, file.name) AS "日付",
  mood AS "気分",
   am_mental AS "AM_Mental",
  am_energy AS "AM_Energy",
  am_intention AS "AM_Intention",
  counselor_insight_am AS "AM_Insight",
  pm_mental AS "PM_Mental",
  pm_energy AS "PM_Energy",
  pm_emotion AS "PM_Emotion",
  counselor_insight_pm AS "PM_Insight",
  gratitude_list AS "感謝",
  journal AS "ジャーナル",
  weather AS "天気",
  EarlyUp AS "早起き",
  SleepFrom AS "就寝",
  SleepTo AS "起床",
round(choice(SleepTo >= SleepFrom, SleepTo - SleepFrom, (SleepTo + dur(1 day)) - SleepFrom).hours, 1) AS "睡眠(h)",
  SleepScore AS "睡眠スコア",
  weight AS "体重",
  FatRate AS "体脂肪率",
  Calorie AS "カロリー",
  Steps AS "歩数",
  RunningDistance AS "走行距離",
  WorkTime AS "仕事時間",
  StudyTime AS "勉強時間",
  ExerciseTime AS "運動時間",
  study AS "勉強内容",
  exercise AS "運動内容",
  newspaper AS "新聞"
FROM #dailyjournal OR #mindfulness
WHERE file.day >= date(today) - dur(1 month)
  AND file.day <= date(today)
SORT file.day DESC
```
