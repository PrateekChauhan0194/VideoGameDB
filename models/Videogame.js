const mongoose = require('mongoose');
const { Schema } = mongoose;

const videogameSchema = new Schema({
    gameId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('videogame', videogameSchema);