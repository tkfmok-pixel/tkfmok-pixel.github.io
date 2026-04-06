<%*
s = tp.file.content
if(/^---\n/.test(s)){
  s = s.replace(/^---\n[\s\S\n]+\n---\n\n/, "")
  s = s.replace(/%% kanban:settings\n[\s\S\n]+\n%%/, "")
  s = s.replace(/^- \[.\] /mg, "")
  s = s.replace(/##+ \n+/, "")
  s = s.replace(/^##+ /mg, "#### ")
  s = s.replace(/\n\n+/g, "\n\n")
}else{
  s = s.replace(/^([^#])/mg, "- [ ] $1")
  s = "---\nkanban-plugin: basic\n---\n\n#### \n" + s
}
e = app.workspace.activeLeaf.view.editor
e.setValue(s)
%>