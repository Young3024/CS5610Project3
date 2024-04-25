const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const EntryModel = require('../db/entry/entry.model');

const entryDB = [];

router.post('/', async function(request, response) {
    const newEntry = request.body;

    const username = request.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return response.status(404).send("Invalid request")
    }
    
    newEntry.username = decryptedUsername;

    try {
        const createEntryResponse = await EntryModel.createEntry(newEntry)
        console.log(createEntryResponse)
        return response.send("Entry Successfully Created: " + createEntryResponse)
    } catch (error) {
        return response.status(500).send(error)
    } 
})

router.get('/', function(request, response) {

    const username = request.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return response.status(404).send("Invalid request")
    }
    

    EntryModel.findEntryByUsername(decryptedUsername)
        .then(function(dbResponse) {
            response.cookie("entryCount", dbResponse.length + 1)
            response.send(dbResponse)
        })
        .catch(function(error) {
            response.status(500).send(error)
        })

})

router.delete('/:entryId', async function(req, response) {
    const entryId = req.params.entryId;

    const deleteResponse = await EntryModel.deleteEntry(entryId)
    return response.send("Successfully delete entry!")
})

module.exports = router;