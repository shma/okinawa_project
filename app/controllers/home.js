var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
  app.use('/about', router);
};

router.get('/', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/about', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('about', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/sp', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('sp', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
