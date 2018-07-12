var express = require('express');
var router = express.Router();
var Drinks = require('../models/drink');
var Order = require('../models/order');
var bodyParser = require('body-parser');

//Base Class - Everything is a Drink
class Drink {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.components = [];
    this.modifiers = {};
  }

  displayInfo() {
    console.log(this);
  }

}

//Everything below this is a component
const espresso = superclass => class extends superclass {

  constructor(...args){
    super(...args);
    this.components.push("Espresso");
    this.modifiers.WhippedCream=0;
  }

  updateModifiers(amount){
    this.modifiers.ChocolateSyrup = amount[1] ;
    this.price+=this.modifiers.ChocolateSyrup*.20;
  }

  addWhippedCream(amount){
    this.modifiers.WhippedCream=amount;
  }

};

const steamedMilk = superclass => class extends superclass {
  
  constructor(...args){
    super(...args);
    this.components.push("Steamed Milk");
    this.modifiers.ChocolateSyrup = 0;
  }

  updateModifiers(amount){
    this.modifiers.ChocolateSyrup = amount[0] ;
    this.price+=this.modifiers.ChocolateSyrup*.25;
    this.price=this.price.toFixed(2);
  }

  addChocolateSyrup(){
    this.modifiers.ChocolateSyrup=amount;
  }

};

const coffee = superclass => class extends superclass {

  constructor(...args){
    super(...args);
    this.components.push("Coffee");
    this.modifiers.Sugar = 0;
    this.modifiers.Cream = 0;
    this.modifiers.Milk = 0;
  }

  updateModifiers(amount){
    this.modifiers.Sugar = amount[0] ;
    this.modifiers.Cream = amount[1] ;
    this.modifiers.Milk = amount[2];
    this.price+=this.modifiers.Sugar*.25 + this.modifiers.Cream*.2 + this.modifiers.Milk*.5;
    this.price=this.price.toFixed(2);
  }

  addSugar(amount){
    this.modifiers.Sugar = amount ;
  }

  addCream(amount){
    this.modifiers.Cream = amount ;
  }

  addMilk(amount){
    this.modifiers.Milk= amount ;
  }

}

class Latte extends steamedMilk(espresso(Drink)) {
  constructor(...args) {
    super(...args)
  }

}

class DripCoffee extends coffee(Drink) {
  constructor(...args) {
    super(...args)
  }
}

router.post('/order/:id', function(req, res, next){
    //console.log(req.body.modifier[0]);
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
            const latte = new Latte("Latte", 1.99);
            latte.updateModifiers(req.body.modifier);
            order.add(latte, drink.id);
            break;
        case "Drip Coffee":
            const dripCoffee = new DripCoffee("Drip Coffee", 1.49);
            dripCoffee.updateModifiers(req.body.modifier);
            order.add(dripCoffee, drink.id);
            break;
      }
      req.session.order = order;
      console.log(req.session.order);
      res.redirect('/');
    });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  Drinks.find(function(err, drinks){
    res.render('order/index', { title: 'E-Coffee', drinks: drinks});
  });
});

router.get('/checkout', function(req, res, next){
  if(!req.session.order){
    return res.render('checkout/order', {drinks: null});
  }
  var order = new Order(req.session.order);
  //console.log(req.session.order);
  res.render('checkout/order', {drinks: order.returnDrinks(), totalPrice: order.totalPrice});
});

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
    //db.collection.find( {name: req.params.id } );
  });
});

router.get('/completeOrder/', function(req, res,next){
  req.session.order = null;
  res.redirect('/');
});

module.exports = router;