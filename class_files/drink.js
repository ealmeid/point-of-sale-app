//Base Class - Everything is a Drink
class Drink {

    constructor(name, price) {
      this.name = name;
      this.price = price;
      this.components = [];
      this.modifiers = {};
      this.modifierPrices = [];
    }
  
    displayInfo() {
      console.log(this);
    }

    updateModifiers(amount){
        var count = 0;
        for(var i in this.modifiers){
            this.modifiers[i] = amount[count];
            this.price+=(this.modifierPrices[count]*amount[count]);
            count++;
        }
        this.price = parseFloat(this.price).toFixed(2);
    }
  
  }
  
  //Everything below this is a component
  const espresso = superclass => class extends superclass {
  
    constructor(...args){
      super(...args);
      this.components.push("Espresso");
      this.modifiers["Whipped Cream"] = 0;
      this.modifierPrices.push(0.20);
    }
  
  };
  
  const steamedMilk = superclass => class extends superclass {
    
    constructor(...args){
      super(...args);
      this.components.push("Steamed Milk");
      this.modifiers["Chocolate Syrup"] = 0;
      this.modifierPrices.push(0.25);
    }
  
  };

  const milk = superclass => class extends superclass {
    
    constructor(...args){
      super(...args);
      this.components.push("Milk");
      this.modifiers["Protein Powder"] = 0;
      this.modifierPrices.push(0);
    }
  
  };
  
  const coffee = superclass => class extends superclass {
  
    constructor(...args){
      super(...args);
      this.components.push("Coffee");
      this.modifiers["Sugar"] = 0;
      this.modifiers["Cream"] = 0;
      this.modifiers["Milk"] = 0;
      this.modifierPrices.push(0.25);
      this.modifierPrices.push(0.20);
      this.modifierPrices.push(0.50);    
    }
  
  }
  
  class Latte extends espresso(steamedMilk(Drink)) {
    constructor(...args) {
      super(...args)
    }
  
  }
  
  class DripCoffee extends coffee(Drink) {
    
    constructor(...args) {
      super(...args)
    }

  }

  class Smoothie extends milk(Drink) {
    
    constructor(...args) {
      super(...args)
    }

  }

module.exports = {
    Drink: Drink,
    Espresso: espresso,
    SteamedMilk: steamedMilk,
    Latte: Latte,
    Coffee: coffee,
    DripCoffee: DripCoffee,
    Smoothie: Smoothie
  };