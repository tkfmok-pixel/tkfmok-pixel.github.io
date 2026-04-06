<%*
s = tp.file.content.trim()
if(s[0] == "|"){
  d = s.split("\n")
  d.shift()
  d.shift()
  s = d.join("\n")
  s = s.replace(/^\| *(.*?) *\| *(.*?) *\|$/mg, "$1\n^[$2]")
  s = s.replace(/\n\^\[\]/g, "")
}else{
  s = s.replace(/^(.*?)$/mg, "|$1||")
  s = s.replace(/\|\n\|\^\[(.+)\]\|/g, "$1")
  s = "| | |\n|---|---|\n" + s
  }
e = app.workspace.activeLeaf.view.editor
e.setValue(s)
%>