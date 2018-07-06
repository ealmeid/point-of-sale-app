var Drink = require('../models/drink');
var mongo = require('mongoose');

mongo.connect('mongodb://evan:evan123@ds125841.mlab.com:25841/mycoffeeshop');

var drinks = [
    new Drink({
        name: "Latte",
        image: "https://rawfactoryflavor.com/wp-content/uploads/2015/11/latte.jpg"
    }),
    new Drink({
        name: "Drip Coffee",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    }),
    new Drink({
        name: "Smoothie",
        image: "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2016%2F12%2Fmain%2Fberry-green-smoothie_0.jpg%3Fitok%3D4rSZIPAg&w=1600&q=70"
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