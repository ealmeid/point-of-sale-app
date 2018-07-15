const math = require('mathjs');

module.exports = function Order(drinks){

    this.drinks = drinks.drinks || {};
    this.totalQty = drinks.totalQty || 0;
    this.totalPrice = drinks.totalPrice || 0;

    this.add = function(drink, id){
        var storedDrink;
        var temp = false;
        if(this.totalQty==0){
            storedDrink = this.drinks[id];
            storedDrink = this.drinks[id] = {drink: drink, quantity: 0, price: 0};
        }
        else{
            for(var key in this.drinks){
                if((this.drinks[key].drink.name==drink.name) && (JSON.stringify(this.drinks[key].drink.modifiers) === JSON.stringify(drink.modifiers))){
                    storedDrink = this.drinks[key];
                    temp = true;
                    break;
                }
            }
            if(temp==false){
                storedDrink = this.drinks[id];
                storedDrink = this.drinks[id] = {drink: drink, quantity: 0, price: 0};
            }
        }
            console.log(storedDrink);
            storedDrink.quantity++;
            this.totalPrice+=parseFloat(storedDrink.drink.price);
            storedDrink.price = storedDrink.drink.price * storedDrink.quantity;
            this.totalQty++;
            this.totalPrice = math.round(this.totalPrice, 2); //try to found another built-in function and uninstall mathjs
    };

    this.returnDrinks = function(){
        var arr = [];
        for (var id in this.drinks){
            arr.push(this.drinks[id]);
        }
        return arr;
    };

};