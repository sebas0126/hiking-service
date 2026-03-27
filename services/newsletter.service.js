const db = require('../database/db.singleton');
const newsletterSubject = require('../observers/newsletter.subject');
const emailObserver = require('../observers/newsletter.email.observer');

newsletterSubject.attach(emailObserver);

exports.subscribe = (email) => {
  try {
    const result = db.addSubscriber(email);
    newsletterSubject.notify({ type: 'subscribed', email });
    return result;
  } catch (e) {
    throw Error(e);
  }
};
