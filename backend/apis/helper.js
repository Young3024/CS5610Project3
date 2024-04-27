const express = require('express');
const router = express.Router();
const Entry = require('../db/entry/entry.model');
const User = require('../db/user/user.model');

// POST route to share passwords with another user
router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const sender = req.cookies.username;

        // Check if the username exists
        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is trying to share passwords with themselves
        if (username === sender) {
            return res.status(400).json({ message: 'Cannot share passwords with yourself' });
        }

        // Fetch the passwords of the current user
        const senderPasswords = await Entry.findEntryByUsername(sender);

        // Combine the passwords of the sender with the shared person's
        const sharedPasswords = senderPasswords.map(password => ({
            website: password.website,
            password: password.password,
            username: username  // Set the username to the shared user's username
        }));

        // Create entries for all shared passwords
        const createdEntries = await Promise.all(sharedPasswords.map(password => Entry.createEntry(password)));

        console.log(createdEntries);

        res.status(200).json({ message: 'Passwords shared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
