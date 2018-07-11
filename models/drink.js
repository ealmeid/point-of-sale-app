var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Drink = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    modifiers: {
        type: Object
    },
    quantity: {
        type: Number
    }
});

module.exports = mongoose.model('Drink', Drink);