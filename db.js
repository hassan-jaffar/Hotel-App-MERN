const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://hassanjaffar:12341234@cluster0.0gzshcl.mongodb.net/shey-rooms';

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true});

var connection = mongoose.connection;

connection.on('error', () => {console.log('MongoDB connection failed')});

connection.on('connected', () => {console.log('MongoDB connection successful')});

module.exports = mongoose