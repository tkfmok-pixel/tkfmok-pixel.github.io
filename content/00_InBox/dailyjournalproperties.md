```dataview
TABLE
  mood, weather, EarlyUp, study, exercise, newspaper,
  SleepFrom, SleepTo, SleepScore, weight, FatRate,
  Calorie, WorkTime, ExerciseTime, RunningDist, Steps, StudyTime
FROM #dailyjournal 
WHERE date(file.name) >= date(today) - dur(7 days)
and date(file.name) <= date(today)
SORT file.name DESC
```

