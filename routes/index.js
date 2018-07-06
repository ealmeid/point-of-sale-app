var express = require('express');
var router = express.Router();
var Drink = require('../models/drink');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  Drink.find(function(err, drinks){
    res.render('order/index', { title: 'Express', drinks: drinks});
  });
});

router.get('/order/:id', function(req, res, next){
  res.send("sup");
});

module.exports = router;
