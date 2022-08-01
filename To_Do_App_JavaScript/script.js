let taskList = document.getElementsByClassName('task-list');
let addTask = function(){
    let task = document.getElementById('task').value;
    let list = document.createElement('li');
    list.setAttribute('class', 'task-list-item');
    let html = `<img class="task-img" src="./checklist.png"></img> ${task}`;
    list.innerHTML = html;
    taskList[0].appendChild(list);
    document.getElementById('task').value = "";
}

let addTaskBtn = document.getElementById('submit-btn');
addTaskBtn.addEventListener('click', addTask);
