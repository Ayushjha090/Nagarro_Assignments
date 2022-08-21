// Adding Active class in Navbar
let target = document.querySelectorAll('#navbarNavAltMarkup .navbar-nav a');
let lastActive = target[0];
for(let i = 0; i < target.length; ++i){
    target[i].addEventListener('click', ()=>{
        lastActive.classList.remove('active');
        target[i].classList.add('active');
        lastActive = target[i];
    });
}

// Auto Fill for skill bars
let skillSection = document.getElementById('skills');
let skillName = document.getElementsByClassName('skill-name');

let animationDone = 0;

// Function to initialise bars
const initialiseBars = ()=>{
    for(let i = 0; i < skillName.length; ++i){
        let skillID = "skill" + (i+1);
        let skill = document.getElementById(skillID);
        skill.style.width = "0" + "%";
    }
}
// Function to fill skill bars
const fillBars = ()=>{
    for(let i = 0; i < skillName.length; ++i){
        let skillWidth = skillName[i].getAttribute('data-width');
        let skillID = "skill" + (i+1);
        let skill = document.getElementById(skillID);
        skill.style.width = skillWidth;
    }
}
// Function to check skills section is visible or not
const checkScroll = ()=>{
    let skillSectionCoordinates = skillSection.getBoundingClientRect();
    if(!animationDone && skillSectionCoordinates.top + 200 < window.innerHeight){
        animationDone = true;
        fillBars();
    }else if(skillSectionCoordinates.top > window.innerHeight){
        initialiseBars();
        animationDone = false;
    }
}

initialiseBars();
window.addEventListener('scroll', checkScroll);