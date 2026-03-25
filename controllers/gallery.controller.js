var galleryService = require('../services/gallery.service')

exports.getGallery = (req, res) => {
  try {
    const ans = galleryService.getGallery()
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}