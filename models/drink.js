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
    }
});

module.exports = mongoose.model('Drink', Drink);