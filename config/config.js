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
    db: 'okinawa-development',
    username: 'root',
    password: 'Peace0721'
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
    port: 3001,
    db: 'mysql://root@localhost/okinawa-production',
    password: 'Peace0721'
  }
};

module.exports = config[env];
