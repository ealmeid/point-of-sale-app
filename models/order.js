//Received assistance from https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w for this part
/* Reminder to rewrite this section */
module.exports = function Order(drinks){

    this.drinks = drinks.drinks || {};
    this.totalQty = drinks.totalQty || 0;
    this.totalPrice = drinks.totalPrice || 0;

    this.add = function(drink, id){
        var storedDrink = this.drinks[id];
        var temp;
        storedDrink = this.drinks[id] = {drink: drink, quantity: 0, price: 0};
        storedDrink.quantity++;
        storedDrink.price = parseFloat(storedDrink.drink.price).toFixed(2) * storedDrink.quantity;
        this.totalQty++;
        this.totalPrice+=storedDrink.price;
        temp = this.totalPrice;
        this.totalPrice = parseFloat(temp).toFixed(2);
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