$('document').ready(function(){
    let addTask = function(taskList){
        let task = $('#task').val();
        let html = `<li class="task-list-item"> <img class="task-img" src="./checklist.png"></img> ${task} <img class="delete-img" src="./bin-with-lid.png"> </li>`;
        taskList.append(html);
        $("#task").val("");
    }

    let taskList = $('.task-list');
    
    $('#submit-btn').click(()=>{
        addTask(taskList);
    });

    taskList.on('click', '.delete-img', function(){
        $(this).parent('li').fadeOut(200);
    });

});