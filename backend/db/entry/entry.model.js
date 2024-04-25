const mongoose = require("mongoose")

const EntrySchema = require('./entry.schema').EntrySchema;

const EntryModel = mongoose.model("EntryModel", EntrySchema);

function createEntry(entry) {
    return EntryModel.create(entry);
}

function findEntryByUsername(username) {
    return EntryModel.find({username: username}).exec();
}

function returnAllEntry() {
    return EntryModel.find().exec();
}

function deleteEntry(entryId) {
    return EntryModel.deleteOne({_id: entryId}).exec();
}

module.exports = {
    createEntry,
    returnAllEntry,
    deleteEntry,
    findEntryByUsername
}