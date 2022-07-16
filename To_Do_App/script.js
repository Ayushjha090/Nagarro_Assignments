$('document').ready(function(){
    let submitBtn = $('#submit-btn');
    let taskList = $('.task-list');
    submitBtn.on('click', function(){
        let task = $('#task').val();
        let html = `<li class="task-list-item">` + `<span><img class="task-img" src="./checklist.png"></img></span>` + task + `</li>`;
        taskList.append(html);
    });
});