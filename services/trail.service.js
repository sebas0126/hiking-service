const db = require('../database/db.singleton');

exports.getTrails = () => {
  try {
    return db.getRoutes();
  } catch (e) {
    throw Error(e);
  }
};

exports.getTrailById = (trailId) => {
  try {
    const trails = db.getRoutes();
    return trails.find(trail => trail.id === parseInt(trailId));
  } catch (e) {
    throw Error(e);
  }
}

exports.updateTrail = (trailId, data) => {
  try {
    const updatedTrail = db.updateRoute(trailId, data);
    if (!updatedTrail) {
      throw new Error('Trail not found');
    }
    return updatedTrail;
  } catch (e) {
    throw Error(e);
  }
};

exports.createTrail = (data) => {
  try {
    const newTrail = db.addRoute(data);
    return newTrail;
  } catch (e) {
    throw Error(e);
  }
};