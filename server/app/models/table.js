// app/models/bear.js

var mongoose     = require('mongoose');
const {String, Number} = mongoose.Schema.Types;
var Schema       = mongoose.Schema;

var db = mongoose.createConnection('mongodb://Test:test@ds155634.mlab.com:55634/findaseat'); // connect to our database
db.on('open', () => console.log('Connected to the database'))

var TableSchema  = new Schema({
    name: {type: String},
    capacity: {type: Number},
	occupancy: {type: Number}
});

module.exports = db.model('Table', TableSchema);