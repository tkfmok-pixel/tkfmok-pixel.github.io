---
date created: 2024 08 27  12:19:44
date modified: 2024 12 31  17:10:26
---

```button
name DIARY
type command
action Excalidraw: Create new drawing - IN THE CURRENT ACTIVE WINDOW - and embed into active document
color light blue
```
^button-excali

```button
name thino
type command
action Thino: Show-thino in popover(Hover editor)
color yellow
```
^button-Thino

```button
name ink
type command
action Ink: Insert new handwriting section
color purple
```^button-ink

```handwritten-ink
{
	"versionAtEmbed": "0.2.6",
	"filepath": "Ink/Writing/2024.9.22 - 19.00pm.writing"
}
```

```button
name News
type link
action https://www.asahi.com/
color red
```
^button-news

```button
name Runlog
type note(function(){return this.inputEl.value}) template
action temp_running
color green
folder 30_RunLog
prompt false
```

```button
name daily
type command
action Daily notes: Open today's daily note
```
^button-daily
