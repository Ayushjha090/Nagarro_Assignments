const express = require('express');
const router = express.Router();

const {signUpController, signInController, signOutController, authenticateGoogleController, authenticateGoogleCallBackController} = require('../controllers/authController');

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.get('/sign-out', signOutController);
router.get('/google', authenticateGoogleController);
router.get('/google/callback', authenticateGoogleCallBackController);

module.exports = router;