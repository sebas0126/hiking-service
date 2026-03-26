const db = require('../database/db.singleton');

exports.subscribe = (email) => {
  try {
    return db.addSubscriber(email);
  } catch (e) {
    throw Error(e);
  }
};
