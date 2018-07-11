var Drink = require('../models/drink');
var mongo = require('mongoose');

mongo.connect('mongodb://evan:evan123@ds125841.mlab.com:25841/mycoffeeshop');

var drinks = [
    new Drink({
        name: "Latte",
        image: "https://rawfactoryflavor.com/wp-content/uploads/2015/11/latte.jpg",
        modifiers: {"Chocolate Syrup": 0, "Whipped Cream": 0},
        quantity: 10
    }),
    new Drink({
        name: "Drip Coffee",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
        modifiers: {"Sugar": 0, "Cream": 0, "Milk": 0},
        quantity: 10
    })
];

var done = 0;
for(var i=0; i<drinks.length;i++){
    drinks[i].save(function(err, result){
        done++;
        if(done==drinks.length){
            exit();
        }
    });
}

function exit(){
    mongo.disconnect();
}