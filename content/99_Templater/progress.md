---
fields:
  - name: progress
    type: Formula
    options:
      autoUpdate: true
      formula: Math.round((current.file.tasks.where(t => t.completed).length / current.file.tasks.length) * 100)
    path: ""
    id: kygmSo
version: "2.0"
limit: 20
mapWithTag: false
icon: package
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - kygmSo
date created: 2024 02 19  22:33:06
date modified: 2024 02 19  22:37:17
---
