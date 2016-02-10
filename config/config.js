var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'okinawa'
    },
    port: 3000,
    db: 'mysql://root@localhost/okinawa-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'okinawa'
    },
    port: 3000,
    db: 'mysql://localhost/okinawa-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'okinawa'
    },
    port: 3000,
    db: 'mysql://localhost/okinawa-production'
  }
};

module.exports = config[env];
