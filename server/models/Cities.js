const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitiesSchema = new Schema({}, { strict: false });
const Cities = mongoose.model('cities', CitiesSchema, 'cities');

module.exports =  Cities ;