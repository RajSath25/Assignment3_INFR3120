var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CourseIScore' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'CourseIScore' });
});

module.exports = router;
