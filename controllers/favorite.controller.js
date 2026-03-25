var favoriteService = require('../services/favorite.service')

exports.getFavorites = (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const ans = favoriteService.getFavorites(userId)
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.toggleFavorite = (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const routeId = req.params.id;
    const ans = favoriteService.toggleFavorite(userId, routeId)
    res.json(ans)
  } catch (e) {
    if (e.message === 'Route not found') {
      res.status(404).send(e.message);
    } else {
      res.status(400).send(e.message);
    }
  }
}