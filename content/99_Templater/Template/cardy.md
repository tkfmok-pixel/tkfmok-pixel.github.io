<%*
s = tp.file.content
if(/\n## \n/.test(s)) {
  p = "\n## \n"
  d = s.split(p)
  d.shift()
  s = d.join(p)
  s = s.replace (/^ {4}/mg, "")
  d = s.split("\n- [ ] ")
  s = d.join("\n\n")
  p = "\n%% kanban:settings\n"
  d = s. split(p)
  if(d.length>1) d.pop()
  s = d.join(p).trim() + "\n"
} else {
  d = s.split("\n\n")
  s = d.join("\n- [ ] ")
  s = `---\nkanban-plugin: list\n---\n## \n\n- [ ] ${s}`
}
e = app.workspace.activeLeaf.view.editor
e.setValue(s)
await app.workspace.activeLeaf.rebuildView()
await new Promise(x => setTimeout(x, 500))
s = "obsidian-kanban:toggle-kanban-view"
app.commands.executeCommandById(s)
%>