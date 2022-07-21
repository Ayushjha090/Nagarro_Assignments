let getScoreBtnContainer = document.getElementById('get-score-btn-container');
let getScoreBtn = document.getElementById('get-score-btn');
let matchesContainer = document.getElementById('matches-container');

function getDataAjax(){
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(){
        let res = xhrRequest.response;
        let JSONres = JSON.parse(res);
        let data = JSONres.data;
        for(let i = 0; i < data.length; ++i){
            let matchTitle = data[i].name, venue = data[i].venue, team1 = data[i].teamInfo[0], team2 = data[i].teamInfo[1], team1Score = data[i].score[0], team2Score = data[i].score[1], result = data[i].status;
            if(team1Score == undefined){
                team1Score = {
                    "r": 0,
                    "w": 0,
                    "o": 0
                }
            }
            if(team2Score == undefined){
                team2Score = {
                    "r": 0,
                    "w": 0,
                    "o": 0
                }
            }
            addScoresToHtml(matchTitle, venue, result, team1, team2, team1Score, team2Score);
        }
    }
    xhrRequest.open('get', 'https://api.cricapi.com/v1/currentMatches?apikey=83193d98-7e01-4288-9769-e4e80195de39&offset=0', true);
    xhrRequest.send();
}

function addScoresToHtml(matchTitle, venue, result, team1, team2, team1Score, team2Score){
    let temp = document.createElement('div');
    let html = `<div class="scores-container row my-3">
    <div class="col-12 col-md-6 card my-2 mx-auto">
        <div class="card-body bg-light">
            <h5 class="card-title">${matchTitle}</h5>
            <p class="fs-6">${venue}</p>
            <div class="p-3 d-flex justify-content-between">
                <div class="d-flex flex-column flex-md-row">
                    <img class="team-img my-auto mx-auto mx-md-1" src="${team1.img}">
                    <div class="mx-1">
                        <small>${team1.name}</small>
                        <p class="m-0 fs-5 fw-bold fst-italic">${team1Score.r}/${team1Score.w}</p>
                        <small>${team1Score.o}</small>
                    </div>
                </div>
                <div class="d-flex flex-column flex-md-row">
                    <img class="team-img my-auto mx-auto mx-md-1" src="${team2.img}">
                    <div class="mx-1">
                        <small>${team2.name}</small>
                        <p class="m-0 fs-5 fw-bold fst-italic">${team2Score.r}/${team2Score.w}</p>
                        <small>${team2Score.o}</small>
                    </div>
                </div>
            </div>
            <p class="m-0 fs-5 fst-italic text-danger">${result}</p>
        </div>
    </div>
    </div>`
    temp.innerHTML = html;
    matchesContainer.appendChild(temp);
}

function getScores(){
    getScoreBtnContainer.style.display = 'none';
    getDataAjax();
    matchesContainer.style.display = 'block';
}

getScoreBtn.addEventListener('click', getScores);