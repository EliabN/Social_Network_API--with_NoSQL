// Add seed Data in here
const thoughts = [
    {
        reactionBody: 'Decision Trackers is awesome',
        userName: 'Sean'
    },
    {
        reactionBody: 'Awesome app!',
        userName: 'Jamie Doe'
    },
    
];

const thought = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
    'Email is open on my computer',
    'Compass is never opened',
    'Firefox is great for privacy',
  ];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUserName = () => getRandomArrItem(names);;

// Export the functions for use in seed.js
module.exports = { getRandomUserName, thought }
