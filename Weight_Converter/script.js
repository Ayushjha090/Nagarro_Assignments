let convertBtn = document.getElementById('convert');
let output = document.getElementById('output');

function convertWeight(){
    let input = document.getElementById('weight');
    let inputWeight = parseInt(input.value);
    let outputWeight = inputWeight/1000;
    output.innerText = outputWeight + "kg";
}

convertBtn.addEventListener('click', convertWeight);