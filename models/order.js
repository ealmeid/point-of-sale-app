//Received assistance from https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w for this part
/* Reminder to rewrite this section */
module.exports = function Order(drinks){

    this.drinks = drinks.drinks || {};
    this.totalQty = drinks.totalQty || 0;
    this.totalPrice = drinks.totalPrice || 0;

    this.add = function(drink, id){
        var storedDrink = this.drinks[id];
        if(!storedDrink){
            storedDrink = this.drinks[id] = {drink: drink, quantity: 0, price: 0};
        }
        storedDrink.quantity++;
        storedDrink.price = storedDrink.drink.price * storedDrink.quantity;
        this.totalQty++;
        this.totalPrice+=storedDrink.price;
    };

    this.returnDrinks = function(){
        var arr = [];
        console.log(this.drinks);
        for (var id in this.drinks){
            arr.push(this.drinks[id]);
        }
        return arr;
    };

};