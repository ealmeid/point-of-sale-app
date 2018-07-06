var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Drink = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Drink', Drink);