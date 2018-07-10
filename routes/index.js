var express = require('express');
var router = express.Router();
//var bootbox = require('bootbox');
var Drinks = require('../models/drink');
var Order = require('../models/order');

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

  addSugar(){
    this.modifiers.Sugar+=1;
  }

  addCream(){
    this.modifiers.Cream+=1;
  }

  addMilk(){
    this.modifiers.Milk+=1;
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

class Smoothie extends Drink {
  constructor(...args) {
    super(...args)
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Drinks.find(function(err, drinks){
    res.render('order/index', { title: 'Express', drinks: drinks});
  });
});

router.get('/test', function(req, res, next) {
  console.log(req.body.chat);
});

router.get('/order/:id', function(req, res, next){
  console.log(req.body.chat);
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
    });

});

module.exports = router;
