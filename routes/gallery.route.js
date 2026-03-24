const express = require('express')
const router = express.Router()

const galleryController = require('../controllers/gallery.controller')

router.get('/api/gallery', galleryController.getGallery)

module.exports = router;