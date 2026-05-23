let tasks = [];
let filter = "all";
let editIndex = null;

/* ADD */
function addTask(){
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  if(!title || !date || !time){
    alert("⚠ Please fill all fields");
    return;
  }

  tasks.push({
    title,
    date,
    time,
    done:false
  });

  clear();
  render();
}

/* CLEAR */
function clear(){
  title.value="";
  date.value="";
  time.value="";
}

/* FORMAT TIME */
function formatTime(t){
  let [h,m]=t.split(":");
  let ampm = h>=12?"PM":"AM";
  h = h%12 || 12;
  return `${h}:${m} ${ampm}`;
}

/* SORT */
function sortTasks(){
  tasks.sort((a,b)=>
    new Date(a.date+" "+a.time)-new Date(b.date+" "+b.time)
  );
}

/* RENDER */
function render(){
  sortTasks();

  let list=document.getElementById("list");
  list.innerHTML="";

  let total=tasks.length;
  let active=tasks.filter(t=>!t.done).length;
  let done=tasks.filter(t=>t.done).length;

  totalEl.innerText=total;
  activeEl.innerText=active;
  doneEl.innerText=done;

  tasks.forEach((t,i)=>{
    if(filter==="active" && t.done) return;
    if(filter==="done" && !t.done) return;

    list.innerHTML+=`
      <div class="task ${t.done?'done':''}">
        <div>
          <b>📝 ${t.title}</b><br>
          <small>📅 ${t.date} ⏰ ${formatTime(t.time)}</small>
        </div>

        <div>
          <button onclick="toggle(${i})">✔</button>
          <button onclick="edit(${i})">✏</button>
          <button onclick="del(${i})">🗑</button>
        </div>
      </div>
    `;
  });
}

/* TOGGLE */
function toggle(i){
  tasks[i].done=!tasks[i].done;
  render();
}

/* DELETE */
function del(i){
  if(confirm("🗑 Delete task?")){
    tasks.splice(i,1);
    render();
  }
}

/* EDIT */
function edit(i){
  editIndex=i;
  document.getElementById("editTitle").value=tasks[i].title;
  document.getElementById("modal").style.display="flex";
}

function saveEdit(){
  tasks[editIndex].title=document.getElementById("editTitle").value;
  document.getElementById("modal").style.display="none";
  render();
}

/* FILTER */
function setFilter(f){
  filter=f;
  render();
}

/* COUNTER */
let totalEl=document.getElementById("total");
let activeEl=document.getElementById("active");
let doneEl=document.getElementById("done");

render();