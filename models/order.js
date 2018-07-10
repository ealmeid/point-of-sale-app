module.exports = function Order(drinks){
    this.drinks = drinks.name || {};
    this.totalQty = drinks.totalQty || 0;
    this.totalPrice = drinks.totalPrice || 0;

    this.add = function(drink, id){
        var storedDrink = this.drinks[id];
        if(!storedDrink){
            storedDrink = this.drinks[id] = {drinks: drink, quantity: 0, price: 0};
        }
        storedDrink.quantity++;
        storedDrink.price = storedDrink.drinks.price * storedDrink.quantity;
        this.totalQty++;
        this.totalPrice+=storedDrink.price;
    };
};