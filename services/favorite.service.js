const db = require('../database/db.singleton');

const userFavorites = {};

exports.getFavorites = (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const routes = db.getRoutes();
  const userFavsIds = userFavorites[userId] || [];
  const favoriteRoutesData = routes.filter(r => userFavsIds.includes(r.id));

  return favoriteRoutesData;
};

exports.addFavorite = (userId, routeId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const routes = db.getRoutes();
  const routeExists = routes.some(r => r.id === parseInt(routeId));
  if (!routeExists) {
    throw new Error('Route not found');
  }

  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }

  const userFavs = userFavorites[userId];
  const routeIdInt = parseInt(routeId);
  const index = userFavs.indexOf(routeIdInt);

  if (index !== -1) {
    userFavs.splice(index, 1);
    return {
      message: 'Route removed from favorites',
      favoriteIds: userFavs
    };
  } else {
    userFavs.push(routeIdInt);
    return {
      message: 'Route added to favorites',
      favoriteIds: userFavs
    };
  }
};