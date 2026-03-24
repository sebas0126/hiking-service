const trails = require('../constants/trails.json')

exports.getGallery = () => {
  try {
    return trails.map(trail => ({
      id: trail.id,
      image: trail.imageThumb,
      title: trail.title
    }));
  } catch (e) {
    throw Error(e)
  }
}