const {Schema, model} = require('mongoose');

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    rate: Number,
    watched: Boolean
});

module.exports = model('Movie', movieSchema)