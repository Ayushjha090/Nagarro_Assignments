let buttons = document.getElementsByClassName('btn');

for (let btn of buttons){
    btn.addEventListener('click', function(){
        let trainerName = btn.getAttribute('data-value');
        if(confirm("Ready to go?")){
            let page = "./trainers/" + trainerName + ".html";
            window.location.href = page;
        }
    });
}