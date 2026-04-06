```base
filters:
  and:
    - file.path.contains("22_Reading/")
formulas:
  サムネ: image(image)
views:
  - type: cards
    name: Cards
    filters:
      and:
        - if(this.search,(file.name+author+description).contains(this.search), true)
    order:
      - file.basename
      - file.mtime
    sort:
      - property: file.mtime
        direction: DESC
    columnSize:
      file.name: 640
    rowHeight: medium
    image: note.image
    imageFit: ""
    imageAspectRatio: 0.85

```