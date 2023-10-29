// Seed collection here
const connection = require('../config/connection');
// Import User model
const User = require('../models/User');
// Import User model
const Thought = require('../models/Thought');
// Import data functions for seeding
const { names, thoughtText, reactions } = require('./data');

// Start the seeding runtime timer
connection.on('error', (err) => err);

// Creates a connection to MongoDB
connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    console.log(thoughtText)
    const allThoughts = [];
    const allUsers = [];


    try {
        // Create users with thoughts
        for (i = 0; i < thoughtText.length; i++) {
            const name = names[i];
            const email = `${name}@testmail.com`;
            // // Create thoughts
            // const createThought = {
            //     thoughtText: thoughtText[i],
            //     userName: name,
            //     reactions: reactions[i]
            // }
            const newThought = await Thought.create({
                thoughtText: thoughtText[i],
                userName: name,
                reactions: reactions[i]
            });

            const newUser = await User.create({
                userName: name,
                email: email,
                thoughts: [newThought],
            });
            allUsers.push(newUser)
            console.log(newUser)

        }

        console.table(allUsers);
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        process.exit(0);
    }
});