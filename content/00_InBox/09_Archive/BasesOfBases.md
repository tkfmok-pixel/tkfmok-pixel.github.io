
> [!NOTE]- GRAPH
> Contents 
> ![[daily_conditions_2026]]

`button-daily`

```base
filters:
  and:
    - if(this.search, list(this.search).filter((file.name+note.journal+note.description).contains(value)).length == list(this.search).length, true)
formulas:
  Mood: '"🧡".repeat(mood) + "🤍".repeat(10 - mood)'
  mood: |-
    if(number(mood) < 2 , mood + "🤍🤍🤍🤍🤍",
    if(number(mood) < 4 , mood + "🧡🤍🤍🤍🤍",
    if(number(mood) < 6 , mood + "🧡🧡🤍🤍🤍",
    if(number(mood) < 8 , mood + "🧡🧡🧡🤍🤍",
    if(number(mood) < 10 , mood + "🧡🧡🧡🧡🤍",
    "🧡🧡🧡🧡🧡")))))
  Weather: |-
    if(
      number(weather) == 1, "☔️",
      if(number(weather) == 2, "☁️",
        if(number(weather) == 3, "☀️", "")
      )
    )
  🏃‍♂️‍➡️: |-
    if(
      run == true, "🏃‍♂️‍➡️","")
  📗: |+
    if( reading = true , "📗", "" )
     
  📕: |+
    if(reading == true , "📗", "")

  🧘: if(stretch == true , "🧘", "")
  ✏️: if(study == true , "✏️", "")
  💤: |-
    if(number(sleep) < 6 , sleep + "🟥",
    if(number(sleep) < 7 , sleep + "🟨🟨",
    if(number(sleep) >= 7, sleep + "🟦🟦🟦","")))
  Day: date(file.name)
  date: date(file.name)
  sleeptime: SleepTo - SleepFrom
properties:
  formula.Weather:
    displayName: ⛅️
  formula.📕:
    displayName: 📗
  formula.Day:
    displayName: Date
  note.distance:
    displayName: 🛣️
  note.time:
    displayName: ⌚️
  note.times:
    displayName: 📅
views:
  - type: table
    name: DataCener2026
    filters:
      and:
        - file.path.startsWith("01_journal")
        - file.tags.contains("dailyjournal")
        - formula.date <= today()
        - formula.date >= date( "2026-01-01")
    order:
      - file.name
      - mood
      - EarlyUp
      - study
      - exercise
      - newspaper
      - weather
      - SleepFrom
      - SleepTo
      - SleepScore
      - weight
      - FatRate
      - Calorie
      - WorkTime
      - ExerciseTime
      - StudyTime
      - RunningDistance
      - journal
      - Steps
      - formula.sleeptime
    sort:
      - property: file.name
        direction: DESC
      - property: weather
        direction: ASC
      - property: SleepTo
        direction: ASC
      - property: formula.🏃‍♂️‍➡️
        direction: DESC
      - property: formula.Weather
        direction: DESC
      - property: reading
        direction: ASC
    summaries:
      formula.mood: Empty
    columnSize:
      file.name: 103
      note.mood: 50
      note.EarlyUp: 48
      note.study: 48
      note.exercise: 52
      note.newspaper: 57
      note.weather: 50
      note.SleepScore: 75
      note.weight: 55
      note.FatRate: 59
      note.Calorie: 52
      note.WorkTime: 55
      note.ExerciseTime: 58
      note.RunningDistance: 55
      note.StudyTime: 71
      note.journal: 415
  - type: table
    name: JournalView
    filters:
      and:
        - file.path.startsWith("01_journal")
        - file.tags.contains("dailyjournal")
        - formula.date <= today()
    order:
      - file.name
      - formula.Weather
      - journal
      - formula.mood
      - formula.💤
      - formula.🏃‍♂️‍➡️
      - formula.🧘
      - formula.📕
      - formula.✏️
    sort:
      - property: file.name
        direction: DESC
      - property: formula.🏃‍♂️‍➡️
        direction: DESC
      - property: formula.Weather
        direction: DESC
      - property: reading
        direction: ASC
    summaries:
      formula.mood: Empty
    columnSize:
      file.name: 129
      formula.Weather: 51
      note.journal: 415
      formula.mood: 138
      formula.💤: 104
      formula.🏃‍♂️‍➡️: 37
      formula.🧘: 34
      formula.📕: 45
      formula.✏️: 45
  - type: cards
    name: Clippings
    image: note.image
  - type: table
    name: Publish
    filters:
      and:
        - file.folder.startsWith("000_Publish")
    order:
      - file.mtime
      - file.tags
      - file.name
      - file.folder
      - file.size
    sort:
      - property: file.mtime
        direction: ASC
      - property: file.folder
        direction: ASC
    columnSize:
      file.tags: 208
      file.name: 462
      file.folder: 325
    imageFit: ""
    cardSize: 240
    rowHeight: medium
  - type: table
    name: InBox
    filters:
      and:
        - file.folder.startsWith("00_InBox")
        - '!file.folder.containsAny("09_Archive")'
        - file.ext == "md"
    order:
      - file.mtime
      - file.tags
      - file.name
      - file.folder
      - file.size
    sort:
      - property: file.mtime
        direction: DESC
      - property: file.folder
        direction: ASC
    columnSize:
      file.tags: 208
      file.name: 462
      file.folder: 325
    imageFit: ""
    cardSize: 240
    rowHeight: medium
  - type: cards
    name: Books
    filters:
      and:
        - file.path.startsWith("000_Publish/03.Reading")
    image: note.image
  - type: table
    name: RunningView
    filters:
      and:
        - file.path.startsWith("000_Publish/05.Running")
        - file.path != "000_Publish/05.Running/Running.md"
    order:
      - file.name
      - distance
      - time
      - times
      - summary
    sort:
      - property: file.ctime
        direction: DESC
    cardSize: 400
    rowHeight: extra
    columnSize:
      note.distance: 71
  - type: table
    name: DataCenter

```
