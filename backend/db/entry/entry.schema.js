const Schema = require('mongoose').Schema;

exports.EntrySchema = new Schema({
    username: { 
        type: String,
        require: true,
    },
    website: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { collection : 'entries' });

