// Script for likeing the tweets
let likeBtns = document.querySelectorAll('.like-btn');
likeBtns.forEach((btn) => {
    btn.addEventListener('click', e =>{
        if(document.getElementById('userId').value !== null){
            let icon = e.target.firstElementChild;
            let count = icon.nextElementSibling;
            let isLiked = false;
            if(icon.classList.toggle('fa-solid')) {
                count.innerText = parseInt(count.innerText) + 1;
                isLiked = true;
            } else {
                count.innerText = parseInt(count.innerText) - 1;
                isLiked = false;
            }
            let data = {
                tweetId: e.target.getAttribute('data-tweetId'),
                userId: document.getElementById('userId').value,
                isLiked
            }
            fetch('/tweet/like', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Success");
            })
        }
    });
});

// Script for stoping empty posts
let tweetForm = document.getElementById('tweet-form');
try {
    tweetForm.addEventListener('submit', (e)=>{
        let tweetValue = document.getElementById('tweet').value;
        if(tweetValue === ""){
            e.preventDefault();
        }
    });
} catch (err) {
    console.log(err);
}

// Script for deleting tweets
let deleteBtns = document.querySelectorAll('.delete-tweet');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        let tweetId = btn.getAttribute('data-tweet-id');
        let userId = btn.getAttribute('data-tweet-user');
        let data = {
            tweetId,
            userId
        }
        fetch('/tweet/delete', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then(res => {
            console.log("Tweet Deleted");
        })
        .then(()=>{
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    });
});