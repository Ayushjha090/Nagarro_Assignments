// Using Vanilla JavaScript

// let copyBtn = document.getElementById('copy-btn');

// function copyFunction(){
//     let text = document.getElementById('text');
//     text.select();
//     text.setSelectionRange(0, 1000);
//     navigator.clipboard.writeText(text.value);
// }

// copyBtn.addEventListener('click', copyFunction);

// Using JQuery
$('#copy-btn').on('click', function(){
    let text = $('#text');
    text.select();
    // text.setSelectionRange(0, 1000);
    navigator.clipboard.writeText(text.val());
});