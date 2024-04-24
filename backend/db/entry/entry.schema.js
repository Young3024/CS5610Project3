const Schema = require('mongoose').Schema;

exports.EntrySchema = new Schema({
    website: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
}, { collection : 'entries' });

