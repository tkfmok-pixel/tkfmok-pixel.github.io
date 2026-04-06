
```dataviewjs
const FOLDER = "Clippings"
const URL = "x-safari-https://www.perplexity.ai"
const CSS = "font-size:small;height:6em;overflow:hidden;"

const p = dv.el("input","")
p.placeholder = "..."
p.style = "width:50%;font-size:large;border-radius:5px;"
const btn = dv.el("button","▶︎")
btn.style = "background:none;font-size:small;margin:5px;width:20px;"
const b = dv.el("div", "")
b.style = "height:800px;"
disp()

btn.onclick = () => {
  q = encodeURIComponent(p.value)
  if(q){
    open(`obsidian://search?query=${q}%20path:(${FOLDER})`)
  }else{
    open(URL) 
  }
}

p.onkeyup = () => disp()

function disp(){
  const  d = dv.pages(`"${FOLDER}"`)
  .filter(x => x.title)
  .filter(x => (x.title + x.subtitle + x.author + x.description).includes(p.value))
  .sort(x => x.file.mtime, "desc")
  .limit(400)
  .map(x => `<tr><td style="width:20%;text-align:center;border:0;"><div style="${CSS}"><a class=external-link href='${(x.source || x.link)}'><img alt="🌏️" src="${x.image || x.coverUrl || ''}"></a></div></td><td style="border:0;"><div style="${CSS}"><a class=internal-link href="${x.file.name}">${x.title} ${x.subtitle || ""}</a><br>${x.description || "..."}</div></td></tr>`)
  b.innerHTML = `<table>${d.join("\n")}</table>`
}
```
