var favoriteService = require('../services/favorite.service')

exports.getFavorites = (req, res) => {
  try {
    const ans = favoriteService.getFavorite()
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.addFavorite = (req, res) => {
  try {
    const ans = favoriteService.addFavorite(req.params.id)
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}