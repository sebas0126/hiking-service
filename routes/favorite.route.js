const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favorite.controller')

router.get('/api/favorites', favoriteController.getFavorites)
router.post('/api/favorites/:id', favoriteController.toggleFavorite)

module.exports = router;