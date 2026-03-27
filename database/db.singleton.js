const trails = require('../constants/trails.json')

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.routes = trails;
    this.subscribers = new Set();

    Database.instance = this;
  }

  getRoutes() {
    return this.routes;
  }

  addRoute(route) {
    const newRoute = { ...route, id: Date.now(), likes: 0, comments: [] };
    this.routes.push(newRoute);
    return newRoute;
  }

  updateRoute(id, newData) {
    const index = this.routes.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
      this.routes[index] = { ...this.routes[index], ...newData };
      return this.routes[index];
    }
    return null;
  }

  addSubscriber = (email) => {
    if (this.subscribers.has(email)) {
      throw new Error('Email already subscribed');
    }
    this.subscribers.add(email);
    return { message: 'Successfully subscribed' };
  }

  getSubscribers() {
    return [...this.subscribers];
  }
}

const dbInstance = new Database();
module.exports = dbInstance;