const $=id=>document.getElementById(id);
let pins=JSON.parse(localStorage.getItem("myPins")||"[]");
function save(){localStorage.setItem("myPins",JSON.stringify(pins));}
document.querySelectorAll("#tabs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll("#tabs button").forEach(x=>x.classList.toggle("selected",x===b));
 document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.id===b.dataset.tab));
});
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 $("myPins").innerHTML=pins.map((p,i)=>`<article class="pin-card">
 <div class="pin-row"><span class="pin-dot ${p.seen?'green':'grey'}"></span><b>${esc(p.name)}</b><span class="kind">${esc(p.type)}</span></div>
 <div class="meta">${esc(p.location||"Локация не указана")}</div>
 <button data-open="${i}">Открыть карточку</button> <button data-del="${i}">Удалить</button>
 <div class="pin-content" id="content-${i}" hidden>${esc(p.contents||"Содержимое не указано.")}</div></article>`).join("");
 $("myPins").querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{
  const i=+b.dataset.open; pins[i].seen=true;save();render();
  const el=$("content-"+i);el.hidden=!el.hidden;
 });
 $("myPins").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{pins.splice(+b.dataset.del,1);save();render()});
 const done=pins.filter(p=>p.seen).length;
 $("stats").textContent=`Просмотрено: ${done} из ${pins.length}`;
}
$("add").onclick=()=>{
 const name=$("newName").value.trim();if(!name){alert("Укажи название метки");return;}
 pins.push({name,type:$("newType").value,location:$("newLoc").value.trim(),contents:$("newContents").value.trim(),seen:false});
 save();$("newName").value="";$("newLoc").value="";$("newContents").value="";render();
};
render();
