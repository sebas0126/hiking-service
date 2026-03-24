exports.getFavorites = () => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'Falta el identificador del usuario' });
    }

    const userFavsIds = userFavorites[userId] || [];

    const favoriteRoutesData = routes.filter(r => userFavsIds.includes(r.id));

    return favoriteRoutesData;
  } catch (e) {
    throw Error(e)
  }
}

exports.addFavorite = (req, res) => {
  const routeId = parseInt(req.params.id);
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Falta el identificador del usuario (x-user-id en headers)' });
  }

  const routeExists = routes.some(r => r.id === routeId);
  if (!routeExists) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }

  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }

  const userFavs = userFavorites[userId];
  const index = userFavs.indexOf(routeId);

  if (index !== -1) {
    userFavs.splice(index, 1);
    return res.json({
      message: 'Ruta removida de favoritos',
      favoriteIds: userFavs
    });
  } else {
    userFavs.push(routeId);
    return res.json({
      message: 'Ruta agregada a favoritos',
      favoriteIds: userFavs
    });
  }
}