/* Dependencies */
var express = require('express');
var router = express.Router();
var Drinks = require('../../models/drink'); // Structure of how the drink information is stored
var Order = require('../../models/order'); // Structure of how the order(cart) information is stored
var drinkClasses = require('../../class_files/drink.js'); //Where the drink objects are defined
var drinkNum = 0;

/*
  Routes are ordered relative to how a typical user would use the application.
  1. The home page is Rendered
  2. User clicks on a drink to add, the customization for that drink is rendered
  3. The user adds the customized drink to the checkout
  4. User will request the checkout page
  5. The user will confirm the order.
*/

/* 1 */
router.get('/', function(req, res, next) {
  Drinks.find(function(err, drinks){
    res.render('order/index', { title: 'Evan\'s Coffee', drinks: drinks});
  });
});

/* 2 */
router.get('/order/:id/customize', function(req, res, next){
    var drinkId = req.params.id;
    Drinks.findById(drinkId, function(err, drink){
      if(err){
        res.redirect('/');
      }
      if(drink.name=="Latte"){
        res.render('order/customize', {drinks: drink});
      }
      if(drink.name=="Drip Coffee"){
        res.render('order/customize', {drinks: drink});
      }
      if(drink.name=="Smoothie"){
        res.render('order/customize', {drinks: drink});
      }
  });
});

/* 3 */
router.post('/order/:id', function(req, res, next){
    var drinkId = req.params.id;
    var drinkName;
    var order = new Order(req.session.order ? req.session.order : {items: {}});

    Drinks.findById(drinkId, function(err, drink){
      if(err){
        res.redirect('/');
      }
      drinkName = drink.name;
      switch(drinkName) {
        case "Latte":
            const latte = new drinkClasses.Latte("Latte", 1.99);
            latte.updateModifiers(req.body.modifier);
            order.add(latte, drinkNum);
            drinkNum++;
            break;
        case "Drip Coffee":
            const dripCoffee = new drinkClasses.DripCoffee("Drip Coffee", 1.49);
            dripCoffee.updateModifiers(req.body.modifier);
            order.add(dripCoffee, drinkNum);
            drinkNum++;
            break;
        case "Smoothie":
            const smoothie = new drinkClasses.Smoothie("Smoothie", 2.49);
            smoothie.updateModifiers(req.body.modifier);
            order.add(smoothie, drinkNum);
            drinkNum++;
            break;
      }
      req.session.order = order;
      res.redirect('/');
    });
})

/* 4 */
router.get('/checkout', function(req, res, next){
  if(!req.session.order){
    return res.render('checkout/order', {drinks: null});
  }
  var order = new Order(req.session.order);
  res.render('checkout/order', {drinks: order.returnDrinks(), totalPrice: order.totalPrice});
});

/* 5 */
router.get('/completeOrder/', function(req, res, next){
  req.session.order = null;
  res.redirect('/');
});

router.get('/about/', function(req, res, next){
  res.render('misc/about');
});

module.exports = router;