/* Index.js 

Page serves as file to create routes for home page*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CourseIScore' });
});

/* Alternate GET home page */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'CourseIScore' });
});

module.exports = router; //exporting router
