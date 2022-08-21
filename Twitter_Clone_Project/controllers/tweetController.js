const db =  require('../config/dbConfig');

const changeLikeCount = (tweetId, isLiked, res) => {
    let updateOperator = isLiked ? '+' : '-';
    const queryStatement = `update tweet.tweets set likeCount = likeCount ${updateOperator} 1 where id = '${tweetId}'`;
    db.query(queryStatement, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send('Error');
        } else {
            res.status(200).send('Updated');
        }
    });
}

module.exports.getTweetsController = (req, res)=>{
    const {userId} = req.params;
    const queryStatement = `SELECT u.id as userId, u.avatar as avatar, u.email as email, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.likeCount as likeCount, t.__createdtime__ as tweetTime, l.isLiked as isLiked FROM tweet.tweets as t INNER JOIN tweet.users as u ON u.id = t.userId LEFT OUTER JOIN tweet.likes as l on t.id = l.tweetId AND l.userId = '${userId}' ORDER BY t.__createdtime__ DESC`;
    db.query(queryStatement, (err, result)=>{
        if(err){
            console.log(err);
            res.send([]);
        }
        const tweets = result.data;
        tweets.forEach(tweet => {
            tweet.tweetTime = (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
            if(tweet.tweetTime >= 24) {
                tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + 'days ago';
            } else if(tweet.tweetTime < 1){
                tweet.tweetTime = 'less than an hour ago';
            } else {
                tweet.tweetTime = Math.floor(tweet.tweetTime) + "hours ago";
            }
        });
        res.send(tweets);
    });
}

module.exports.getTrendingTweetsController = (req, res)=>{
    const queryStatement = `SELECT u.id as userId, u.avatar as avatar, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.__createdtime__ as tweetTime FROM tweet.tweets as t INNER JOIN tweet.users as u ON u.id = t.userId ORDER BY t.likeCount DESC LIMIT 10`;
    db.query(queryStatement, (err, result)=>{
        if(err){
            console.log(err);
            res.send([]);
        }
        const tweets = result.data;
        tweets.forEach(tweet => {
            tweet.tweetTime = (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
            if(tweet.tweetTime >= 24) {
                tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + 'days ago';
            } else if(tweet.tweetTime < 1){
                tweet.tweetTime = 'less than an hour ago';
            } else {
                tweet.tweetTime = Math.floor(tweet.tweetTime) + "hours ago";
            }
        });
        res.send(tweets);
    });
}

module.exports.addTweetsController = (req, res) => {
    const {tweet, userId} = req.body;
    if(req.isAuthenticated()) {
        const options = {
            table: 'tweets',
            records: [{tweet, userId, likeCount: 0}]
        }
        db.insert(options, (err, result)=>{
            if(err){
                console.log(err);
                res.redirect('/');
            }
            res.redirect('/home');
        });
    } else {
        res.redirect('/');
    }
}

module.exports.likeTweetController = (req, res) => {
    if(req.isAuthenticated()){
        const {tweetId, userId, isLiked} = req.body;
        const queryStatement = `SELECT * from tweet.likes where tweetId = '${tweetId}' and '${userId}'`;
        db.query(queryStatement, (err, response) => {
            if(err){
                console.log(err);
                res.status(500).send('Error');
            } else {
                if(response.data.length === 0){
                    const options = {
                        table: 'likes',
                        records: [{tweetId, userId, isLiked}]
                    }
                    db.insert(options, (err, result) => {
                        if(err){
                            console.log(err);
                            res.status(500).send('Error');
                        }
                        changeLikeCount(tweetId, isLiked, res);
                    });
                } else {
                    const newQueryStatement = `update tweet.likes set isLiked = ${isLiked} where tweetId = '${tweetId}' and userId = '${userId}`;
                    db.query(newQueryStatement, (err, result) => {
                        if(err){
                            console.log(err);
                            res.status(500).send('Error');
                        } else {
                            changeLikeCount(tweetId, isLiked, res);
                        }
                    });
                }
            }
        });
    } else {
        res.status(400).send('Unauthorized');
    }
}

module.exports.deleteTweetController = (req, res) => {
    if(req.isAuthenticated()){
        const {tweetId, userId} = req.body;
        const currentUserId = req.user.data[0].id;
        if(currentUserId === userId){
            const options = {
                table: 'tweets',
                hashValues: [tweetId]
            }
            db.delete(options, (err, result) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Error');
                }
                res.status(200).send('Success');
            });
        } else {
            res.status(400).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
}