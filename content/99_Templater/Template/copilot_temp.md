<%*
s = tp.file.selection()
if(s){
  tp.file.cursor_append(s)
}else{
  e = app.workspace.activeLeaf.view.editor
  p = e.getCursor().line
  s = e.getLine(p)
}
s = s.replace("このノート", "{activeNote}")
s = s.replace("この保管庫", "@vault")
c = "copilot:chat-open-window"
app.commands.executeCommandById(c)
d = document.querySelector(".chat-container textarea")
d.value = s
%>