var express = require('express');
var router = express.Router();
//var bootbox = require('bootbox');
var Drinks = require('../models/drink');
var Order = require('../models/order');
var bodyParser = require('body-parser')

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
  }

  addWhippedCream(){
    this.price+=0.2;
  }

};

const steamedMilk = superclass => class extends superclass {
  
  constructor(...args){
    super(...args);
    this.components.push("Steamed Milk");
    this.modifiers.ChocolateSyrup = 0;
  }

  addChocolateSyrup(){
    this.price+=0.5;
    this.modifiers.ChocolateSyrup+=1;
  }

};

const coffee = superclass => class extends superclass {

  constructor(...args){
    super(...args);
    this.components.push("Steamed Milk");
    this.modifiers.Sugar = 0;
    this.modifiers.Cream = 0;
    this.modifiers.Milk = 0;
  }

  addSugar(amount){
    this.modifiers.sugar = amount ;
    //this.modifiers.Sugar+=1;
  }

  addCream(amount){
    this.modifiers.cream = amount ;
    //this.modifiers.Cream+=1;
  }

  addMilk(amount){
    this.modifiers.milk= amount ;
    //this.modifiers.Milk+=1;
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
    console.log(req.body.modifier);

    var drinkId = req.params.id;
    var order = new Order(req.session.order ? req.session.order : {items: {}});

    Drinks.findById(drinkId, function(err, drink){
      if(err){
        res.redirect('/');
      }
      if(drink.name=="Latte"){
        const latte = new Latte("Latte", 1.99);
        order.add(latte, drink.id);
      }
      if(drink.name=="Drip Coffee"){
        const dripCoffee = new DripCoffee("Drip Coffee", 1.49);
        order.add(dripCoffee, drink.id);
      }
      if(drink.name=="Smoothie"){
        const smoothie = new Smoothie("Smoothie", 3.49);
        order.add(smoothie, drink.id);
      }
      req.session.order = order;
      console.log(req.session.order);
      res.redirect('/');
    });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  Drinks.find(function(err, drinks){
    res.render('order/index', { title: 'Express', drinks: drinks});
  });
});

router.get('/order/:id/customize', function(req, res, next){
    var drinkId = req.params.id;
    Drinks.findById(drinkId, function(err, drink){
      if(err){
        res.redirect('/');
      }
      if(drink.name=="Latte"){
        console.log("Latte");
        res.render('order/customize', {drinks: drink});
      }
      if(drink.name=="Drip Coffee"){
        console.log("Drip Coffee");
        res.render('order/customize', {drinks: drink});
      }
      if(drink.name=="Smoothie"){
        console.log("Smoothie");
      }
    //db.collection.find( {name: req.params.id } );
  });
});

/*
router.get('/order/:id', function(req, res, next){
  //console.log(req.params.id);
  //var data = req.body.modifier;
  //console.log(data);
  var drinkId = req.params.id;
  var order = new Order(req.session.order ? req.session.order : {items: {}});

    Drinks.findById(drinkId, function(err, drink){
      if(err){
        res.redirect('/');
      }
      if(drink.name=="Latte"){
        const latte = new Latte("Latte", 1.99);
        order.add(latte, drink.id);
      }
      if(drink.name=="Drip Coffee"){
        const dripCoffee = new DripCoffee("Drip Coffee", 1.49);
        order.add(dripCoffee, drink.id);
      }
      if(drink.name=="Smoothie"){
        const smoothie = new Smoothie("Smoothie", 3.49);
        order.add(smoothie, drink.id);
      }
      req.session.order = order;
      console.log(req.session.order);
      res.redirect('/');
    });

});
*/

module.exports = router;
