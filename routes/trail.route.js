const express = require('express')
const router = express.Router()

const trailController = require('../controllers/trail.controller')

router.get('/api/trails', trailController.getTrails)

router.get('/api/trails/:id', trailController.getTrailById)

router.patch('/api/trails/:id', trailController.updateTrail)

module.exports = router;