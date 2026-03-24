const db = require('../database/db.singleton');

exports.getGallery = () => {
  try {
    const trails = db.getRoutes();
    return trails.map(trail => ({
      id: trail.id,
      image: trail.imageThumb,
      title: trail.title
    }));
  } catch (e) {
    throw Error(e);
  }
};