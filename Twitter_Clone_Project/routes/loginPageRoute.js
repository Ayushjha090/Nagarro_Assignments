const express = require('express');
const router = express.Router();

const {loginPageController} = require('../controllers/loginPageController');
const {tweetPageController} = require('../controllers/tweetPageController');

router.get('/', loginPageController);
router.get('/:page', tweetPageController);

module.exports = router;