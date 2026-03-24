const trails = require('../constants/trails.json')

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.routes = trails;
    this.subscribers = new Set();

    Database.instance = this;
    Object.freeze(this);
  }

  getRoutes() {
    return this.routes;
  }

  addRoute(route) {
    this.routes.push({ ...route, id: Date.now(), likes: 0, comments: [] });
  }

  updateRoute(id, newData) {
    const index = this.routes.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
      this.routes[index] = { ...this.routes[index], ...newData };
      return this.routes[index];
    }
    return null;
  }
}

const dbInstance = new Database();
module.exports = dbInstance;