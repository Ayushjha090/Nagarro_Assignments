const axios = require('axios');

module.exports.tweetPageController = (req, res) => {
    if(req.isAuthenticated()){
        const userData = req.user.data[0];
        axios
        .get(`http://127.0.0.1:8000/tweet/${userData.id}`)
        .then(result => {
            const tweets = result.data;
            axios.get(`http://127.0.0.1:8000/tweet/trending`)
            .then(trendingTweetsResult => {
                const trendingTweets = trendingTweetsResult.data;
                res.render('main', {name: userData.name, page: req.params.page, tweets, userData, trendingTweets, title: req.params.page});
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
    } else {
        console.log("err");
        res.redirect('/');
    }
}