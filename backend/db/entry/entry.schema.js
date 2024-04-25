const Schema = require('mongoose').Schema;

exports.EntrySchema = new Schema({
    username: { 
        type: String,
        require: true,
    },
    website: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
}, { collection : 'entries' });

