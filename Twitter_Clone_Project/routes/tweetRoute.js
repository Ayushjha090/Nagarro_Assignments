const express = require('express');

const {getTweetsController, addTweetsController, likeTweetController, getTrendingTweetsController, deleteTweetController} = require('../controllers/tweetController');
const router = express.Router();

router.get('/:userId', getTweetsController);
router.get('/trending', getTrendingTweetsController);
router.post('/', addTweetsController);
router.post('/like', likeTweetController);
router.post('/delete', deleteTweetController);

module.exports = router;