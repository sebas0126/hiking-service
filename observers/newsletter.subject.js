class NewsletterSubject {
  constructor() {
    this._observers = [];
  }

  attach(observer) {
    this._observers.push(observer);
  }

  detach(observer) {
    const i = this._observers.indexOf(observer);
    if (i !== -1) {
      this._observers.splice(i, 1);
    }
  }

  notify(event) {
    for (const observer of this._observers) {
      if (typeof observer.update === 'function') {
        observer.update(event);
      }
    }
  }
}

module.exports = new NewsletterSubject();
