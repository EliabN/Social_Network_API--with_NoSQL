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
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    try {
        console.log('Connected');

        // Drop collections if they exist
        await Promise.all([
            connection.dropCollection('thoughts'),
            connection.dropCollection('users')
        ]);

        // Create thoughts
        const thought1 = await Thought.create({
            thoughtText: 'I love the Decision Trackers app',
            userName: 'Zijie',
            reactions: [
                {
                    reactionBody: 'Decision Trackers is awesome',
                    userName: 'Sean'
                },
                {
                    reactionBody: 'Awesome app!',
                    userName: 'Jamie Doe'
                }
            ]
        });

        const thought2 = await Thought.create({
            thoughtText: 'Running can help to keep fit',
            userName: 'John',
            reactions: [
                {
                    reactionBody: 'Yess Agreed',
                    userName: 'Ben J'
                },
                {
                    reactionBody: 'Definitely a fact!',
                    userName: 'Kobe Teh'
                }
            ]
        });

        // Create users and link thoughts to users
        const user1 = await User.create({
            friends: [],
            userName: 'Zijie',
            email: 'zijie@testmail.com',
            thoughts: [thought1._id]
        });

        const user2 = await User.create({
            friends: [],
            userName: 'John',
            email: 'john@testmail.com',
            thoughts: [thought2._id]
        });

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        process.exit(0);
    }

    // // Empty arrays for randomly generated users
    // const users = [];
    // const thoughts = [];


    // users.push({
    //     friends: [],
    //     _id: 1,
    //     userName: 'Zijie',
    //     email: 'Zijie@testmail.com',
    //     thoughts: [
    //         {
    //             thoughtText: 'I the Decision Trackers app',
    //             userName: 'Zijie',
    //             reactions: [
    //                 {
    //                     reactionBody: 'Decision Trackers is awesome',
    //                     userName: 'Sean'
    //                 },
    //                 {
    //                     reactionBody: 'Awesome app!',
    //                     userName: 'Jamie Doe'
    //                 }
    //             ],
    //             _id: 101
    //         }
    //     ],
    // },
    //     {
    //         friends: [],
    //         _id: 2,
    //         userName: 'John',
    //         email: 'John@testmail.com',
    //         thoughts: [
    //             {
    //                 thoughtText: 'Running can help to keep fit',
    //                 userName: 'John',
    //                 reactions: [
    //                     {
    //                         reactionBody: 'Yess Agreed',
    //                         userName: 'Ben J'
    //                     },
    //                     {
    //                         reactionBody: 'Definitely a fact!',
    //                         userName: 'Kobe Teh'
    //                     }
    //                 ],
    //                 _id: 102
    //             }
    //         ],
    //     });

    // // Wait for the users to be inserted into the database
    // await User.collection.insertMany([users]);

    // console.table(users);
    // // console.table(thoughts);
    // console.info('Seeding complete 🌱');
    // process.exit(0);
});