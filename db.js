const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/videogameDB?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log('Mongo DB connection established!')
}

module.exports = connectMongo;