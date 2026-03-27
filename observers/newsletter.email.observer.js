const db = require('../database/db.singleton');

function sendEmail(to, subject, text) {
  console.log(`[Email] to=${to} subject=${subject} body=${text}`);
}

module.exports = {
  update(event) {
    if (!event || !event.type) {
      return;
    }
    if (event.type === 'subscribed') {
      sendEmail(
        event.email,
        'Bienvenida al boletín',
        'Gracias por suscribirte. Recibirás novedades de rutas y senderismo.'
      );
      return;
    }
    if (event.type === 'broadcast') {
      const recipients = db.getSubscribers();
      for (const email of recipients) {
        sendEmail(email, event.subject, event.body);
      }
    }
  },
};
