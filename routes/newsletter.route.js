const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');

router.post('/api/newsletter/subscribe', newsletterController.subscribe);

module.exports = router;
