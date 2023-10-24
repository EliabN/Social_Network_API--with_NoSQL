// Seed collection here
const connection = require('../config/connection');
// Import User model
const User = require('../models/User');
// Import User model
const Thought = require('../models/Thought');
// Import data functions for seeding
const { getRandomUserName, thought } = require('./data');

// Start the seeding runtime timer
connection.on('error', (err) => err);

// Creates a connection to MongoDB
connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    // Empty arrays for randomly generated users
    const users = [];
    const thoughts = [];
    const reactions = [];

    for (let i = 0; i < 3; i++) {
        const name = getRandomUserName();
        const email = `${name}@testmail.com`;

        // Use thought as an array of strings
        const newThoughtText = thought[i]; // Access the array here

        const thoughtObject = {
            thoughtText: newThoughtText,
            userName: name,
            reactions: [
                {
                    reactionBody: 'Great thought!',
                    userName: 'Reaction User 1',
                },
                {
                    reactionBody: 'I agree!',
                    userName: 'Reaction User 2',
                },
            ],
        };

        await Thought.collection.insertOne(thoughtObject);


        const newUser = {
            userName: name.toString(),
            email: email.toString(),
            thoughts: [thoughtObject],
        };
        users.push(newUser);
    }

    // Wait for the users to be inserted into the database
    await User.collection.insertMany(users);

    console.table(users);
    console.timeEnd('Seeding complete 🌱');
    process.exit(0);
});